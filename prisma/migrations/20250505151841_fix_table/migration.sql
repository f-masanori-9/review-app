/*
  Warnings:

  - You are about to drop the column `userId` on the `SharedVNoteToUserRelation` table. All the data in the column will be lost.
  - Added the required column `sharedUserId` to the `SharedVNoteToUserRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedVNoteToUserRelation" DROP CONSTRAINT "SharedVNoteToUserRelation_userId_fkey";

-- DropIndex
DROP INDEX "SharedVNoteToUserRelation_userId_idx";

-- AlterTable
ALTER TABLE "SharedVNoteToUserRelation" DROP COLUMN "userId",
ADD COLUMN     "sharedUserId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserFriendShip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFriendShip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFriendShip_userId_friendId_key" ON "UserFriendShip"("userId", "friendId");

-- CreateIndex
CREATE INDEX "SharedVNoteToUserRelation_sharedUserId_idx" ON "SharedVNoteToUserRelation"("sharedUserId");

-- AddForeignKey
ALTER TABLE "UserFriendShip" ADD CONSTRAINT "UserFriendShip_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriendShip" ADD CONSTRAINT "UserFriendShip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedVNoteToUserRelation" ADD CONSTRAINT "SharedVNoteToUserRelation_sharedUserId_fkey" FOREIGN KEY ("sharedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
