---
title: "Improve your IDE"
date: 2021-01-23T21:15:22+01:00
draft: false
tags: [editor, code, dx]
---

## Improve syntax highlighting

Traditionally IDE (or text editors) use regular expressions to do syntax highlighting. This approach is limited in what is highlight correctly. They do it because:

- it will work even for files with syntax errors
- it is faster than do real parsing on each keystroke (programming languages typically use context-free grammar)

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) uses incremental parsing, which allows it to do real parsing on each keystroke fast - it reparses only changed region of code and reuses parse tree from the previous parse for the rest.

Support for IDEs:

- Atom: built-in
- VSCode: [plugin](https://marketplace.visualstudio.com/items?itemName=georgewfraser.vscode-tree-sitter)
- NeoVim: [plugin](https://github.com/nvim-treesitter/nvim-treesitter)
- Emacs: [plugin](https://github.com/ubolonton/emacs-tree-sitter)

Note: you don't need to use tree-sitter if you use a language server

## Improve code completion, code navigation and more

[Language server](https://langserver.org/) can parse and analyze your code (do type checking if it is available for the PL). This allows LS to do more intelligent code completion, show documentation or type information on hover, jump to definition (more intelligently than ctags), find references (more intelligently than text search).

Support for IDEs:

- Atom: [plugin](https://github.com/atom/atom-languageclient)
- VSCode: built-in
- Vim: [plugin](https://github.com/iamcco/vim-language-server)
- Emacs: [plugin](https://github.com/emacs-lsp/lsp-mode/)

Support for languages: see table [here](https://langserver.org/).

## Improve code formatting

Pretty-printer (sometimes called code beautifier or code formatter) will automatically apply code formatting rules to the code, for example, it will put correct indentation, use correct quotes, add or remove the semicolon at the end of the line.

Examples pretty-printers: [prettier](https://github.com/prettier) (JavaScript, Flow, TypeScript, Vue, JSON, CSS, Less, SCSS, GraphQL, and Markdown), [black](https://github.com/psf/black). See big list of code formatters [here](https://github.com/rishirdua/awesome-code-formatters).

Note: ESLint's and RuboCop's autofix features are not good examples of pretty-printers. They were designed with a different purpose - they are good linters, but they are less effective as pretty-printer and they don't use [stable algoriths](https://en.wikipedia.org/wiki/Stable_algorithm) for printing.

## What is your recommendation for improving IDEs?

There are other cool projects, like predictive code competition which uses machine learning to provide more relevant suggestions ([kite](https://www.kite.com/pricing/), [tabnine](https://www.tabnine.com/)). But I recommended only things that I have tried.

What would you recommend that you tried and it significantly improved your experience?
