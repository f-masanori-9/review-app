export class NoteToTagRelation {
  readonly id: string;

  readonly userId: string;
  readonly vocabularyNoteId: string;
  readonly tagId: string;
  readonly createdAt: Date;

  constructor(params: ExcludeMethods<NoteToTagRelation>) {
    this.id = params.id;
    this.userId = params.userId;
    this.vocabularyNoteId = params.vocabularyNoteId;
    this.tagId = params.tagId;
    this.createdAt = params.createdAt;
  }

  static createNew(
    params: Omit<
      ExcludeMethods<NoteToTagRelation>,
      "id" | "createdAt" | "updatedAt"
    >
  ) {
    return new NoteToTagRelation({
      id: crypto.randomUUID(),
      userId: params.userId,
      vocabularyNoteId: params.vocabularyNoteId,
      tagId: params.tagId,
      createdAt: new Date(),
    });
  }
}
