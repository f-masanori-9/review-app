import { zValidator } from '@hono/zod-validator';
import { factory } from '../factory';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { z } from 'zod';
import { vocabularyNotesTable } from '../../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { update } from 'lodash';

const patchNotesSchema = z.object({
	noteId: z.string(),
	content: z.string(),
	answerText: z.string(),
});

export const patchVocabularyNotesHandler = factory.createHandlers(zValidator('json', patchNotesSchema), async (c) => {
	const userId = c.get('userId');
	const body = c.req.valid('json');

	const d1 = c.get('d1Drizzle');
	const existingNote = await d1
		.select()
		.from(vocabularyNotesTable)
		.where(eq(vocabularyNotesTable.userId, userId || ''))
		.get();

	if (!existingNote) {
		throw new HTTPException(401, { cause: new Error('Note not found') });
	}
	const updatedNote = {
		...existingNote,
		content: body.content,
		answerText: body.answerText,
		updateAt: new Date(),
	};

	await d1
		.update(vocabularyNotesTable)
		.set(updatedNote)
		.where(and(eq(vocabularyNotesTable.userId, userId || '')))
		.get();

	return c.json({});
});
