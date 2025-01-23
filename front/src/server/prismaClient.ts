import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prismaClient: PrismaClient | undefined;
};

if (!globalForPrisma.prismaClient) {
  globalForPrisma.prismaClient = new PrismaClient();
}
const prismaClient: PrismaClient = globalForPrisma.prismaClient;

export { prismaClient };
