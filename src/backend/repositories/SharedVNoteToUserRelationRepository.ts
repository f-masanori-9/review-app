// import {
//   PrismaClient,
//   SharedVNoteToUserRelation as SharedVNoteToUserRelationDAO,
// } from "@prisma/client";

// export class SharedVNoteToUserRelationRepository {
//   constructor(private readonly prismaClient: PrismaClient) {}

//   async findByUserId({ userId }: { userId: string }) {
//     const results = await this.prismaClient.sharedVNoteToUserRelation.findMany({
//       where: { userId },
//       orderBy: { updatedAt: "asc" },
//     });
//     return results;
//   }

//   async create(sharedVNoteToUserRelation: any) {
//     const result = await this.prismaClient.sharedVNoteToUserRelation.create({
//       data: sharedVNoteToUserRelation,
//     });
//     return result;
//   }
// }

// const toSharedVNoteToUserRelation = (
//   sharedVNoteToUserRelation: SharedVNoteToUserRelationDAO
// ) => {
//   return {
//     id: sharedVNoteToUserRelation.id,
//     userId: sharedVNoteToUserRelation.userId,
//     vocabularyNoteId: sharedVNoteToUserRelation.vocabularyNoteId,
//     createdAt: sharedVNoteToUserRelation.createdAt,
//     updatedAt: sharedVNoteToUserRelation.updatedAt,
//   };
// };
// const toSharedVNoteToUserRelationDAO = (
//   sharedVNoteToUserRelation: SharedVNoteToUserRelation
// ) => {
//   return {
//     id: sharedVNoteToUserRelation.id,
//     userId: sharedVNoteToUserRelation.userId,
//     vocabularyNoteId: sharedVNoteToUserRelation.vocabularyNoteId,
//     createdAt: sharedVNoteToUserRelation.createdAt,
//     updatedAt: sharedVNoteToUserRelation.updatedAt,
//   };
// };
