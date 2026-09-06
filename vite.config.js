import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
     plugins: [vue()],
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
