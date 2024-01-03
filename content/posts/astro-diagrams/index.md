---
title: "Astro diagrams"
date: 2024-01-03T10:00:00
tags: ["astro", "diagram", "markdown", "mermaid"]
---

**Task**: add support for diagrams to Astro.

Most popular (at the moment) option for diagrams is [Mermaid](https://mermaid.js.org/). There are [other options](/content/posts/text-to-diagram/index.md) though.

## Options

There are several ways to do it:

- Traditional way, which is used by Hugo and other static website generators. Embed mermaid and **do rendering on the client** side.
  - Because [Mermaid doesn't support server side rendering](https://github.com/mermaid-js/mermaid/issues/3650)
  - [astro#4433](https://github.com/withastro/astro/issues/4433)
- Prerender with the help of headless browser (puppeteer, playwright or even [Tauri](content/posts/tauri-instead-of-puppeteer-or-playwright/index.md))
  - [mermaid-cli](https://github.com/mermaid-js/mermaid-cli)
  - [astro-diagram](https://www.npmjs.com/package/astro-diagram)
- Use Mermaid syntax, but render it with [Pintora](https://github.com/hikerpig/pintora)
  - [astro-pintora](https://www.npmjs.com/package/astro-pintora)
  - Pintora supports a lot of Mermaid diagrams (which are interesting to me), except Flowchart
    - There is [a way to add new diagrams](https://pintorajs.vercel.app/docs/advanced/write-a-custom-diagram/)

## Astro + Pintora

Things that need to be implemented/checked:

- Astro component to generate diagram
- remark plugin to generate diagrams in place of code-fences
- [cache](/content/posts/javascript-key-value-store/index.md) - rendering can be expensive operation (actually do a benchmark), so it would make sense to use cache
  - Do we need hash function for keys?
  - It is probably good idea to use LRU
  - Do we need to persist cache to the disk? If yes, it may need TLRU
  - Maybe there is a way to use Astro's cache
- compatibility with Mermaid
  - show same diagrams side-by-side - Mermaid vs Pintora
- theming
  - check if it is possible to style Pintora diagrams (inline SVGs) with css-variables
- (optional) add UI for pan/zoom/drag to SVGs, for example:
  - https://github.com/anvaka/panzoom
  - https://timmywil.com/panzoom/
  - https://onestepcode.com/zoom-pan-effect-svg/
  - https://itnext.io/javascript-zoom-like-in-maps-for-svg-html-89c0df016d8d
  - https://github.com/bumbu/svg-pan-zoom
  - https://github.com/MicroWebStacks/astro-big-doc
  - https://github.com/fabricjs/fabric.js
  - https://github.com/SpencerWie/Panzoom
  - https://github.com/timmywil/panzoom
