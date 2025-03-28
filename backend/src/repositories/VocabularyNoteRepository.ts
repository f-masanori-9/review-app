import { vocabularyNotesTable } from '../drizzle/schema';
import { DrizzleClient } from '@/types';
import { VocabularyNote } from '@/models/VocabularyNote';

export class VocabularyNoteRepository {
	constructor(readonly d1Drizzle: DrizzleClient) {}

	async create(vocabularyNote: VocabularyNote): Promise<void> {
		await this.d1Drizzle
			.insert(vocabularyNotesTable)
			.values([
				{
					...vocabularyNote,
				},
			])
			.returning()
			.get();
	}
}
