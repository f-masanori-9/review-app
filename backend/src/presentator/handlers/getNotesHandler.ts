import { uniqBy } from 'lodash';
import { notesTable, reviewLogsTable } from '../../../drizzle/schema';

import { eq } from 'drizzle-orm';
import { createHandlers } from '../utils/factory';

export const getNotesHandler = createHandlers(async (c) => {
	const userId = c.get('userId');
	const d1Drizzle = c.get('d1Drizzle');

	const notesAndReviewLogs = await d1Drizzle
		.select()
		.from(notesTable)
		.leftJoin(reviewLogsTable, eq(notesTable.id, reviewLogsTable.noteId))
		.where(eq(notesTable.userId, userId || ''));

	const notes_ = uniqBy(notesAndReviewLogs, (d) => d.notes.id).map((d) => d.notes);

	const mainNotes = notes_.filter((d) => !d.rootNoteId);
	const subNotes = notes_.filter((d) => d.rootNoteId);

	const notesWithReviewLogs = mainNotes.map((note) => {
		const reviewLogs = notesAndReviewLogs.filter((d) => d.reviewLogs?.noteId === note.id).flatMap((d) => d.reviewLogs || []);
		const subNotes_ = subNotes.filter((d) => d.rootNoteId === note.id);
		return { ...note, reviewLogs, subNotes: subNotes_, type: 'note' } as const;
	});

	return c.json([...notesWithReviewLogs]);
});
