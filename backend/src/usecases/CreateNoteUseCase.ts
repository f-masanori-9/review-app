import { NoteRepository } from '../repositories/NoteRepository';
import { Note } from '../models/Note';
import { ReviewLogsRepository } from '../repositories/ReviewLogsRepository';
import { ReviewLog } from '../models/ReviewLog';

export class CreateNoteUseCase {
	constructor(private noteRepository: NoteRepository, private reviewLogsRepository: ReviewLogsRepository) {}

	async execute({ userId, title, content }: { userId: string; title: string; content: string }) {
		const note = Note.createNew({
			userId,
			title,
			content,
		});

		const reviewLog = ReviewLog.createNew({
			userId,
			noteId: note.id,
		});

		await this.noteRepository.create(note);
		await this.reviewLogsRepository.create(reviewLog);

		return note;
	}
}
