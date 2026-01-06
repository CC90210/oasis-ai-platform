import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [react()],
    define: {
      'window.PAYPAL_CLIENT_ID': JSON.stringify(env.PAYPAL_CLIENT_ID),
      // GUARANTEED CONNECTIVITY: Hardcoded correct values provided by user
      '__SUPABASE_URL__': JSON.stringify('https://skgrbweyscysyetubemg.supabase.co'),
      '__SUPABASE_ANON_KEY__': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c3lldHViZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjY2NzQsImV4cCI6MjA4MzI0MjY3NH0.00kIbn4a4PwfIRzidwRWMigqHIcn_ssk_u1nN8_S2Pc'),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion', 'lucide-react'],
            'chart-vendor': ['recharts'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: true, // Enable sourcemaps for debugging
    },
    // esbuild: {
    //   drop: ['console', 'debugger'], // Disabled to allow debugging
    // },
    server: {
      port: 5173,
      strictPort: false,
      host: true,
    },
    preview: {
      port: 4173,
      strictPort: false,
      host: true,
    },
  }
})
