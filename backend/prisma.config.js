// prisma.config.js
const { defineConfig, env } = require('@prisma/config'); // Added the @ here
require('dotenv').config();

module.exports = defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        url: env('DATABASE_URL'),
    },
});