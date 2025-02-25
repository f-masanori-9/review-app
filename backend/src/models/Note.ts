export class Note {
	readonly id: string;
	readonly userId: string;
	readonly content: string;
	readonly rootNoteId?: string;
	readonly parentNoteId?: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(params: ExcludeMethods<Note>) {
		this.id = params.id;
		this.userId = params.userId;
		this.content = params.content;
		this.rootNoteId = params.rootNoteId;
		this.parentNoteId = params.parentNoteId;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
	}

	static createNew(params: Omit<ExcludeMethods<Note>, 'id' | 'createdAt' | 'updatedAt'>) {
		return new Note({
			id: crypto.randomUUID(),
			userId: params.userId,
			content: params.content,
			rootNoteId: params.rootNoteId,
			parentNoteId: params.parentNoteId,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	update({ content }: { content: string }) {
		return new Note({
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
			rootNoteId: this.rootNoteId,
			parentNoteId: this.parentNoteId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
