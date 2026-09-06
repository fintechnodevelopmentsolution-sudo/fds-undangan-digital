import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
     plugins: [vue()],
     base: process.env.GITHUB_ACTIONS ? '/undangan-online/' : '/',
     server: {
          watch: {
               ignored: [
                    '**/logo-transparan.png',
                    '**/template-*/**',
                    '**/all-template/**',
               ],
          },
     },
});
