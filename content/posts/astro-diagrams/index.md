---
title: "Astro diagrams"
date: 2024-01-03T10:00:00
tags: ["astro", "diagram", "markdown", "mermaid"]
---

**Task**: add support for diagrams to Astro.

**Ideally**:

- it would be rendered as SVG on the server side
  - so no JS required on the client-side
  - people can use <kbd>Cmd</kbd> + <kbd>F</kbd> to search text
- style it with CSS-variables (or CSS-classes)
  - so it would be possible to implement dark mode without JS
- optionally add small JS to implement pan/zoom/drag

Most popular (at the moment) option for diagrams is [Mermaid](https://mermaid.js.org/). There are [other options](/content/posts/text-to-diagram/index.md) though.

## Options

There are several ways to do it:

- (1) Traditional way, which is used by Hugo and other static website generators. Embed mermaid and **do rendering on the client** side.
  - Because [Mermaid doesn't support server side rendering](https://github.com/mermaid-js/mermaid/issues/3650)
  - [astro#4433](https://github.com/withastro/astro/issues/4433)
- (2) Prerender with the help of **headless browser** (puppeteer, playwright or even [Tauri](/content/posts/tauri-instead-of-puppeteer-or-playwright/index.md))
  - remark/rehype
    - [starlight#1259](https://github.com/withastro/starlight/discussions/1259)
    - [rehype-mermaid](https://github.com/remcohaszing/rehype-mermaid)
    - [remark-mermaidjs](https://github.com/remcohaszing/remark-mermaidjs)
  - [astro-diagram](https://www.npmjs.com/package/astro-diagram)
- (3) Use Mermaid syntax, but render it with [Pintora](https://github.com/hikerpig/pintora)
  - [astro-pintora](https://www.npmjs.com/package/astro-pintora)
  - Pintora supports a lot of Mermaid diagrams (which are interesting to me), **except Flowchart**
    - There is [a way to add new diagrams](https://pintorajs.vercel.app/docs/advanced/write-a-custom-diagram/)

## Dark mode (theme)

- (1) Congo theme has a good example on how to support dark mode with CSS variables. See [congo/mermaid.js](https://github.com/jpanther/congo/blob/dev/assets/js/mermaid.js)
- (2) and (3)
  - prerender diagram in both variants (dark and light) and use `picture` + `<source media="(prefers-color-scheme: dark)">`
  - one can put `<style type="text/css"> @media (prefers-color-scheme: dark) { ... }` inside SVG
  - use CSS variables instead of actual colors in theme, but this is not possible neither in Pintora, neither in Mermaid, because they both manipulate colors (with `tinycolor`)

## Pan/Zoom/Drag

- (1)
  - [Not supported out of the box, needs additional work](https://github.com/mermaid-js/mermaid/issues/1860)
- (2) and (3)
  - [svg-pan-zoom-gesture](https://github.com/stereobooster/svg-pan-zoom-gesture)
