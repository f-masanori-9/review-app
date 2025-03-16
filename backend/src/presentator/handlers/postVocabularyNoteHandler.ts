import { zValidator } from '@hono/zod-validator';

import { z } from 'zod';
import { VocabularyNote } from '../../models/VocabularyNote';
import { vocabularyNotesTable } from '../../drizzle/schema';
import { createHandlers } from '../utils/factory';

const postVocabularyNoteHandlerSchema = z.object({
	title: z.string(),
	content: z.string(),
	answerText: z.string(),
});

export const postVocabularyNoteHandler = createHandlers(zValidator('json', postVocabularyNoteHandlerSchema), async (c) => {
	const userId = c.get('userId');

	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');

	const vocabularyNote = VocabularyNote.createNew({
		userId,
		content: body.content,
		answerText: body.answerText,
	});

	await d1Drizzle.insert(vocabularyNotesTable).values([vocabularyNote]).returning().get();

	return c.json(vocabularyNote);
});
