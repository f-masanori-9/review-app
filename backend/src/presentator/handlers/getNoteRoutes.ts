import { uniqBy } from 'lodash';
import { notesTable, reviewLogsTable } from '../../../drizzle/schema';
import { factory } from '../factory';
import { eq } from 'drizzle-orm';

export const getNotesHandler = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const d1Drizzle = c.get('d1Drizzle');

	const notesAndReviewLogs = await d1Drizzle
		.select()
		.from(notesTable)
		.leftJoin(reviewLogsTable, eq(notesTable.id, reviewLogsTable.noteId))
		.where(eq(notesTable.userId, userId || ''));

	const notes_ = uniqBy(notesAndReviewLogs, (d) => d.notes.id).map((d) => d.notes);

	const notesWithReviewLogs = notes_.map((note) => {
		const reviewLogs = notesAndReviewLogs.filter((d) => d.reviewLogs?.noteId === note.id).flatMap((d) => d.reviewLogs || []);
		return { ...note, reviewLogs };
	});

	return c.json(notesWithReviewLogs);
});
