import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const usersTable = sqliteTable('user', {
	id: text('id').primaryKey().unique(),
	name: text('name'),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});

export const notesTable = sqliteTable('notes', {
	id: text('id').primaryKey().unique(),
	userId: text('userId')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	content: text('content').default('').notNull(), // 内容
	rootNoteId: text('rootNoteId'),
	parentNoteId: text('parentNoteId'),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});

export const reviewLogsTable = sqliteTable('reviewLogs', {
	id: text('id').primaryKey().unique(),
	userId: text('userId')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	noteId: text('noteId')
		.notNull()
		.references(() => notesTable.id, { onDelete: 'cascade' }),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
});

export const notesRelations = relations(notesTable, ({ many }) => ({
	reviewLogs: many(reviewLogsTable),
}));

export const reviewLogsRelations = relations(reviewLogsTable, ({ one }) => ({
	note: one(notesTable, {
		fields: [reviewLogsTable.noteId],
		references: [notesTable.id],
	}),
}));
