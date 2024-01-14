---
title: "Markdown tools"
date: 2023-09-13T16:35:23+02:00
draft: false
tags: ["markdown", "idea"]
---

So you have folder with markdown files. It can be static website, it can be Obsidian vault, second brain, digital garden, zettelkasten, notes...

And you want to do something with it. There are a lot tools for that:

- "second brain" editors: Obsidian, Foam, Roam Research, etc.
- static website generators: Hugo, Astro, etc.

And everything in between:

- Language servers: [VSCode Markdown language server](https://github.com/microsoft/vscode/tree/main/extensions/markdown-language-features/server), Marksman
- Graph vizualization: [markdown-links](https://github.com/tchayen/markdown-links), [markmap.js](https://markmap.js.org/docs/packages--markmap-cli), [dundalek/markmap](https://github.com/dundalek/markmap)
- Transformers:
  - from Obsidian to Hugo: [obsidian-export](https://nick.groenen.me/projects/obsidian-export/) [obsidian-to-hugo](https://github.com/devidw/obsidian-to-hugo), [obsidian-meets-hugo](https://github.com/ukautz/obsidian-meets-hugo), [obyde](https://github.com/notkmhn/obyde)
  - to [convert code fences to diagrams](/content/posts/text-to-diagram/index.md): [pikchr-cmd](https://github.com/zenomt/pikchr-cmd), [rehype-mermaidjs](https://github.com/remcohaszing/rehype-mermaidjs), [remark-mermaidjs](https://github.com/remcohaszing/remark-mermaidjs)
  - code formaters: [prettier](https://prettier.io/), [cbfmt](https://github.com/lukas-reineke/cbfmt)
- Broken link checkers: [remark-lint-no-dead-urls](https://github.com/remarkjs/remark-lint-no-dead-urls), [mdv](https://github.com/Mermade/mdv), [markdown-link-check](https://github.com/tcort/markdown-link-check), [remark-validate-links](https://github.com/remarkjs/remark-validate-links)
- "Treat as database" tools: [docsql](https://github.com/peterbe/docsql), [obsidian-dataview](https://blacksmithgu.github.io/obsidian-dataview/)

## One more tool

We already have plenty. What shall we do? Obviously, create another one.

What I want minimum:

- Given there is a folder with markdown files
- it (tool) reads files and parses markdown
- it resolves wikilinks and relative links
- (optional) it stores data in embedded database, for example SQLite
- it builds graph (as a data structure, not a visualisation)
  - which would allow to check for (local) broken links (also images, header-ids)
  - build visualisation
  - export graph - to work with graph in other tools, like NetworkX etc.
- It dumps files (with resolved links) to another folder
- It dumps grpah structure to JSON file (or any other format)

What I want maximum:

- watch mode
- UI (TUI or GUI) to query data with SQL/Cypher/Datalog...
- plugins, for example:
  - to convert code fences to diagrams (inline or vfile)
  - to generate [social images](https://dev.to/ben/how-devto-dynamically-generates-social-images--2c2n)
- LSP
- implement as library so other software could reuse it, for example, Astro, VScode, Obsidian, etc.
- linter and pretty-printer

## Preliminary ideas about implementation

- If we need embeded database, there are:
  - SQLite + [Graph-in-RDBMS](https://graph.stereobooster.com/notes/Graph-in-RDBMS) (there is WASM version)
  - [cozo](https://github.com/cozodb/cozo) (there is WASM version)
  - [kuzu](https://kuzudb.com/)
- [fdir](https://www.npmjs.com/package/fdir) - fast directory scanning
- [chokidar](https://github.com/paulmillr/chokidar) - file watcher
- maybe we will need something like [vfile](https://github.com/vfile/vfile) or [browserfs](https://jvilk.com/browserfs/1.4.1/)
- [there are a lot of markdown parsers](/content/posts/markdown-parsers/index.md). `micromark` and co has the biggest number of plugins. Plus there is `markdown-rs`, which would be possible to compile to WASM

## Related

- [markdown-to-sqlite](https://github.com/simonw/markdown-to-sqlite)
- [Using sqlite3 as a notekeeping document graph with automatic reference indexing](https://epilys.github.io/bibliothecula/notekeeping.html)
- **[markdowndb](https://github.com/datopian/markdowndb)**
