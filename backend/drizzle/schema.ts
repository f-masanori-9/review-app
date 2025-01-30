import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name'),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});

export const notes = sqliteTable('notes', {
	id: text('id').primaryKey().unique(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	content: text('content').default('').notNull(), // 内容
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});
