import { DrizzleD1Database } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import { ReviewLog } from '../models/ReviewLog';
import { reviewLogsTable } from '../../drizzle/schema';

export class ReviewLogsRepository {
	constructor(readonly d1Drizzle: DrizzleD1Database<Record<string, never>>) {}

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
