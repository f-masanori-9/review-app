export class ReviewLog {
	id: string;
	userId: string;
	noteId: string;
	createdAt: Date;
	constructor(init: ExcludeMethods<ReviewLog>) {
		this.id = init.id;
		this.userId = init.userId;
		this.noteId = init.noteId;
		this.createdAt = init.createdAt;
	}

	static createNew({ userId, noteId }: { userId: string; noteId: string }) {
		return new ReviewLog({
			id: crypto.randomUUID(),
			userId,
			noteId,
			createdAt: new Date(),
		});
	}
}
