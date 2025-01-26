import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name'),
	createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
	updatedAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});

export const notes = sqliteTable('notes', {
	id: text('id').primaryKey().unique(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	content: text('content').default('').notNull(), // 内容
	createdAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
	updatedAt: integer({ mode: 'timestamp' }).notNull().default(new Date()),
});
