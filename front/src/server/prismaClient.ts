import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

const globalForPrisma = global as unknown as {
  prismaClient: PrismaClient | undefined;
};

if (!globalForPrisma.prismaClient) {
  globalForPrisma.prismaClient = new PrismaClient();
}
prismaClient = globalForPrisma.prismaClient;

export { prismaClient };
