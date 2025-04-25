/*
  Warnings:

  - You are about to drop the `NoteToTagRelations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NoteToTagRelations" DROP CONSTRAINT "NoteToTagRelations_tagId_fkey";

-- DropForeignKey
ALTER TABLE "NoteToTagRelations" DROP CONSTRAINT "NoteToTagRelations_userId_fkey";

-- DropForeignKey
ALTER TABLE "NoteToTagRelations" DROP CONSTRAINT "NoteToTagRelations_vocabularyNoteId_fkey";

-- DropTable
DROP TABLE "NoteToTagRelations";

-- CreateTable
CREATE TABLE "NoteToTagRelation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "vocabularyNoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteToTagRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NoteToTagRelation" ADD CONSTRAINT "NoteToTagRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteToTagRelation" ADD CONSTRAINT "NoteToTagRelation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteToTagRelation" ADD CONSTRAINT "NoteToTagRelation_vocabularyNoteId_fkey" FOREIGN KEY ("vocabularyNoteId") REFERENCES "VocabularyNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
