import {type  UserConfig} from "vitepress";
import * as path from "path";
import {drawioPlugin} from "./plugin.ts";
import {Transformer} from "markmap-lib";
import * as fs from "node:fs";

declare module "vitepress" {
    interface UserConfig {

    }
}

const transformer = new Transformer();

function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


const withMindMap = (config: UserConfig) => {

    if (!config.markdown) config.markdown = {};
    if (!config.vite) config.vite = {};
    if (!config.markdown.config) config.markdown.config = () => {
    };
    if (!config.vite.plugins) config.vite.plugins = [];
    config.vite.plugins.push(drawioPlugin());


    const _config = config.markdown.config;

    config.markdown.config = function (md) {
        _config(md);

        const _image = md.renderer.rules.image;
        if (!_image) return;

        md.renderer.rules.image = (tokens, idx, options, env, self) => {

            if (!_image) return _image;

            const token = tokens[idx];
            const result = _image(tokens, idx, options, env, self);
            const src = token.attrGet('src');
            const type = token.attrGet('mindmap');

            if (!src) return result;
            // 找到文件后缀
            const ext = path.extname(src);
            const dir = path.dirname(env.path);
            if (ext === '.md' && type !== undefined && type !== null) {
                // 替换为新的后缀
                const content = fs.readFileSync(path.join(dir, src), 'utf-8').toString();
                try {
                    const {root} = transformer.transform(content);
                    return `
                        <ClientOnly>
                            <MindMapView data="${escapeHtml(JSON.stringify(root))}" type="file"></MindMapView>
                        </ClientOnly>
                    `;
                } catch (e) {
                    return `<pre> ${e} </pre>`
                }
            }

            return result;

        }

        const _fence = md.renderer.rules.fence?.bind(md.renderer.rules.fence);
        if (!_fence) return;
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
            const token = tokens[idx];

            if (token.info === 'mindmap') {

                try {
                    const content = token.content.trim();
                    const {root} = transformer.transform(content);
                    return `<ClientOnly>
                            <MindMapView data="${escapeHtml(JSON.stringify(root))}" type="fence">
                            </MindMapView>
                        </ClientOnly>
                    `;
                } catch (e) {
                    return `<pre> ${e} </pre>`
                }


            }

            return _fence(tokens, idx, options, env, self)
        }
    }


    return config;
}

export default withMindMap;
