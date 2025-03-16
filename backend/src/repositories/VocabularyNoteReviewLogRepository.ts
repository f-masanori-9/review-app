import { eq } from 'drizzle-orm';
import { vocabularyNoteReviewLogsTable } from '../drizzle/schema';
import { VocabularyNoteReviewLog } from '../models/VocabularyNoteReviewLog';
import { DrizzleClient } from '@/types';

export class VocabularyNoteReviewLogRepository {
	constructor(readonly d1Drizzle: DrizzleClient) {}

	async findByUserId({ userId }: { userId: string }): Promise<VocabularyNoteReviewLog[]> {
		const reviewLogs = await this.d1Drizzle
			.select()
			.from(vocabularyNoteReviewLogsTable)
			.where(eq(vocabularyNoteReviewLogsTable.userId, userId));

		return reviewLogs.map((reviewLog) => new VocabularyNoteReviewLog(reviewLog));
	}

	async create(reviewLog: VocabularyNoteReviewLog): Promise<void> {
		await this.d1Drizzle
			.insert(vocabularyNoteReviewLogsTable)
			.values([
				{
					...reviewLog,
				},
			])
			.returning()
			.get();
	}
}
