import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://m1.apifoxmock.com/m1/5503761-5179910-default',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
