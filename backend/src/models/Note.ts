export class Note {
	readonly id: string;
	readonly userId: string;
	readonly content: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(params: ExcludeMethods<Note>) {
		this.id = params.id;
		this.userId = params.userId;
		this.content = params.content;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
	}

	static createNew({ userId, title, content }: { userId: string; title: string; content: string }) {
		return new Note({
			id: crypto.randomUUID(),
			userId,
			content,
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
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
