import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({}),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/MindMapView.vue',
                    dest: './',
                },
            ],
        }),
    ],
    build: {
        ssr: true,
        lib: {
            entry: './src/index.ts',
            name: 'index',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },

        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vitepress', 'vue', 'fs', 'path', 'markmap-lib'],
            plugins: [],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    path: 'path',
                    fs: 'fs',
                    vue: 'vue',
                },
            },
        },
    },
});
