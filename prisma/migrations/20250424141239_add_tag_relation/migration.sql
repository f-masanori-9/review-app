-- CreateTable
CREATE TABLE "NoteToTagRelations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "vocabularyNoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoteToTagRelations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NoteToTagRelations" ADD CONSTRAINT "NoteToTagRelations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteToTagRelations" ADD CONSTRAINT "NoteToTagRelations_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteToTagRelations" ADD CONSTRAINT "NoteToTagRelations_vocabularyNoteId_fkey" FOREIGN KEY ("vocabularyNoteId") REFERENCES "VocabularyNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
