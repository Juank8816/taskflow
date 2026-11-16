import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // <- Agrega esta línea para que las rutas relativas carguen los scripts correctamente
})