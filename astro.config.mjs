// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    // 1. CORREGIDO: Usamos solo el dominio limpio aquí
    domains: ['localhost', '127.0.0.1'],

    // 2. CORREGIDO: Patrón de ruta seguro para tu WordPress local
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/coffeeshop/wordpress/wp-content/uploads/**', 
      }
    ],

    // Mantenemos el servicio noop para evitar problemas con Sharp en Windows
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  }
});