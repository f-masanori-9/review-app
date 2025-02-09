import { zValidator } from '@hono/zod-validator';
import { notesTable } from '../../../drizzle/schema';
import { factory } from '../factory';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { NoteRepository } from '../../repositories/NoteRepository';

const deleteNotesSchema = z.object({
	noteId: z.string(),
});

export const deleteNoteRoute = factory.createHandlers(zValidator('json', deleteNotesSchema), async (c) => {
	const userId = c.get('userId');
	const body = c.req.valid('json');

	const d1Drizzle = c.get('d1Drizzle');
	const repository = new NoteRepository(d1Drizzle);
	await repository.delete({
		userId: userId || '',
		noteId: body.noteId,
	});

	return c.json({
		message: 'Note deleted',
	});
});
