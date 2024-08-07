---
title: "Markdown parsers"
date: 2023-09-08T07:00:09+02:00
draft: false
tags: [markdown, parser, javascript, golang, rust, c, zig, listicle]
---

## JS

- [micromark](https://github.com/micromark/micromark) used by
  - [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown) used by
    - [remark-parse](https://github.com/remarkjs/remark/tree/main/packages/remark-parse) used by
      - [prettier](https://prettier.io/blog/2017/11/07/1.8.0.html)
      - [mdx](https://github.com/mdx-js/mdx/tree/main/packages/mdx), which is used by
        - [Next.js](https://nextjs.org/)
        - [Gatsby](https://www.gatsbyjs.com/)
        - [Docusaurus](https://docusaurus.io/)
        - etc.
      - [mdc](https://www.npmjs.com/package/remark-mdc), which is used by
        - [Nuxt](https://nuxt.com/)
  - [Astro](https://astro.build/)
- [markdown-it](https://github.com/markdown-it/markdown-it) used by
  - [11ty](https://www.11ty.dev/docs/languages/markdown/)
  - [vuepress](https://v2.vuepress.vuejs.org/)
  - [vitepress](https://vitepress.dev/)
- [showdown](https://github.com/showdownjs/showdown) used by (based on what they say)
  - [GoogleCloudPlatform](https://github.com/GoogleCloudPlatform)
  - [Meteor](https://www.meteor.com/)
  - Stackexchange - forked as [PageDown](https://code.google.com/archive/p/pagedown/)
- [remarkable](https://github.com/jonschlinkert/remarkable)
  - used by [Docusaurus](https://docusaurus.io/)
- [marked](https://github.com/markedjs/marked) used by
  - [Hexo](https://hexo.io/index.html)
  - [docsify](https://github.com/docsifyjs/docsify)
- [markup-it](https://www.npmjs.com/package/markup-it) used by
  - [gitbook](https://www.gitbook.com/)
- [commonmark.js](https://github.com/commonmark/commonmark.js/)
  - is the JS **reference implementation of CommonMark**
- [lezer-parser/markdown](https://github.com/lezer-parser/markdown) an **incremental** Markdown (**CommonMark** with support for extension) used by
  - [CodeMirror](https://github.com/codemirror) used by
    - [Obsidian](https://obsidian.md/)

### WASM

- [markdown-wasm](https://github.com/rsms/markdown-wasm)
  - uses **md4c**
- [Wasm Markdown](https://markdown.fastlylabs.com/)
  - uses **pulldown-cmark**
- [parsedown](https://github.com/rodneylab/parsedown)
  - uses **pulldown-cmark**

### See also

- [Comparison Javascript Markdown Parsers](https://umemotoctrl.github.io/mdpjs/)
- [npmtrends](https://npmtrends.com/commonmark-vs-markdown-it-vs-marked-vs-markup-it-vs-micromark-vs-remark-parse-vs-remarkable-vs-showdown)
- [biome](https://biomejs.dev/internals/language-support/) promises to add markdown eventually

## Rust

- [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark) used by
  - [mdBook](https://github.com/rust-lang/mdBook)
  - [cobalt](https://cobalt-org.github.io/)
- [zola-markdown](https://github.com/getzola/zola/tree/master/components/markdown)
  - uses [pest.rs](https://pest.rs/) (PEG)
  - used by [zola](https://github.com/getzola/zola)
- [markdown-rs](https://github.com/wooorm/markdown-rs)
  - Sibling to **micromark**
- [comrak](https://github.com/kivikakk/comrak)
  - Rust port of **cmark-gfm**
- [markdown-it-rust](https://github.com/markdown-it-rust/markdown-it)
  - Rust port of **markdown-it** library.
- [Snekdown](https://github.com/Trivernis/snekdown)

## Golang

- [goldmark](https://github.com/yuin/goldmark) used by
  - [Hugo](https://gohugo.io/getting-started/configuration-markup/)
- [gomarkdown/markdown](https://github.com/gomarkdown/markdown)
- [golang-commonmark/markdown](https://gitlab.com/golang-commonmark/markdown)
- [blackfriday](https://github.com/russross/blackfriday)
- [mmark](https://github.com/mmarkdown/mmark)
- [md](https://pkg.go.dev/src.elv.sh/pkg/md)

## C

- [cmark-gfm](https://github.com/github/cmark-gfm)
  - used by Github
  - is an extended version of the **cmark**
- [cmark](https://github.com/commonmark/cmark)
  - is the C **reference implementation of CommonMark**
- [md4c](https://github.com/mity/md4c)
- [peg-markdown](https://github.com/jgm/peg-markdown)
  - uses [peg](https://piumarta.com/software/peg/) (PEG)
- [sundown](https://github.com/vmg/sundown)
- [hoedown](https://github.com/hoedown/hoedown)
  - is a revived fork of **sundown**

## Zig

- [koino](https://github.com/kivikakk/koino)
  - Zig port of **comrak**, which is Rust port of **cmark-gfm**
- [markzig](https://github.com/demizer/markzig) archived

## Tree-sitter

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) is a parser generator tool and an **incremental** parsing library. There are bindings for many languages (including Rust and JS)

- [MDeiml/tree-sitter-markdown](https://github.com/MDeiml/tree-sitter-markdown)
- [ikatyang/tree-sitter-markdown](https://github.com/ikatyang/tree-sitter-markdown)

## Ruby

- [jekyll-commonmark](https://github.com/jekyll/jekyll-commonmark)
  - used by [jekyll](https://jekyllrb.com/docs/configuration/markdown/)
  - uses **cmark-gfm**
- [redcarpet](https://github.com/vmg/redcarpet)
  - used by [slate](https://github.com/slatedocs/slate), [jekyll](https://jekyllrb.com/docs/configuration/markdown/)
  - uses **sundown**

## Python

- [python-markdown](https://python-markdown.github.io/) used by
  - [MkDocs](https://www.mkdocs.org/)
  - [Pelican](https://getpelican.com/)
- [marko](https://github.com/frostming/marko)
- [markdown-it-py](https://github.com/executablebooks/markdown-it-py)
  - Python port of **markdown-it**
- [markdown2](https://github.com/trentm/python-markdown2)
- [mistune](https://github.com/lepture/mistune)

## Clojure

- [clarktown](https://github.com/askonomm/clarktown)

## Elixir

- [md](https://github.com/am-kantox/md)

## Java

- [commonmark-java](https://github.com/commonmark/commonmark-java)
  - it started out as a port of **commonmark.js**, but has since evolved
- [pegdown](https://github.com/sirthias/pegdown)
  - uses parboiled (PEG)

## Other

- ["awesome-markdown" libraries](https://github.com/BubuAnabelas/awesome-markdown#libraries)
- [babelmark](https://babelmark.github.io/)

### Crticism

- [djot rationale](https://github.com/jgm/djot#rationale)
- [markdown mistakes](https://www.swyx.io/markdown-mistakes)

## About prsing

What is PEG? What is incremental parsing? [Read more about parsing here](https://parsing.stereobooster.com/).
