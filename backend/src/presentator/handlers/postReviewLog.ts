import { zValidator } from '@hono/zod-validator';

import { z } from 'zod';
import { ReviewNoteUseCase } from '../../usecases/ReviewNoteUseCase';
import { ReviewLogsRepository } from '../../repositories/ReviewLogsRepository';
import { createHandlers } from '../utils/factory';

const postReviewLogSchema = z.object({
	noteId: z.string(),
});

export const postReviewLogHandler = createHandlers(zValidator('json', postReviewLogSchema), async (c) => {
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
