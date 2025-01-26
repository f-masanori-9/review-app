PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`createdAt` integer DEFAULT '"2025-01-26T09:15:35.598Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-01-26T09:15:35.598Z"' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "userId", "content", "createdAt", "updatedAt") SELECT "id", "userId", "content", "createdAt", "updatedAt" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `notes_id_unique` ON `notes` (`id`);--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`createdAt` integer DEFAULT '"2025-01-26T09:15:35.598Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-01-26T09:15:35.598Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "createdAt", "updatedAt") SELECT "id", "name", "createdAt", "updatedAt" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);