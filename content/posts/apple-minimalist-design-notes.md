---
title: "极简个人站的色彩与双主题工程实践"
date: "2026-11-26"
category: "工程"
summary: "基于 Tailwind CSS v4 与语义化 CSS 变量，构建黑白灰为主、Apple 经典蓝点缀的明暗双主题系统与 Shiki 双主题代码高亮。"
tags: ["Tailwind CSS", "Design System", "Shiki"]
---

## 色彩层级约束

克制的视觉体系依赖于严格的层级收敛，而非堆叠高饱和度色块。本站采用三层中性色加单一强调色的结构：

1. **画布层（Canvas）**：浅色模式为纯白 `#FFFFFF`，深色模式为纯黑 `#000000`。
2. **表面层（Surface）**：浅色模式为 `#F5F5F7`，深色模式为 `#161617`，用于卡片与次级容器。
3. **强调色（Accent）**：仅在超链接与交互引导中使用 `#0066CC`（浅色）与 `#2997FF`（深色）。

## CSS 变量定义

通过 `html.dark` 类名切换变量，可保证首屏渲染与主题切换均无样式抖动：

```css
:root {
  --background: #ffffff;
  --surface: #f5f5f7;
  --foreground: #1d1d1f;
  --muted: #6e6e73;
  --accent: #0066cc;
}

.dark {
  --background: #000000;
  --surface: #161617;
  --foreground: #f5f5f7;
  --muted: #86868b;
  --accent: #2997ff;
}
```

## Shiki 双主题代码高亮

借助 `@shikijs/rehype`，代码块在构建期即可生成同时包含浅色与深色 token 变量的静态 HTML，运行时零 JS 开销：

```ts
import rehypeShiki from "@shikijs/rehype";

const shikiOptions = {
  themes: {
    light: "github-light",
    dark: "one-dark-pro",
  },
  defaultColor: "light",
};
```

### 动效克制原则

页面滚动入场统一使用 `cubic-bezier(0.16, 1, 0.3, 1)` 缓动曲线与 `14px` 以内的微位移，并通过 `useReducedMotion()` 自动尊重系统的减弱动态效果设置。
