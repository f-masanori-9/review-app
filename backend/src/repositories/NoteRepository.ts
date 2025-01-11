import { DrizzleD1Database } from 'drizzle-orm/d1';
import { Note } from '../models/Note';
import { eq, and } from 'drizzle-orm';
import { notes as notesTable } from '../../drizzle/schema';

export class NoteRepository {
	constructor(readonly d1Drizzle: DrizzleD1Database<Record<string, never>>) {}

	async findById({ userId, noteId }: { userId: string; noteId: string }): Promise<Note | null> {
		const note = await this.d1Drizzle
			.select()
			.from(notesTable)
			.where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
			.get();

		return note ? new Note(note) : null;
	}

	async create(note: Note): Promise<void> {
		await this.d1Drizzle
			.insert(notesTable)
			.values([
				{
					...note,
				},
			])
			.returning()
			.get();
	}

	async update(note: Note): Promise<void> {
		await this.d1Drizzle
			.update(notesTable)
			.set({
				...note,
			})
			.where(and(eq(notesTable.id, note.id), eq(notesTable.userId, note.userId)))
			.returning()
			.get();
	}
}
