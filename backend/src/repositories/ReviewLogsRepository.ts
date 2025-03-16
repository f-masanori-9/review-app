import { eq, and } from 'drizzle-orm';
import { ReviewLog } from '../models/ReviewLog';
import { reviewLogsTable } from '../../drizzle/schema';
import { DrizzleClient } from '@/types';

export class ReviewLogsRepository {
	constructor(readonly d1Drizzle: DrizzleClient) {}

	async findByUserId({ userId, noteId }: { userId: string; noteId: string }): Promise<ReviewLog[]> {
		const reviewLogs = await this.d1Drizzle
			.select()
			.from(reviewLogsTable)
			.where(and(eq(reviewLogsTable.id, noteId), eq(reviewLogsTable.userId, userId)));

		return reviewLogs.map((reviewLog) => new ReviewLog(reviewLog));
	}

	async create(reviewLog: ReviewLog): Promise<void> {
		await this.d1Drizzle
			.insert(reviewLogsTable)
			.values([
				{
					...reviewLog,
				},
			])
			.returning()
			.get();
	}
}
