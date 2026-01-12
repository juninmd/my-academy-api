import { defineConfig } from '@prisma/config';
import { expand } from 'dotenv-expand';
import { config } from 'dotenv'; // Load dotenv

expand(config()); // Load and expand env vars

export default defineConfig({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
