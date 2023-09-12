---
title: "Text to diagram"
date: 2023-09-12T16:12:10+02:00
draft: false
tags: ["diagram", "markdown", "mermaid", "graphviz"]
---

aka diagrams as code

[I dreamt about it for a long time](/posts/what-i-miss-in-markdown/#diagrams). Idea is to allow to express diagrams with a text, this way you can draw diagram while you are writing you markdown file. Without need to switch to another tool. And this diagram becomes part of the document and can be stored in git.

Now when [Hugo supports](https://github.com/gohugoio/hugo/releases/tag/v0.93.0) render hooks for `code` blocks and in [MDX](https://mdxjs.com/) you can do this too (to use with Astro, etc.) it's time to revisit the subject.

## Categories

Before we move on let's introduce some kind of categorisation of tools.

### Types

- **Declarative** - when you have specific language for the job. You express what you want to get and it's up to the tool to figure out how to draw it
  - Examples: [Mermaid](https://mermaid.js.org/), [Graphviz](https://graphviz.org/), [d2lang](https://d2lang.com/)
- **Imperative** - more involved approach, you need to specify how to draw the diagram
  - Examples: ?
  - Note: python + Matplotlib, for example. also in this category, but if we go that far we will reinvent [Jupyter](https://jupyter.org/). So let's leave it out
- **ASCII-art** - you de-facto drawing, but with text. Tool just responsible for making it look nicer than terminal output
  - Examples: [svgbob](https://ivanceras.github.io/svgbob-editor/), [typograms](https://google.github.io/typograms/), [markdeep](https://casual-effects.com/markdeep/), [goat](https://github.com/bep/goat)

### Features

- **output format**: svg, png (or any other raster image format), ASCII-art, html + css + js
- **integration**: library, cli, web browser
- **supported diagrams**: network/graph, flowchart, UML and many more
- **theming**: if you have to hardcode colours in the diagram or you can configure it later, for example to support dark theme
- **other**: code highlighting plugin for editor, auto-formatter/pretty-printer, support for icons/images, support for embedding html/markdown/LaTeX, etc

## Tools

| Names                                                       | Type        | Integration  | Formats                | Supported diagrams                                     |
| ----------------------------------------------------------- | ----------- | ------------ | ---------------------- | ------------------------------------------------------ |
| [mermaid](https://mermaid.js.org/)                          | Declarative | browser\*    | SVG                    | Flowchart, UML, ER, Gant...                            |
| [graphviz](https://graphviz.org/)                           | Declarative | CLI, library | SVG, raster            | Graphs (flowchart, network, etc)                       |
| [d2lang](https://d2lang.com/)                               | Declarative | CLI (go)     | SVG, raster...         | Flowchart, UML, ER...                                  |
| [pikchr](https://pikchr.org/home/doc/trunk/doc/download.md) | ?           | CLI, library | SVG                    | [Kind of anything](https://pikchr.org/home/uv/pic.pdf) |
| [Diagon](https://arthursonzogni.com/Diagon/)                | Declarative | CLI, library | ASCII-art              | Flowchart, Sequence...                                 |
| [PlantUML](https://plantuml.com/)                           | Declarative | CLI          | SVG, raster, ASCII-art | UML...                                                 |
| [gnuplot](http://www.gnuplot.info/)                         | ?           | CLI          | SVG, raster, ASCII-art | [plots](https://gnuplot.sourceforge.net/demo_5.5/)     |
| [Tikz](https://tikz.net/)                                   | ?           | LaTeX\*      | PDF\*                  | anything                                               |

This is birdeye overview. There are nuances. I didn't include some libraries that:

- has very narrow use-case (only one type of digram)
- are less popular or not supported (abandonware)

### Mermaid

- Most popular, because it [was adopted by github](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/)
- Works [only in the browser](https://github.com/mermaid-js/mermaid/issues/3650). There is a [cli](https://github.com/mermaid-js/mermaid-cli), but it just a hack with headless browser (puppeteer)
- **Theme-able**
- [syntax highlightning](https://github.com/bpruitt-goddard/vscode-mermaid-syntax-highlight)

### Graphviz

- Mature and wide-spread. I think, it was number one for graphs (flowchart, network, DAG) before github integrated mermaid
- Originally CLI tool, but there are as well libraries, for example [WASM-based](https://www.npmjs.com/package/@hpcc-js/wasm), which allows to use Graphwiz on the server and in the browser
- [syntax highlightning](https://marketplace.visualstudio.com/items?itemName=joaompinto.vscode-graphviz)

### d2lang

- [Wants to take over the world](https://text-to-diagram.com/)
- Originally CLI tool, but there is [an attempt to convert to WASM library](https://github.com/terrastruct/d2/issues/136)
- It worth to mention that it packs headless browser (playwright)
- **Theme-able**
- [syntax highlightning](https://marketplace.visualstudio.com/items?itemName=terrastruct.d2)

### Pikchr

- "[PIC](https://en.wikipedia.org/wiki/Pic_language)-like markup language for diagrams in technical documentation"
- To me it feels more on declarative side, but you can do some imperative things as well
- There is [WASM library](https://github.com/fabiospampinato/pikchr-wasm) and [go port](https://github.com/gopikchr/gopikchr)
- [syntax highlightning](https://github.com/epmoyer/pikchr_monarch)

### Diagon

- "Diagon is an interactive interpreter. It transforms markdown-style expression into an ascii-art representation."
- It is the only one option on the list which outputs (only) ASCII-art. But you can feed it to another tool which will convert it to SVG
- There is WASM library, but it's not distributed as npm package

### Tikz

- The most famous option between people who use LaTeX
- I can't tell if this more declarative or imperative approach (kind of both)
- There is a project which [compiles Tikz to WASM](https://github.com/kisonecat/web2js) ([demo](https://tikzjax.com/)), but it's not distributed as npm package

### gnuplot

This is the only one solution on the list which focuses solely on plots. There are a lot of plot libraries and I don't want to list them all here. The difference from other solutions:

- It is standalone, while other solutions are DSLs/libraries inside bigger language, for example `matplotlib` "requires" python
- it is CLI, where is many other solutions are GUI

One way or another I felt like I need to include at least one of those on the list. Originally written in C, so there is a [chance of porting it to WASM](https://github.com/chhu/gnuplot-JS/issues/5) (see also [MobileGnuplotViewerQuickWASM](https://mneuroth.github.io/MobileGnuplotViewerQuickWASM/))

I can't tell if this more declarative or imperative approach (kind of both)

Syntax highlightning:

- [fizzybreezy.gnuplot](https://marketplace.visualstudio.com/items?itemName=fizzybreezy.gnuplot)
- [mammothb.gnuplot](https://marketplace.visualstudio.com/items?itemName=mammothb.gnuplot)
- [MarioSchwalbe.gnuplot](https://marketplace.visualstudio.com/items?itemName=MarioSchwalbe.gnuplot)

### ASCII-art

- [svgbob](https://ivanceras.github.io/svgbob-editor/)
- [typograms](https://google.github.io/typograms/)
- [markdeep](https://casual-effects.com/markdeep/)
- [goat](https://github.com/bep/goat)
- [diita](https://ditaa.sourceforge.net/)
- [asciitosvg](https://github.com/asciitosvg/asciitosvg)
- [blockdiag](http://blockdiag.com/en/)
- [shaape](https://github.com/christiangoltz/shaape)

### Special purpose

- [wavedrom](https://github.com/wavedrom/wavedrom)
- [DrawGrammar](https://jacquev6.github.io/DrawGrammar/)
- [state-machine-cat](https://github.com/sverweij/state-machine-cat)
- [structurizr](https://structurizr.com/)
- [symbolator](https://github.com/kevinpt/symbolator)
- [syntrax](https://kevinpt.github.io/syntrax/)
- [venn.js](https://upset.js.org/venn.js/)
- [bytefield-svg](https://github.com/Deep-Symmetry/bytefield-svg)
- [lilypond](https://lilypond.org/)

### Other

Other tools (I'm pretty sure there are much more projects which I'm not aware of):

- [penrose](https://penrose.cs.cmu.edu/docs/ref/style/usage). This one is **interesting** - I need to read more about it
- [vega-lite](https://vega.github.io/vega-lite/)
- [mscgen](https://www.mcternan.me.uk/mscgen/)
  - [mscgen_js](https://mscgen.js.org/)
- [flowchart.js](https://flowchart.js.org/)
- [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/)
- [kroki](https://kroki.io/#support)
- [dbml-renderer](https://github.com/softwaretechnik-berlin/dbml-renderer)
- [dpic](https://gitlab.com/aplevich/dpic)
- [erd](https://github.com/BurntSushi/erd)
- [actdiag](http://blockdiag.com/en/actdiag/index.html)
- [nomnoml](https://nomnoml.com/)
- [UMLet](https://www.umlet.com/)

See also:

- https://xosh.org/text-to-diagram/
- https://docs.asciidoctor.org/diagram-extension/latest/

## Instead of conclusion

I'm looking for solution:

- to embed diagrams in markdown file (inside fenced code block)
- ideally it should be possible to generate on the server (during conversion of markdown to HTML)
- ideally it should generate SVG, If we inline SVG (instead of using `<img>`) it can support
  - dark mode via classes or css variables
  - it can be animated
  - it can contain html links (`<a>`)
  - you can use <kbd>Cmd</kbd> + <kbd>F</kbd> to search text in it
  - we can add zoom/pan to it as in [github](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams#creating-mermaid-diagrams)
- it should be lightweight (so no headless browsers)
- In some cases it make sense to generate visualisation on the client side (in the browser), for example:
  - fractals with infinite zoom
  - interactive visualisations, like in [g9](https://github.com/bijection/g9) or [Road to Reality Essays](https://reality.mentat.org/essays/reality/introduction). In this case they should use high performance solutions (canvas or WebGL)

Diagrams that I'm interested in:

- graphs (aka network, flowchart, DAG, etc.)
  - Hasse diagrams
  - subway-scheme like diagrams. For example see: [gitgraph](https://mermaid.js.org/syntax/gitgraph.html), [metrosets](https://metrosets.ac.tuwien.ac.at/)
- Euler diagrams (which are often confused with Venn)
- [xkcd-style](https://jakevdp.github.io/blog/2012/10/07/xkcd-style-plots-in-matplotlib/) plots
- sankey diagrams

One more twist to this story. Because those diagrams can be represented as text you can use **GhatGPT** to generate diagrams.
