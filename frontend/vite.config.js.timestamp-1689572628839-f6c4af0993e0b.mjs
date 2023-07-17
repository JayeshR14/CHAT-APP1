// vite.config.js
import { defineConfig } from "file:///F:/Placements/projects/chatSystem/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///F:/Placements/projects/chatSystem/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5500/",
        changeOrigin: true,
        secure: false
      }
    },
    host: "localhost",
    port: 5e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxQbGFjZW1lbnRzXFxcXHByb2plY3RzXFxcXGNoYXRTeXN0ZW1cXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFBsYWNlbWVudHNcXFxccHJvamVjdHNcXFxcY2hhdFN5c3RlbVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovUGxhY2VtZW50cy9wcm9qZWN0cy9jaGF0U3lzdGVtL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOntcbiAgICBwcm94eTp7XG4gICAgIFwiL2FwaVwiIDoge1xuICAgICAgdGFyZ2V0IDogXCJodHRwOi8vMTI3LjAuMC4xOjU1MDAvXCIsXG4gICAgICBjaGFuZ2VPcmlnaW46dHJ1ZSxcbiAgICAgIHNlY3VyZTpmYWxzZSxcbiAgICAgfSxcbiAgICB9LFxuICAgIGhvc3Q6XCJsb2NhbGhvc3RcIixcbiAgICBwb3J0OjUwMDAsXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBULFNBQVMsb0JBQW9CO0FBQ3ZWLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBTztBQUFBLElBQ0wsT0FBTTtBQUFBLE1BQ0wsUUFBUztBQUFBLFFBQ1IsUUFBUztBQUFBLFFBQ1QsY0FBYTtBQUFBLFFBQ2IsUUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNEO0FBQUEsSUFDQSxNQUFLO0FBQUEsSUFDTCxNQUFLO0FBQUEsRUFDUDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
