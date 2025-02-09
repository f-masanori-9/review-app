import { notesTable } from '../../../drizzle/schema';
import { factory } from '../factory';
import { eq } from 'drizzle-orm';

export const getNotesHandler = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const d1Drizzle = c.get('d1Drizzle');

	const notes_ = await d1Drizzle
		.select()
		.from(notesTable)
		.where(eq(notesTable.userId, userId || ''));

	return c.json(notes_);
});
