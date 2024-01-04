---
title: "Astro diagrams"
date: 2024-01-03T10:00:00
tags: ["astro", "diagram", "markdown", "mermaid"]
---

**Task**: add support for diagrams to Astro.

Most popular (at the moment) option for diagrams is [Mermaid](https://mermaid.js.org/). There are [other options](/content/posts/text-to-diagram/index.md) though.

## Options

There are several ways to do it:

- (1) Traditional way, which is used by Hugo and other static website generators. Embed mermaid and **do rendering on the client** side.
  - Because [Mermaid doesn't support server side rendering](https://github.com/mermaid-js/mermaid/issues/3650)
  - [astro#4433](https://github.com/withastro/astro/issues/4433)
- (2) Prerender with the help of **headless browser** (puppeteer, playwright or even [Tauri](content/posts/tauri-instead-of-puppeteer-or-playwright/index.md))
  - [mermaid-cli](https://github.com/mermaid-js/mermaid-cli)
  - [astro-diagram](https://www.npmjs.com/package/astro-diagram)
  - remark/rehype
    - [rehype-mermaid](https://github.com/remcohaszing/rehype-mermaid)
    - [remark-mermaidjs](https://github.com/remcohaszing/remark-mermaidjs)
    - [remark-mermaid](https://github.com/temando/remark-mermaid)
- (3) Use Mermaid syntax, but render it with [Pintora](https://github.com/hikerpig/pintora)
  - [astro-pintora](https://www.npmjs.com/package/astro-pintora)
  - Pintora supports a lot of Mermaid diagrams (which are interesting to me), **except Flowchart**
    - There is [a way to add new diagrams](https://pintorajs.vercel.app/docs/advanced/write-a-custom-diagram/)

## Astro + Pintora

Things that need to be implemented/checked:

- [x] Astro component to generate diagram
- [ ] remark plugin to generate diagrams in place of code-fences
- [ ] dark mode without JS
  - [it is not possible to use CSS-variables](https://github.com/hikerpig/pintora/issues/236)
  - other option would be to generate both images for dark and light mode, but be aware of [pintora#215](https://github.com/hikerpig/pintora/issues/215)
- [ ] [accessibility](https://github.com/hikerpig/pintora/issues/239)
- [cache](/content/posts/javascript-key-value-store/index.md) - rendering can be expensive operation (actually do a benchmark), so it would make sense to use cache
  - Do we need hash function for keys?
  - It is probably good idea to use LRU
  - Do we need to persist cache to the disk? If yes, it may need TLRU
  - Maybe there is a way to use Astro's cache
- compatibility with Mermaid
  - show same diagrams side-by-side - Mermaid vs Pintora

## Dark mode (theme)

- (1) Congo theme has a good example on how to support dark mode with CSS variables. See [congo/mermaid.js](https://github.com/jpanther/congo/blob/dev/assets/js/mermaid.js)
- (2) and (3)
  - prerender diagram in both variants (dark and light) and use `picture` + `<source media="(prefers-color-scheme: dark)">`
  - one can put `<style type="text/css"> @media (prefers-color-scheme: dark) { ... }` inside SVG
  - use CSS variables instead of actual colors in theme, but this is not possible neither in Pintora, neither in Mermaid, because they both manipulate colors (with `tinycolor`)

## Pan/Zoom/Drag

- (1) [Not supported](https://github.com/mermaid-js/mermaid/issues/1860)
- (2) and (3)
  - [anvaka/panzoom](https://github.com/anvaka/panzoom)
  - [timmywil/panzoom](https://timmywil.com/panzoom/)
  - [zoom-pan-effect-svg](https://onestepcode.com/zoom-pan-effect-svg/)
  - [JavaScript: Zoom like in maps for SVG/HTML](https://itnext.io/javascript-zoom-like-in-maps-for-svg-html-89c0df016d8d)
  - [svg-pan-zoom](https://github.com/bumbu/svg-pan-zoom)
  - [astro-big-doc](https://github.com/MicroWebStacks/astro-big-doc)
  - [fabric.js](https://github.com/fabricjs/fabric.js)
  - [SpencerWie/Panzoom](https://github.com/SpencerWie/Panzoom)
