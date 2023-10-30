---
title: "Digital garden as static website"
date: 2023-10-24T15:22:28+02:00
draft: false
tags: [digital-garden, second-brain, markdown]
---

[Digital garden](https://github.com/MaggieAppleton/digital-gardeners) aka [Second brain](https://www.ssp.sh/brain/), [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), personal wiki, personal knowledge management.

There are different aspects of a digital garden. It can be seen as a way to take notes just for yourself, but for me, it's more interesting as a way to organize knowledge and publish it as a (static) website.

There are different editors (note-taking applications): [Obsidian](https://obsidian.md/), [Foam](https://foambubble.github.io/foam/), [Roam Research](https://roamresearch.com/) to name few. But again, I am more interested in the publishing part - assuming you already created content with an editor of your choice.

I have 3 digital gardens (so far):

- [About parsing](https://parsing.stereobooster.com/) - Astro + Starlight
- [About graphs](https://graph.stereobooster.com/) - Hugo + Quartz v3
- [About fuzzy text search](https://fuzzy.stereobooster.com/) - Hugo + Quartz v3

I feel like the results can be better. So **what do I expect from Ideal Digital Garden published as a static website?**

## Status quo

Typical features for digital garden

- **stacked navigation** as seen in [Andy Matuschak notes](https://notes.andymatuschak.org/About_these_notes)
- **tree-view** (sidebar navigation) and **table of contents** as seen in many documentation sites, like [starlight](https://starlight.astro.build/getting-started/), [docusaurus](https://docusaurus.io/docs)
- list of **latest articles** and **tags** as seen in any blog
- **markdown**, **front-matter**, **text-to-diagram**, **math with Katex** as seen in many static site generators (SSG)
- store source code on GitHub and **edit link**
- **breadcrumbs** as seen in many websites
- **full-text search** for static website, for example, with [orama](https://github.com/oramasearch/orama), [pagefind](https://github.com/cloudcannon/pagefind), [fuse](https://github.com/krisk/fuse)

Common feature for [Obsidian publish](https://obsidian.md/publish), [Mindstone](https://github.com/TuanManhCao/digital-garden), [Quartz](https://quartz.jzhao.xyz/notes/obsidian/)

- **Backlinks**, highlight **broken links**
- **Page preview** (popover preview)
- **Graph view**. To be fair I think it is only useful for aesthetics. Most of the time layout is done with the help of a force-directed algorithm, which produces not very readable graphs
- **Wiki-links**, [portable markdown links](/content/posts/portable-markdown-links/index.md)

Other examples:

- [Obsibian Template for Gatsby Theme Primer Wiki](https://github.com/theowenyoung/obsidian-template-gatsby-theme-primer-wiki/)
- [obsidian-zola](https://github.com/ppeetteerrs/obsidian-zola)
- [Template for MkDocs](https://github.com/jobindjohn/obsidian-publish-mkdocs#alternatives)
- [jekyll-garden](https://jekyll-garden.github.io/post/features)
- [Obsidian Digital Garden Plugin](https://dg-docs.ole.dev/features/)

## Inspiration

It seems that digital gardens mainly focus on static content. But on the web, it is possible to use [dynamic content](https://roadtoreality.substack.com/p/the-dynamic-notebook), like code playgrounds, interactive demos, etc. Here are some examples for inspiration:

- [Road to Reality](https://reality.mentat.org/essays/reality/introduction)
- [Observable](https://observablehq.com/)
- [clerk.garden](https://github.clerk.garden/nextjournal/clerk-demo/)

## What I want

### Static website

First of all, the system should be based on some [open-source static website generator](https://jamstack.org/generators/). This would allow the use of all existing capabilities of those solutions, for example:

- Hugo provides [exceptional image processing](/content/posts/hugo-ideal-image/index.md)
- Astro has [a lot of plugins](https://astro.build/integrations/)

It would allow you to host a website anywhere, for example, on Netlify or GitHub Pages.

It would allow you to customize your website easily, using many existing themes as reference, or using Tailwind.

The only problem is that those site generators do not natively support wiki links, so we would need [some tool to transform markdown](/content/posts/markdown-tools/index.md).

### Faceted search

Examples of faceted search: [datasette](https://docs.datasette.io/en/latest/facets.html), [itemsjs](https://github.com/itemsapi/itemsjs). The simplest facets can be "tags" and "update at".

But this gets more interesting with custom metadata (in front-matter). One can create a custom type of page ("taxonomy") and add custom metadata for all those pages:

- [Hugo: Add custom metadata to a taxonomy or term](https://gohugo.io/content-management/taxonomies/#add-custom-metadata-to-a-taxonomy-or-term)
- [Astro: Content Collections](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema)
- [contentlayer: Mapping Documents to Document Types](https://contentlayer.dev/docs/sources/files/mapping-document-types-bf100a10)
- [NuxtContent: Front-matter](https://content.nuxt.com/usage/markdown#front-matter)

For example, you can have a custom page type

- "cooking recipe" and custom metadata can be: cooking type, vegan/vegetarian
- "algorithm" and custom metadata can be ADT (list, matrix, graph...), time complexity (`O(n)`)

Then one can use custom metadata fields as facets.

[Obsidian Dataview](https://github.com/blacksmithgu/obsidian-dataview) is another side of the same medal. But instead of giving users the ability to explore data the way they want, it gives authors the ability to present content the way they want.

### Other

- sortable tables, as seen in Wikipedia. For example, [sortable](https://github.com/tofsjonas/sortable)
- pan/zoom for svg images. For example, [panzoom](https://github.com/timmywil/panzoom)
- glossary of [alphabetical index](<https://en.wikipedia.org/wiki/Index_(publishing)>), as seen in books
- use the favicon of the website for external links
- icons and text for tags as seen in StackOverflow
- "mdx" components, for example, tabs, as seen in [Starlight](https://starlight.astro.build/guides/components/#built-in-components)
- [text to diagram](/content/posts/text-to-diagram/index.md)
  - graphs (tree, DAG, etc.)
  - Euler diagram
  - DAG over timeline
  - Hasse diagram
  - hand drawn look, xkcd-style (napkin math, ballpark estimate)
