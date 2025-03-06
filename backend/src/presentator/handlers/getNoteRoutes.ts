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

	const mainNotes = notes_.filter((d) => !d.rootNoteId);
	const subNotes = notes_.filter((d) => d.rootNoteId);

	const notesWithReviewLogs = mainNotes.map((note) => {
		const reviewLogs = notesAndReviewLogs.filter((d) => d.reviewLogs?.noteId === note.id).flatMap((d) => d.reviewLogs || []);
		const subNotes_ = subNotes.filter((d) => d.rootNoteId === note.id);
		return { ...note, reviewLogs, subNotes: subNotes_ };
	});

	// return c.json(notesWithReviewLogs.sort(() => Math.random() - 0.5));
	const today = new Date();
	const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + today.getHours();
	return c.json(shuffleWithSeed(notesWithReviewLogs, seed));
});

const seededRandom = (seed: number) => {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
};

const shuffleWithSeed = (array: any[], seed: number) => {
	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(seededRandom(seed + i) * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
};
