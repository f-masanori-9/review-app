CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
