import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { VocabularyNoteReviewLogRepository } from '../../../repositories/VocabularyNoteReviewLogRepository';
import { VocabularyNoteReviewLog } from '../../../models/VocabularyNoteReviewLog';
import { createHandlers } from '@/presentator/utils/factory';

const postReviewLogSchema = z.object({
	noteId: z.string(),
});

export const postVocabularyNoteReviewLogHandler = createHandlers(zValidator('json', postReviewLogSchema), async (c) => {
	const userId = c.get('userId');

	const repository = new VocabularyNoteReviewLogRepository(c.get('d1Drizzle'));
	await repository.create(
		VocabularyNoteReviewLog.createNew({
			userId: userId || '',
			vocabularyNoteId: c.req.valid('json').noteId,
		})
	);

	return c.json({
		message: 'voca Review log created',
	});
});
