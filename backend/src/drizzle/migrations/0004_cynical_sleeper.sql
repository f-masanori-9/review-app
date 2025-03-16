ALTER TABLE `vocabularyNoteLogs` RENAME TO `vocabularyNoteReviewLogs`;--> statement-breakpoint
ALTER TABLE `vocabularyNoteReviewLogs` RENAME COLUMN "noteId" TO "vocabularyNoteId";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabularyNoteReviewLogs` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`vocabularyNoteId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`vocabularyNoteId`) REFERENCES `vocabularyNotes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_vocabularyNoteReviewLogs`("id", "userId", "vocabularyNoteId", "createdAt") SELECT "id", "userId", "vocabularyNoteId", "createdAt" FROM `vocabularyNoteReviewLogs`;--> statement-breakpoint
DROP TABLE `vocabularyNoteReviewLogs`;--> statement-breakpoint
ALTER TABLE `__new_vocabularyNoteReviewLogs` RENAME TO `vocabularyNoteReviewLogs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `vocabularyNoteReviewLogs_id_unique` ON `vocabularyNoteReviewLogs` (`id`);