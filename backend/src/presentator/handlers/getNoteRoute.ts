import { notesTable, reviewLogsTable } from '../../../drizzle/schema';

import { eq, and, sql, inArray } from 'drizzle-orm';
import { createHandlers } from '../utils/factory';

export const getNoteHandler = createHandlers(async (c) => {
	const userId = c.get('userId');
	const noteId = c.req.param('noteId');
	const d1Drizzle = c.get('d1Drizzle');
	const note = (
		await d1Drizzle
			.select()
			.from(notesTable)
			.where(and(eq(notesTable.id, noteId || ''), eq(notesTable.userId, userId || '')))
	)[0];

	const subNotes = await d1Drizzle
		.select()
		.from(notesTable)
		.where(and(eq(notesTable.rootNoteId, noteId || ''), eq(notesTable.userId, userId || '')));

	const reviewLogsCount = await d1Drizzle
		.select({
			noteId: reviewLogsTable.noteId,
			count: sql<number>`cast(count(${reviewLogsTable.id}) as int)`,
		})
		.from(reviewLogsTable)
		.where(inArray(reviewLogsTable.noteId, [noteId || [], ...subNotes.map((n) => n.id)].flat()))
		.groupBy(reviewLogsTable.noteId);

	const rootNoteReviewCount = reviewLogsCount.find((r) => r.noteId === noteId)?.count || 0;

	return c.json({
		note: note
			? Object.assign(note, {
					reviewCount: rootNoteReviewCount,
			  })
			: null,
		subNotes: subNotes.map((subNote) => {
			const reviewCount = reviewLogsCount.find((r) => r.noteId === subNote.id)?.count || 0;
			return Object.assign(subNote, {
				reviewCount,
			});
		}),
	});
});
