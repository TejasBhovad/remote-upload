import { betterAuth } from "better-auth";
import { db } from "..";
import * as schema from "../db/schema";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    trustedOrigins: [
    "http://localhost:3000",   // HTTP version
    "https://localhost:3000"   // HTTPS version - ADD THIS
  ],
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
        schema: schema,
    }),
});