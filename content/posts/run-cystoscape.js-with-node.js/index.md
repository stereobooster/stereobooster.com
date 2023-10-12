---
title: "Run Cystoscape.js with Node.js"
date: 2023-10-12T18:33:48+02:00
draft: false
tags: [cytoscape, webdev, diagram, cli]
---

**Why?** If you need to generate an image on the server side.

At first, I thought it was impossible. There is [cytosnap](https://github.com/cytoscape/cytosnap) that uses Puppeteer (headless browser). Then, for fun, [I rewrote it with Tauri](/content/posts/tauri-instead-of-puppeteer-or-playwright/index.md).

But later, I though, what if it would be possible to run it with Node.js. And, indeed, it's possible.

## Solution

Add polyfils for the browser (it also includes canvas):

```js
class XMLSerializer {
  serializeToString(node) {
    return serialize(node);
  }
}
global.XMLSerializer = XMLSerializer;

const dom = new JSDOM(`<!DOCTYPE html><div id="cy"></div>`);
global.window = dom.window;
global.document = dom.window.document;
```

Explicitly set bounding box

```js
source.layout.boundingBox = {
  x1: 0,
  y1: 0,
  x2: source.width,
  y2: source.height,
};
```

Generate a graph the same way you would in the browser:

```js
const container = dom.window.document.querySelector("#cy");
const cy = cytoscape({ container, ...defaults, ...source });
cy.layout(source.layout).run();
```

For now I was able to render it only as SVG:

```js
await loadExtension("svg");
res = cy.svg({
  bg: source.background,
  full: true,
});
```

In order to not polute global scope with polyfills we can run this script as sub-process:

```js
const executablePath = `bin/cyto-nodejs.js`;
const bin = spawn(executablePath, args, {
  windowsHide: true,
});
```

That's it.

## Source code

Source code is here: https://github.com/stereobooster/cyto-nodejs
