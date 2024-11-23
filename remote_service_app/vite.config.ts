import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Web_Frontend",
  server: {
    host: '192.168.1.8',
    port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.1.8:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  plugins: [react()],
})
