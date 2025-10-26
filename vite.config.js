import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  darkMode: 'class',
  
  
  theme: {
  extend: {
    fontFamily: {
      khmer: ['Battambang', 'sans-serif'],
    },
  },
    server: {
    allowedHosts: ['despotic-layne-endosarcous.ngrok-free.dev', '28a1e484e813.ngrok-free.app', 'localhost', '127.0.0.1'],
    host: true
  }
},

})
