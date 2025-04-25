export class Tag {
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly order: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(params: ExcludeMethods<Tag>) {
    this.id = params.id;
    this.name = params.name;
    this.userId = params.userId;
    this.order = params.order;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static createNew(
    params: Omit<ExcludeMethods<Tag>, "id" | "createdAt" | "updatedAt">
  ) {
    return new Tag({
      id: crypto.randomUUID(),
      name: params.name,
      userId: params.userId,
      order: params.order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createWithId(
    params: Omit<ExcludeMethods<Tag>, "createdAt" | "updatedAt">
  ) {
    return new Tag({
      id: params.id,
      name: params.name,
      userId: params.userId,
      order: params.order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
