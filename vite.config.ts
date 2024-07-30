import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // это разрешит доступ ко всем интерфейсам, включая ZeroTier
    port: 3000, // выберите порт, который хотите использовать (по умолчанию 3000)
  },
})
