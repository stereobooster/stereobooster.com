---
title: "react-native-web with Vite"
date: 2023-09-02T11:12:05+02:00
draft: false
tags: [webdev, react, react-native, vite]
---

`react-native-web` itself doesn't require any tricky configuration to work with Vite.

<!--more-->

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    "react-native": "react-native-web",
  },
});
```

**But** in order to use any library for react-native or react-native-web this would be not enough.

First of all `react-native` packages use convention to put web specific code in `.web.js` files:

```ts
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

export default defineConfig({
	resolve: {
		extensions,
	}
	optimizeDeps: {
	    esbuildOptions: {
	      resolveExtensions: extensions,
	    }
	}
})
```

Often `react-native` packages assume webpack and global values defined by it:

```ts
const development = process.env.NODE_ENV === "development";

export default defineConfig({
  define: {
    global: "window",
    __DEV__: JSON.stringify(development),
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});
```

One more unpleasant surprise is that `react-native` packages can distribute `jsx` files with `.js` extension:

```ts
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
});
```

And if you see `ReferenceError: React is not defined` cause by `react-native` package, try:

```ts
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic",
    },
  },
});
```

Other issues which can happen (but I don't have examples for it): `js` files may contain `Flow` syntax:

```ts
import { esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
          /\.jsx$/.test(path) ? "jsx" : "jsx"
        ),
      ],
    },
  },
});
```

## Final config

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";

// https://tamagui.dev/docs/intro/installation
const extensions = [
  ".web.tsx",
  ".tsx",
  ".web.ts",
  ".ts",
  ".web.jsx",
  ".jsx",
  ".web.js",
  ".js",
  ".css",
  ".json",
  ".mjs",
];

const development = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: true,
  plugins: [react()],
  define: {
    // https://github.com/bevacqua/dragula/issues/602#issuecomment-1296313369
    global: "window",
    __DEV__: JSON.stringify(development),
    // https://tamagui.dev/docs/intro/installation
    DEV: JSON.stringify(development),
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    extensions: extensions,
    alias: {
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      // https://github.com/vitejs/vite-plugin-react/issues/192#issuecomment-1627384670
      jsx: "automatic",
      // need either this or the plugin below
      loader: { ".js": "jsx" },
      // plugins: [
      //   esbuildFlowPlugin(/\.(flow|jsx?)$/, (path) =>
      //     /\.jsx$/.test(path) ? "jsx" : "jsx"
      //   ),
      // ],
    },
  },
});
```

## Packages issues

- https://github.com/jsartisan/react-native-magnus/issues/185
- https://github.com/wix/react-native-ui-lib/issues/2730
- https://github.com/software-mansion/react-native-reanimated/discussions/5007
