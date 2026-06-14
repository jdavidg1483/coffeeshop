// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    // 👇 LE DAMOS PERMISO A ASTRO PARA OPTIMIZAR IMÁGENES DE TU WORDPRESS LOCAL
    domains: ['localhost/coffeeshp/wordpress'],
  },
});