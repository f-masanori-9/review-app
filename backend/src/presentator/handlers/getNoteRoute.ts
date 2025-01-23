import { notes } from '../../../drizzle/schema';
import { factory } from '../factory';
import { eq, and } from 'drizzle-orm';

export const getNoteHandler = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const noteId = c.req.param('noteId');
	const d1Drizzle = c.get('d1Drizzle');
	const note = (
		await d1Drizzle
			.select()
			.from(notes)
			.where(and(eq(notes.id, noteId), eq(notes.userId, userId || '')))
	)[0];

	return c.json(note);
});
