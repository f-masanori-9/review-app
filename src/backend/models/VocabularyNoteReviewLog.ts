export class VocabularyNoteReviewLog {
	readonly id: string;
	readonly userId: string;
	readonly vocabularyNoteId: string;
	readonly createdAt: Date;

	constructor(params: ExcludeMethods<VocabularyNoteReviewLog>) {
		this.id = params.id;
		this.userId = params.userId;
		this.vocabularyNoteId = params.vocabularyNoteId;
		this.createdAt = params.createdAt;
	}

	static createNew(params: Omit<ExcludeMethods<VocabularyNoteReviewLog>, 'id' | 'createdAt' | 'updatedAt' | 'type'>) {
		return new VocabularyNoteReviewLog({
			id: crypto.randomUUID(),
			userId: params.userId,
			vocabularyNoteId: params.vocabularyNoteId,
			createdAt: new Date(),
		});
	}
}
