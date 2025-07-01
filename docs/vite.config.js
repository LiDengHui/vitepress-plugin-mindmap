import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@dhlx/vitepress-plugin-mindmap/MindMapView.vue": path.join(
                __dirname,
                "../dist/MindMapView.vue"
            ),
        },
    },
    server: {
        fs: {
            allow: ["../../"],
        },
    },
});
