-- CreateTable
CREATE TABLE "VocabularyNoteReviewLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabularyNoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VocabularyNoteReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VocabularyNoteReviewLog_userId_idx" ON "VocabularyNoteReviewLog"("userId");

-- AddForeignKey
ALTER TABLE "VocabularyNoteReviewLog" ADD CONSTRAINT "VocabularyNoteReviewLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabularyNoteReviewLog" ADD CONSTRAINT "VocabularyNoteReviewLog_vocabularyNoteId_fkey" FOREIGN KEY ("vocabularyNoteId") REFERENCES "VocabularyNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
