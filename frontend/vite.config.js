import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        publicDir: false, // Prevent conflicts
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    base: './', // Ensure relative paths in production
});

