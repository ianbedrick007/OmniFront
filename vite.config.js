import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                dashboard: resolve(__dirname, 'dashboard.html'),
                products: resolve(__dirname, 'products.html'),
                chats: resolve(__dirname, 'chats.html'),
                chat: resolve(__dirname, 'chat.html'),
            }
        }
    }
});
