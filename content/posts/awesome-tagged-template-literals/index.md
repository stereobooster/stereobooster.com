---
title: "Awesome Tagged Template Literals"
date: 2021-01-31T17:36:56+01:00
draft: false
tags: [javascript, macros, programming, syntax]
---

Template literals is a pretty simple thing - it is a multiline string with interpolations:

```js
// instead of this
"old-school string " + variable + "\nmore text";

// you can write this
`template string ${variable}
more text`;
```

Tagged template literal is a function (tag) attached to a template literal. For example:

```js
css`
  color: red;
`;
```

- this function can parse CSS and return it as a JS object
- or it can insert it in the DOM and return the corresponding HTML class
- or it can run PostCSS over the input
- etc.

**Pretty simple idea, but it opens a fountain of creativity.**

## TTL + Syntax highlighting and IntelliSense

- [SQL tagged template literals](https://github.com/frigus02/vscode-sql-tagged-template-literals) - A VS Code extension, which enables syntax highlighting for template literals tagged with an sql function in JavaScript and TypeScript files
- [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) - Syntax highlighting and IntelliSense for html inside of JavaScript and TypeScript tagged template strings
- [vscode-styled-components](https://github.com/styled-components/vscode-styled-components) - Syntax highlighting for styled components in JavaScript and TypeScript. Detailed CSS IntelliSense while working in styled strings.
- [vscode-graphql](https://github.com/graphql/vscode-graphql#gqlgraphql-tagged-template-literal-support-for-tsx-jsx-ts-js) - Syntax highlighting (type, query, mutation, interface, union, enum, scalar, fragments, directives). Autocomplete suggestions
- [vscode-comment-tagged-templates](https://github.com/mjbvz/vscode-comment-tagged-templates) Adds basic syntax highlighting for JavaScript and TypeScript tagged template strings using language identifier comments
- [Pug Template Literals](https://marketplace.visualstudio.com/items?itemName=zokugun.vscode-pug-template-literal) - Adds language support for Pug of JavaScript and TypeScript template literals.
- [es6-string-markdown](https://marketplace.visualstudio.com/items?itemName=jeoht.es6-string-markdown) - Adds syntax highlight support for code, placed in ES6 template literals for Markdown.
- [vscode-njk-template-literal](https://marketplace.visualstudio.com/items?itemName=tomasino.vscode-njk-template-literal)
- [Inline YAML Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=monotykamary.inline-yaml) - Provides basic inline, template literal syntax highlighting through grammar injection for Javascript/Typescript files:

[Search marketplace for "literal"](https://marketplace.visualstudio.com/search?term=literal&target=VSCode)

## TTL + TypeScript

See [Awesome Template Literal Types](https://github.com/ghoullier/awesome-template-literal-types)

## TTL + babel macros

See [Awesome babel macros](https://github.com/jgierer12/awesome-babel-macros)

## More

See [Awesome Tagged Templates](https://github.com/kay-is/awesome-tagged-templates)
