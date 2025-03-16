import { zValidator } from '@hono/zod-validator';

import { z } from 'zod';
import { vocabularyNotesTable } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { HTTPException } from 'hono/http-exception';
import { createHandlers } from '../utils/factory';

const patchNotesSchema = z.object({
	noteId: z.string(),
	content: z.string(),
	answerText: z.string(),
});

export const patchVocabularyNotesHandler = createHandlers(zValidator('json', patchNotesSchema), async (c) => {
	const userId = c.get('userId');
	const body = c.req.valid('json');
	const noteId = body.noteId;

	const d1 = c.get('d1Drizzle');
	const existingNote = await d1
		.select()
		.from(vocabularyNotesTable)
		.where(and(eq(vocabularyNotesTable.id, noteId || ''), eq(vocabularyNotesTable.userId, userId || '')))
		.get();

	if (!existingNote) {
		throw new HTTPException(401, { cause: new Error('Note not found') });
	}
	const updatedVocabularyNote = {
		...existingNote,
		content: body.content,
		answerText: body.answerText,
		updateAt: new Date(),
	};

	await d1
		.update(vocabularyNotesTable)
		.set(updatedVocabularyNote)
		.where(and(eq(vocabularyNotesTable.id, noteId || ''), eq(vocabularyNotesTable.userId, userId || '')))
		.get();

	return c.json({});
});
