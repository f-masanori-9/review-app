import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createHandlers } from '../../../presentator/utils/factory';
import { usersTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { VocabularyNoteRepository } from '@/repositories/VocabularyNoteRepository';
import { VocabularyNote } from '@/models/VocabularyNote';
import { NoteRepository } from '@/repositories/NoteRepository';
import { Note } from '@/models/Note';

const bodySchema = z.object({
	userId: z.string(),
	name: z.string(),
});
export const postSignupGoogleHandler = createHandlers(zValidator('json', bodySchema), async (c) => {
	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');

	const existingUser = await d1Drizzle.select().from(usersTable).where(eq(usersTable.id, body.userId)).get();
	if (existingUser) {
		return c.json({ existingUser });
	}

	const res = await d1Drizzle
		.insert(usersTable)
		.values([{ id: body.userId, name: body.name }])
		.get();

	// NOTE: サンプルデータの生成
	const noteRepository = new NoteRepository(d1Drizzle);
	await noteRepository.create(
		Note.createNew({
			userId: body.userId,
			content:
				'世界で3番目に高い山はカンチェンジュンガで、標高は8,586mです。インド、ネパール、中国（チベット）の国境付近に位置しています。世界で最も高い山はエベレスト（ヒマラヤ山脈）で、標高は8,848mです。',
		})
	);
	const vocabularyNoteRepository = new VocabularyNoteRepository(d1Drizzle);
	await vocabularyNoteRepository.create(
		VocabularyNote.createNew({ userId: body.userId, content: '「薔薇」という漢字の読み方は？', answerText: 'バラ' })
	);

	return c.json({ res });
});
