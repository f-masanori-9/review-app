import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// usersテーブルのスキーマを定義
export const users = sqliteTable('users', {
	id: integer('id').primaryKey().notNull(), // ユーザーID（主キー）
	createdAt: text('created_at').default('CURRENT_TIMESTAMP'), // 作成日時
});

export const notes = sqliteTable('notes', {
	id: integer('id').primaryKey().notNull(), // ノートID（主キー）
	userId: integer('user_id').notNull(), // ユーザーID
	title: text('title').notNull(), // タイトル
	body: text('body').notNull(), // 本文
	createdAt: text('created_at').default('CURRENT_TIMESTAMP'), // 作成日時
	updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'), // 更新日時
});
