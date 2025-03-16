import { vocabularyNotesTable } from '../../../drizzle/schema';
import { VocabularyNoteReviewLog } from '../../models/VocabularyNoteReviewLog';
import { VocabularyNoteReviewLogRepository } from '../../repositories/VocabularyNoteReviewLogRepository';

import { eq } from 'drizzle-orm';
import { createHandlers } from '../utils/factory';

export const getVocabularyNotesHandler = createHandlers(async (c) => {
	const userId = c.get('userId');
	const d1Drizzle = c.get('d1Drizzle');

	const vocabularyNoteReviewLogRepository = new VocabularyNoteReviewLogRepository(d1Drizzle);
	const vocabularyNoteReviewLogs = await vocabularyNoteReviewLogRepository.findByUserId({ userId: userId || '' });

	const noteIdToReviewLogs = vocabularyNoteReviewLogs.reduce<Record<string, VocabularyNoteReviewLog[]>>((acc, d) => {
		const current = acc[d.vocabularyNoteId];
		if (current) {
			acc[d.vocabularyNoteId] = [...current, d];
		} else {
			acc[d.vocabularyNoteId] = [d];
		}
		return acc;
	}, {});
	const vocabularyNote = (
		await d1Drizzle
			.select()
			.from(vocabularyNotesTable)
			.where(eq(vocabularyNotesTable.userId, userId || ''))
	).map((d) => ({ ...d, type: 'vocabularyNote' } as const));

	return c.json(vocabularyNote.map((d) => ({ ...d, reviewCount: noteIdToReviewLogs[d.id]?.length || 0 })));
});
