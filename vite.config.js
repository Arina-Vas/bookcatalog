import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,

        cssCodeSplit: false,
        assetsInlineLimit: 0,

        rollupOptions: {
            output: {
                // Keep JavaScript in a separate file
                entryFileNames: 'index.js',

                // Images and other static assets
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },

    }
});