import { NoteRepository } from '../repositories/NoteRepository';
import { Note } from '../models/Note';
import { ReviewLog } from '../models/ReviewLog';

export class CreateNoteUseCase {
	constructor(private noteRepository: NoteRepository) {}

	async execute(params: { userId: string; content: string; rootNoteId?: string; parentNoteId?: string }) {
		const note = Note.createNew({
			userId: params.userId,
			content: params.content,
			rootNoteId: params.rootNoteId,
			parentNoteId: params.parentNoteId,
		});

		const reviewLog = ReviewLog.createNew({
			userId: params.userId,
			noteId: note.id,
		});

		await this.noteRepository.create(note);
		// await this.reviewLogsRepository.create(reviewLog);

		return note;
	}
}
