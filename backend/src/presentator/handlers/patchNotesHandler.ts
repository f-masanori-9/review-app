import { zValidator } from '@hono/zod-validator';
import { factory } from '../factory';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { z } from 'zod';

const patchNotesSchema = z.object({
	noteId: z.string(),
	content: z.string(),
});

export const patchNotesHandler = factory.createHandlers(zValidator('json', patchNotesSchema), async (c) => {
	const userId = c.get('userId');
	const body = c.req.valid('json');

	const usecase = new UpdateNoteUseCase(new NoteRepository(c.get('d1Drizzle')));
	const result = await usecase.execute({
		userId: userId || '',
		noteId: body.noteId,
		content: c.req.valid('json').content,
	});

	return c.json(result);
});
