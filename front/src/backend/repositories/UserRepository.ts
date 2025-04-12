import { PrismaClient } from "@prisma/client";

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findUserById(id: string) {
    return this.prismaClient.user.findUnique({
      where: { id },
    });
  }
}
