export class VocabularyNote {
	readonly id: string;
	readonly userId: string;
	readonly content: string;
	readonly answerText: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
	readonly type = 'vocabularyNote' as const;

	constructor(params: ExcludeMethods<VocabularyNote>) {
		this.id = params.id;
		this.userId = params.userId;
		this.content = params.content;
		this.answerText = params.answerText;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
	}

	static createNew(params: Omit<ExcludeMethods<VocabularyNote>, 'createdAt' | 'updatedAt' | 'type'>) {
		return new VocabularyNote({
			id: params.id,
			userId: params.userId,
			content: params.content,
			answerText: params.answerText,
			createdAt: new Date(),
			updatedAt: new Date(),
			type: 'vocabularyNote',
		});
	}

	update({ content }: { content: string }) {
		return new VocabularyNote({
			...this,
			content,
			updatedAt: new Date(),
		});
	}

	toJSON() {
		return {
			id: this.id,
			userId: this.userId,
			content: this.content,
			answerText: this.answerText,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
