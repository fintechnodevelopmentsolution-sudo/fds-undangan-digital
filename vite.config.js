import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
     plugins: [vue()],
     base: process.env.GITHUB_ACTIONS
          ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'undangan-online'}/`
          : '/',
     server: {
          watch: {
               // Removed ignored templates so Vite hot reloads changes
          },
     },
});
