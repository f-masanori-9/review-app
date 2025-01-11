import { defineConfig } from 'drizzle-kit';

const common = {
	dialect: 'sqlite',
	out: './drizzle/migrations',
	schema: './drizzle/schema.ts',
} as const;
export default process.env.LOCAL_DB_PATH
	? defineConfig({
			...common,
			dbCredentials: {
				url: process.env.LOCAL_DB_PATH!,
			},
	  })
	: defineConfig({
			...common,
			driver: 'd1-http',
			dbCredentials: {
				// url: process.env.LOCAL_DB_PATH!,
				accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
				databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
				token: process.env.CLOUDFLARE_D1_TOKEN!,
			},
	  });
