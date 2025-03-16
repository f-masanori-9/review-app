import { vocabularyNotesTable } from '../../../drizzle/schema';

import { eq, and } from 'drizzle-orm';
import { createHandlers } from '../utils/factory';

export const getVocabularyNoteHandler = createHandlers(async (c) => {
	const userId = c.get('userId');
	const noteId = c.req.param('noteId');
	const d1Drizzle = c.get('d1Drizzle');
	const vocabularyNote = (
		await d1Drizzle
			.select()
			.from(vocabularyNotesTable)
			.where(and(eq(vocabularyNotesTable.id, noteId || ''), eq(vocabularyNotesTable.userId, userId || '')))
	).map((d) => ({ ...d, type: 'vocabularyNote' } as const))[0];

	return c.json(vocabularyNote);
});
