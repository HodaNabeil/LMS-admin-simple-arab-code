#!/usr/bin/env tsx

/**
* Script to generate TypeScript types from OpenAPI schema
* This script fetches the OpenAPI schema from the backend and generates TypeScript types
*/

import * as fs from 'fs';
import * as path from 'path';
import openapiTS, { astToString } from 'openapi-typescript';

// Configuration
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:4000';
const SCHEMA_URL = `${API_BASE_URL}/api/docs-json`;
const TYPES_DIR = path.join(process.cwd(), 'src', 'types');
const GENERATED_DIR = path.join(process.cwd(), 'src', 'generated');
const SCHEMA_OUTPUT_PATH = path.join(GENERATED_DIR, 'openapi-schema.json');
const TYPES_OUTPUT_PATH = path.join(TYPES_DIR, 'api.generated.ts');

/**
* Fetch the OpenAPI schema from the backend
*/
async function fetchSchema(url: string): Promise<Record<string, unknown>> {
    console.log(`📥 Fetching OpenAPI schema from: ${url}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const schema = await response.json();
        console.log('✅ Schema fetched successfully');
        return schema;
    } catch (error) {
        console.error('❌ Failed to fetch schema:', error);
        throw error;
    }
}

/**
* Generate TypeScript types from OpenAPI schema
*/
async function generateTypes() {
    try {
        console.log('🚀 Starting OpenAPI type generation...\n');

        // Ensure output directories exist
        if (!fs.existsSync(TYPES_DIR)) {
            fs.mkdirSync(TYPES_DIR, { recursive: true });
            console.log(`📁 Created directory: ${TYPES_DIR}`);
        }

        if (!fs.existsSync(GENERATED_DIR)) {
            fs.mkdirSync(GENERATED_DIR, { recursive: true });
            console.log(`📁 Created directory: ${GENERATED_DIR}`);
        }

        // Fetch schema for saving (optional reference)
        const schema = await fetchSchema(SCHEMA_URL);

        // Save schema for reference
        fs.writeFileSync(SCHEMA_OUTPUT_PATH, JSON.stringify(schema, null, 2));
        console.log(`💾 Schema saved to: ${SCHEMA_OUTPUT_PATH}`);

        // Generate TypeScript types directly from URL
        console.log('\n🔨 Generating TypeScript types...');
        const ast = await openapiTS(SCHEMA_URL, {
            exportType: true,
            pathParamsAsTypes: false,
            alphabetize: true,
            enum: true,
            enumValues: true,
        });

        // Convert AST to string
        const output = astToString(ast);

        // Add header comment
        const header = `/**
* AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
* Generated from OpenAPI schema
* Last updated: ${new Date().toISOString()}
* Schema URL: ${SCHEMA_URL}
*/
 
/* eslint-disable */
// @ts-nocheck
 
`;

        const finalOutput = header + output;

        // Write to file
        fs.writeFileSync(TYPES_OUTPUT_PATH, finalOutput);
        console.log(`✅ Types generated successfully at: ${TYPES_OUTPUT_PATH}`);

        // Calculate file size
        const stats = fs.statSync(TYPES_OUTPUT_PATH);
        const fileSizeInKB = (stats.size / 1024).toFixed(2);
        console.log(`📦 File size: ${fileSizeInKB} KB\n`);

        console.log('🎉 Type generation complete!');
        console.log('\n💡 Usage example:');
        console.log(
            `   import type { paths, components } from '@/types/api.generated';`,
        );
        console.log(
            `   type CourseResponse = components['schemas']['CourseResponseDto'];`,
        );
    } catch (error) {
        console.error('\n❌ Error generating types:', error);

        if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
            console.error(
                '\n💡 Make sure the backend server is running on:',
                SCHEMA_URL,
            );
            console.error('   Start the backend with: cd backend && pnpm dev');
        }

        process.exit(1);
    }
}

// Run the script
generateTypes();
