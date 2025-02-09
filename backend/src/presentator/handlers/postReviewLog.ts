import { zValidator } from '@hono/zod-validator';
import { factory } from '../factory';
import { UpdateNoteUseCase } from '../../usecases/UpdateNoteUseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { z } from 'zod';
import { ReviewNoteUseCase } from '../../usecases/ReviewNoteUseCase';
import { ReviewLogsRepository } from '../../repositories/ReviewLogsRepository';

const postReviewLogSchema = z.object({
	noteId: z.string(),
});

export const postReviewLogHandler = factory.createHandlers(zValidator('json', postReviewLogSchema), async (c) => {
	const userId = c.get('userId');

	const useCase = new ReviewNoteUseCase(new ReviewLogsRepository(c.get('d1Drizzle')));

	await useCase.execute({
		userId: userId || '',
		noteId: c.req.valid('json').noteId,
	});

	return c.json({
		message: 'Review log created',
	});
});
