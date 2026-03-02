import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
    base: './',
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
            helpers: {
                eq: (v1, v2) => v1 === v2
            }
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
                orders: resolve(__dirname, 'orders.html'),
                login: resolve(__dirname, 'login.html'),
            }
        }
    }
});
