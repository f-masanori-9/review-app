import { ReviewLog } from '../models/ReviewLog';
import { ReviewLogsRepository } from '../repositories/ReviewLogsRepository';

export class ReviewNoteUseCase {
	constructor(private reviewLogsRepository: ReviewLogsRepository) {}

	async execute({ noteId, userId }: { noteId: string; userId: string }) {
		const reviewLog = ReviewLog.createNew({
			userId,
			noteId,
		});

		await this.reviewLogsRepository.create(reviewLog);

		return reviewLog;
	}
}
