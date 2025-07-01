import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "src/MindMapView.vue",
                    dest: "./",
                },

            ],
        }),
        dts(),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'index',
            fileName: 'index',
        },

        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                "vitepress",
                "path",
                "fs",
                "vue",

            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    "vue": "vue"
                },
            },
        }
    },


});
