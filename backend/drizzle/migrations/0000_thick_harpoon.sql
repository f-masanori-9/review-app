CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`createdAt` integer DEFAULT '"2025-01-23T16:32:04.384Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-01-23T16:32:04.384Z"' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notes_id_unique` ON `notes` (`id`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`createdAt` integer DEFAULT '"2025-01-23T16:32:04.384Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-01-23T16:32:04.384Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);