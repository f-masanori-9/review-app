import { NoteRepository } from '../repositories/NoteRepository';

export class GetNotesUseCase {
	constructor(private noteRepository: NoteRepository) {}

	async execute({ userId }: { userId: string }) {
		return this.noteRepository.findByUserId({ userId });
	}
}
