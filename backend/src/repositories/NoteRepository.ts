import { Note } from '../models/Note';
import { eq, and } from 'drizzle-orm';
import { notesTable, reviewLogsTable } from '../drizzle/schema';
import { DrizzleClient } from '@/types';

export class NoteRepository {
	constructor(readonly d1Drizzle: DrizzleClient) {}

	async findById({ userId, noteId }: { userId: string; noteId: string }): Promise<Note | null> {
		const note = await this.d1Drizzle
			.select()
			.from(notesTable)
			.where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
			.get();

		return note
			? new Note({
					...note,
					rootNoteId: note.rootNoteId ? note.rootNoteId : undefined,
					parentNoteId: note.parentNoteId ? note.parentNoteId : undefined,
			  })
			: null;
	}

	async findByUserId({ userId }: { userId: string }) {
		const notesAndReviewRecord = await this.d1Drizzle
			.select()
			.from(notesTable)
			.leftJoin(reviewLogsTable, eq(reviewLogsTable.noteId, notesTable.id))
			.where(eq(notesTable.userId, userId));

		return notesAndReviewRecord;
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

	async delete({ userId, noteId }: { userId: string; noteId: string }): Promise<void> {
		await this.d1Drizzle
			.delete(notesTable)
			.where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
			.get();
	}
}
