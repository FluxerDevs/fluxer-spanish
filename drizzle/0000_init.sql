CREATE TABLE `bot_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submitter_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_note` text,
	`reviewed_by` text,
	`reviewed_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`client_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`categories` text NOT NULL,
	`language` text NOT NULL,
	`invite_url` text NOT NULL,
	`website` text,
	FOREIGN KEY (`submitter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bot_client_active` ON `bot_submissions` (`client_id`) WHERE status <> 'rejected';--> statement-breakpoint
CREATE INDEX `bot_status` ON `bot_submissions` (`status`);--> statement-breakpoint
CREATE TABLE `community_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submitter_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_note` text,
	`reviewed_by` text,
	`reviewed_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`guild_id` text NOT NULL,
	`invite_code` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`topics` text NOT NULL,
	`icon` text,
	`member_count` integer DEFAULT 0 NOT NULL,
	`presence_count` integer,
	`counts_updated_at` integer,
	FOREIGN KEY (`submitter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_guild_active` ON `community_submissions` (`guild_id`) WHERE status <> 'rejected';--> statement-breakpoint
CREATE INDEX `community_status` ON `community_submissions` (`status`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`guide_slug` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	PRIMARY KEY(`user_id`, `guide_slug`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tool_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submitter_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`review_note` text,
	`reviewed_by` text,
	`reviewed_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`group` text NOT NULL,
	`tagline` text NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`submitter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `tool_status` ON `tool_submissions` (`status`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`global_name` text,
	`avatar` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_login_at` integer NOT NULL
);
