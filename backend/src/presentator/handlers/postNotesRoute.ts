import { zValidator } from '@hono/zod-validator';
import { factory } from '../factory';
import { NoteRepository } from '../../repositories/NoteRepository';
import { z } from 'zod';
import { CreateNoteUseCase } from '../../usecases/CreateNoteUseCase';

const postNotesSchema = z.object({
	title: z.string(),
	content: z.string(),
	rootNoteId: z.string().optional(),
	parentNoteId: z.string().optional(),
});

export const postNotesHandler = factory.createHandlers(zValidator('json', postNotesSchema), async (c) => {
	const userId = c.get('userId');

	const d1Drizzle = c.get('d1Drizzle');
	const body = c.req.valid('json');

	const usecase = new CreateNoteUseCase(new NoteRepository(d1Drizzle));
	const result = await usecase.execute({
		userId,
		content: body.content,
		rootNoteId: body.rootNoteId,
		parentNoteId: body.parentNoteId,
	});

	return c.json(result);
});
