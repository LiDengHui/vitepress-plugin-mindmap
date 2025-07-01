import {type  PluginOption} from "vite";


export function drawioPlugin(): PluginOption {



    return {
        name: "drawio-plugin",
        enforce: "post",
        async transform(src, id: string) {
            if (!id.includes("vitepress/dist/client/app/index.js")) {
                return;
            }
            src = "\nimport MindMapView from '@dhlx/vitepress-plugin-mindmap/MindMapView.vue';\n" + src;

            const lines = src.split("\n");


            const targetLineIndex = lines.findIndex((line) =>
                line.includes("app.component")
            );
            lines.splice(
                targetLineIndex,
                0,
                '  app.component("MindMapView", MindMapView);'
            );

            src = lines.join("\n");

            return {
                code: src,
                map: null, // provide source map if available
            };
        }
    }
}
