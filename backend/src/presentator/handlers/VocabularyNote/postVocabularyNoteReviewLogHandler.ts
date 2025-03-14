import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { VocabularyNoteReviewLogRepository } from '../../../repositories/VocabularyNoteReviewLogRepository';
import { VocabularyNoteReviewLog } from '../../../models/VocabularyNoteReviewLog';
import { factory } from '../../factory';

const postReviewLogSchema = z.object({
	noteId: z.string(),
});

export const postVocabularyNoteReviewLogHandler = factory.createHandlers(zValidator('json', postReviewLogSchema), async (c) => {
	const userId = c.get('userId');

	const repository = new VocabularyNoteReviewLogRepository(c.get('d1Drizzle'));
	await repository.create(
		VocabularyNoteReviewLog.createNew({
			userId: userId || '',
			vocabularyNoteId: c.req.valid('json').noteId,
		})
	);

	return c.json({
		message: 'voca Review log created',
	});
});
