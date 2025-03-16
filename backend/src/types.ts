import { DrizzleD1Database } from 'drizzle-orm/d1';
import { tables } from 'drizzle/schema';

export type drizzleSchema = typeof tables;
export type DrizzleClient = DrizzleD1Database<drizzleSchema>;
