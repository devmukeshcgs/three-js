import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import VitePluginBrowserSync from 'vite-plugin-browser-sync'

export default defineConfig({
  plugins: [glsl(), VitePluginBrowserSync()],
});
