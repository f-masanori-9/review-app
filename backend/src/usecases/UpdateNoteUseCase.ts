import { HTTPException } from 'hono/http-exception';
import { NoteRepository } from '../repositories/NoteRepository';

export class UpdateNoteUseCase {
	constructor(private noteRepository: NoteRepository) {}

	async execute({ userId, noteId, content }: { userId: string; noteId: string; content: string }) {
		const existingNote = await this.noteRepository.findById({
			userId,
			noteId,
		});
		if (!existingNote) {
			throw new HTTPException(401, { cause: new Error('Note not found') });
		}
		const updatedNote = existingNote.update({ content });

		await this.noteRepository.update(updatedNote);

		return updatedNote;
	}
}
