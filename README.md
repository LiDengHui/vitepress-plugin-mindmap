# vitepress-plugin-mindmap
Seamlessly integrate interactive mind maps into your VitePress documentation with simple Markdown syntax.


## Installation


```bash
npm install @dhlx/vitepress-plugin-mindmap

```

## Usage

### 1. Configure VitePress

Add the plugin to your VitePress config file (`docs/.vitepress/config.js` or `docs/.vitepress/config.ts`):

```js
import { defineConfig } from 'vitepress'
import  withMindMap from '@dhlx/vitepress-plugin-mindmap'

export default withMindMap(defineConfig({
  title: "VitePress Mindmap",
  description: "Mindmap integration example",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: []
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LiDengHui/vitepress-plugin-mindmap' }
    ]
  }
}))
```

### 2. Use in Markdown

#### Method 1: Image Syntax (External Mindmaps)

```markdown
# Image Syntax

![Sample Mindmap](./path/to/your.md){mindmap}
```

#### Method 2: Code Fence Syntax (Inline Definition)

````markdown
# Code Fence Syntax

```mindmap
## Core Features
- **Mindmap Integration**
- Drag & Zoom
- Theme Support
  - Dark Mode
  - Light Mode

## Installation
- `npm install vitepress-plugin-mindmap`
- `yarn add vitepress-plugin-mindmap`
- `pnpm add vitepress-plugin-mindmap`

## Use Cases
1. Technical Documentation
2. Project Planning
3. Knowledge Organization
4. Meeting Notes
```
````


## License

[MIT]
