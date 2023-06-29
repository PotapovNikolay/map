import { defineConfig } from 'vite'
import * as path from "path";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            store: path.resolve(__dirname, "./src/store"),
            utils: path.resolve(__dirname, "./src/utils"),
            hooks: path.resolve(__dirname, "./src/hooks"),
            components: path.resolve(__dirname, "./src/components"),
            pages: path.resolve(__dirname, "./src/pages"),
            images: path.resolve(__dirname, "./public/images"),
            types: path.resolve(__dirname, "./src/@types"),
        },
    },
})
