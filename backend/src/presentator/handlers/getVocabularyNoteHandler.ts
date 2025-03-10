import { notesTable, reviewLogsTable, vocabularyNotesTable } from '../../../drizzle/schema';
import { factory } from '../factory';
import { eq, and, sql, inArray } from 'drizzle-orm';

export const getVocabularyNoteHandler = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const noteId = c.req.param('noteId');
	const d1Drizzle = c.get('d1Drizzle');
	const vocabularyNote = (
		await d1Drizzle
			.select()
			.from(vocabularyNotesTable)
			.where(eq(vocabularyNotesTable.userId, userId || ''))
	).map((d) => ({ ...d, type: 'vocabularyNote' } as const))[0];

	return c.json(vocabularyNote);
});
