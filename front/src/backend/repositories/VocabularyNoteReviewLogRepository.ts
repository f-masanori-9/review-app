import {
  PrismaClient,
  VocabularyNoteReviewLog as VocabularyNoteReviewLogDAO,
} from "@prisma/client";
import { VocabularyNoteReviewLog } from "../models/VocabularyNoteReviewLog";

export class VocabularyNoteReviewLogRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll() {
    return this.prismaClient.vocabularyNote.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findByUserId({ userId }: { userId: string }) {
    const results = await this.prismaClient.vocabularyNoteReviewLog.findMany({
      where: { userId },
    });
    return results.map(toVocabularyNoteReviewLog);
  }

  async create(vocabularyNote: VocabularyNoteReviewLog) {
    await this.prismaClient.vocabularyNoteReviewLog.create({
      data: toVocabularyNoteReviewLogDAO(vocabularyNote),
    });
  }
}

export const toVocabularyNoteReviewLog = (
  data: VocabularyNoteReviewLogDAO
): VocabularyNoteReviewLog => {
  return new VocabularyNoteReviewLog({ ...data });
};

export const toVocabularyNoteReviewLogDAO = (
  data: VocabularyNoteReviewLog
): VocabularyNoteReviewLogDAO => {
  return {
    ...data,
  };
};
