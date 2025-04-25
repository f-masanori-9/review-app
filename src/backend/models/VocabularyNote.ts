export class VocabularyNote {
  readonly id: string;
  readonly userId: string;
  readonly frontContent: string;
  readonly backContent: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: ExcludeMethods<VocabularyNote>) {
    this.id = params.id;
    this.userId = params.userId;
    this.frontContent = params.frontContent;
    this.backContent = params.backContent;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static createNew(
    params: Omit<
      ExcludeMethods<VocabularyNote>,
      "createdAt" | "updatedAt" | "type"
    >
  ) {
    return new VocabularyNote({
      id: params.id,
      userId: params.userId,
      frontContent: params.frontContent,
      backContent: params.backContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  update(
    params: Partial<
      Omit<ExcludeMethods<VocabularyNote>, "createdAt" | "updatedAt">
    >
  ): VocabularyNote {
    return new VocabularyNote({
      ...this,
      ...params,
      updatedAt: new Date(),
    });
  }
}
