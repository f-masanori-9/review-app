-- CreateTable
CREATE TABLE "VocabularyNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "frontContent" TEXT NOT NULL,
    "backContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VocabularyNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VocabularyNote_userId_idx" ON "VocabularyNote"("userId");

-- AddForeignKey
ALTER TABLE "VocabularyNote" ADD CONSTRAINT "VocabularyNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
