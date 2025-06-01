-- CreateTable
CREATE TABLE "SharedVNoteToUserRelation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabularyNoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedVNoteToUserRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SharedVNoteToUserRelation_userId_idx" ON "SharedVNoteToUserRelation"("userId");

-- AddForeignKey
ALTER TABLE "SharedVNoteToUserRelation" ADD CONSTRAINT "SharedVNoteToUserRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedVNoteToUserRelation" ADD CONSTRAINT "SharedVNoteToUserRelation_vocabularyNoteId_fkey" FOREIGN KEY ("vocabularyNoteId") REFERENCES "VocabularyNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
