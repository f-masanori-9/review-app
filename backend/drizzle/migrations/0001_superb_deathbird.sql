CREATE TABLE `reviewLogs` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`noteId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reviewLogs_id_unique` ON `reviewLogs` (`id`);