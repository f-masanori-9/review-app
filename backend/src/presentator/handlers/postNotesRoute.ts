import { zValidator } from '@hono/zod-validator';
import { factory } from '../factory';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { z } from 'zod';
import { Note } from '../../models/Note';
import { notesTable } from '../../../drizzle/schema';

const postNotesSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export const postNotesHandler = factory.createHandlers(zValidator('json', postNotesSchema), async (c) => {
	const userId = c.get('userId');

	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');
	const note = Note.createNew({
		userId,
		title: body.title,
		content: body.content,
	});

	await d1Drizzle
		.insert(notesTable)
		.values([
			{
				id: note.id,
				userId: note.userId,
				content: note.content,
				createdAt: note.createdAt,
				updatedAt: note.updatedAt,
			},
		])
		.returning()
		.get();

	return c.json(note);
});
