CREATE TABLE `vocabularyNoteLogs` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`noteId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`noteId`) REFERENCES `vocabularyNotes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vocabularyNoteLogs_id_unique` ON `vocabularyNoteLogs` (`id`);--> statement-breakpoint
CREATE TABLE `vocabularyNotes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`answerText` text DEFAULT '' NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vocabularyNotes_id_unique` ON `vocabularyNotes` (`id`);