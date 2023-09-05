---
title: "Distributing CSS in npm package"
date: 2023-09-03T17:11:21+02:00
draft: false
tags: [webdev, npm, css, components]
---

## Introduction

Typical problem: you want to distribute React (Solid, Vue, etc.) component in npm package. Most likely it will need some kind of styles and maybe assets (images, svg, fonts). How you're gonna do it. Two options:

<!--more-->

- distribute CSS files
- CSS-in-JS

Distributing CSS has following issues:

- You need explicitly include those files (dependency)
- You may need to process them (with bundler/compiler) in order to adjust paths
- They may result in dead code (e.g. code that is never used)
- Styles may clash (global namespace, isolation)
- There can be issues with non-deterministic resolution
- No customisation (no theme support)

Distributing CSS-in-JS:

- resolves all CSS issues, but also
- adds runtime penalty
- increases bundle size

This is classical point of view, but there is a twist. Picture may change a bit with:

- atomic CSS
- CSS variables (custom properties)
- zero-runtime CSS-in-JS (compilation)

## CSS-in-JS alternatives

Before we continue let's mention alternatives:

- atomic CSS UI kit - [Tailwind it the most popular option here](https://2023.stateofcss.com/en-US/css-frameworks/)
- [CSSModules](https://github.com/css-modules/css-modules)

If you want to distribute components (in npm package) you would have to compile those to CSS and distribute this file, which brings us back to CSS issues.

**Note**: [there is a way to compile Tailwind inside the npm package](https://github.com/tailwindlabs/tailwindcss/discussions/8814)

Example: [@dlarroder/playground](https://www.npmjs.com/package/@dlarroder/playground?activeTab=code) ([blog post](https://www.trongtomo.com/blog/create-and-publish-your-own-react-component-library-with-typescript-storybook-and-tailwind))

1. It contains global styles:

```css
*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
```

2. You may be able to customize it via CSS variables

```css
*,
:after,
:before {
  --tw-ring-color: rgba(59, 130, 246, 0.5);
}
```

- But there is no type-safety. I can do a typo `--tw-ring-col: rgba(59, 130, 246, 0.5);` and nothing will notify me about the error

3. What if you use two component libraries that use different versions of Tailwind. There will be clash
4. CSS file may contain all styles for all components, but if I use only one component all the rest of styles will be a dead code

## CSS-in-JS issues

The biggest problem is runtime penalty. Your components would need to parse code for CSS (template literals or JS object), do a vendor specific prefixing, and inject styles and all this happens in the main thread.

Second problem is increased bundle size, which includes runtime itself and CSS expressed in JS.

Don't forget about server side rendering, which also would need special handling.

As the solution you may use one of zero-runtime approaches (in alphabetic order):

- [compiledcssinjs](https://compiledcssinjs.com/)
- [linaria](https://linaria.dev/)
- [macaron](https://macaron.js.org/) uses `vanilla-extract`
- [panda](https://panda-css.com/)
- [style9](https://github.com/johanholmerin/style9/blob/master/docs/How-it-works.md)
- [styled-vanilla-extract](https://github.com/wmertens/styled-vanilla-extract) uses `vanilla-extract`
- [tamagui](https://github.com/tamagui/tamagui/blob/becbd88dd46fc43b4c0a838c33a19f07cb578542/packages/vite-plugin/src/extract.ts#L1) inspired by `vanilla-extract`
- [unocss](https://unocss.dev/guide/)
- [vanilla-extract](https://vanilla-extract.style/)

But then again if you "compile" CSS-in-JS before distributing via npm you will end up with "style" file. So you need to distribute it as is and compilation should be done by the consumer, which may be problematic. Because there are a lot of bundlers/compilers, for example:

- webpack/babel
- vite/esbuild
- turbopack/swc
- etc

So you either will vendor-lock your consumers to one solution or CSS-in-JS need to provide all options.

| solution                                                                                            | vite | esbuild | webpack | next | parcel | rollup | babel | cli |
| --------------------------------------------------------------------------------------------------- | ---- | ------- | ------- | ---- | ------ | ------ | ----- | --- |
| [vanilla-extract](https://vanilla-extract.style/documentation/getting-started/#bundler-integration) | +    | +       | +       | +    | +      | +      |       |     |
| [linaria](https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md)            | +    | +       | +       |      |        | +      | +     |     |
| [panda](https://panda-css.com/docs/installation/cli)                                             |      |         |         |      |        |        |       | +   |
| [compiledcssinjs](https://compiledcssinjs.com/docs/installation)                                    |      |         | +       |      | +      |        | +     |     |

**Note**: this is not a fair comparison - devil is in details.

## Real-world experience

What do big component libraries (UI kits) choose to use.

### Use compile-time CSS-in-JS

- mui: [[RFC][system] Zero-runtime CSS-in-JS implementation](https://github.com/mui/material-ui/issues/38137). But currently uses emotion
- Chakra UI: [The future of Chakra UI](https://www.adebayosegun.com/blog/the-future-of-chakra-ui). Currently uses [panda](https://github.com/chakra-ui/panda). Before was using emotion.

### Use Tailwind

- [flowbite-react](https://github.com/themesberg/flowbite-react)
- [daisyui](https://daisyui.com/)
- [rewind-ui](https://rewind-ui.dev/)
- and [others](https://github.com/aniftyco/awesome-tailwindcss#ui-libraries-components--templates)

### Use runtime CSS-in-JS

- [baseweb](https://github.com/uber/baseweb) uses styletron
- [mantime](https://github.com/mantinedev/mantine) uses emotion based css-in-js library
- [fluentui](https://react.fluentui.dev/): [Motivations for moving away from SCSS](https://github.com/microsoft/fluentui/wiki/Component-Styling#motivations-for-moving-away-from-scss). Currently uses @fluentui/merge-styles
- [evergreen](https://evergreen.segment.com/) uses [ui-box](https://github.com/segmentio/ui-box)
- [grommet](https://github.com/grommet/grommet) uses styled-components
- All [react-native-web](https://necolas.github.io/react-native-web/) based systems:
  - [paper](https://reactnativepaper.com/)
  - [RNUI](https://wix.github.io/react-native-ui-lib/)
  - [magnus](https://magnus-ui.com/)
  - [React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/guides/running-on-the-web#existing-expo-applications)
  - [gluestack-ui](https://ui.gluestack.io/), successor for [NativeBase](https://nativebase.io/)

### Use "nothing"

There is a trend for un-styled components (aka renderless, headless). They use "nothing", but this becomes responsibility of consumer to provide styles (including essential ones):

- [radix-ui primitives](https://www.radix-ui.com/primitives/docs/guides/styling) uses `style` prop and CSS variables
- [ariakit](https://ariakit.org/guide/styling) uses `style` prop and CSS variables
- [headlessui](https://github.com/tailwindlabs/headlessui) can be used with Tailwind
- [reach-ui](https://reach.tech/) uses CSS for essential styles
- [@mui/base](https://github.com/mui/material-ui/tree/master/packages/mui-base) uses `useUtilityClasses`

### Use CSS

- [Ant design](https://ant.design) (less)
- [Semanitc UI](https://react.semantic-ui.com/theming/) (less)
- [carbon](https://github.com/carbon-design-system/carbon/tree/main) (SCSS)
- [semi-design](https://github.com/DouyinFE/semi-design) (SCSS)
- [gestalt](https://github.com/pinterest/gestalt)
- [primereact](https://github.com/primefaces/primereact)
- [pivotal-ui](https://github.com/pivotal-cf/pivotal-ui) (SCSS)
- [coreui-react](https://github.com/coreui/coreui-react)
- [agnosticui](https://github.com/AgnosticUI/agnosticui)

## Related

- [CSS-in-JS and Server Components](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)
- [Library Upgrade Guide: \<style\> (most CSS-in-JS libs)](https://github.com/reactwg/react-18/discussions/110)
- [The Most Popular CSS-in-JS Libraries in 2023](https://stackdiary.com/css-in-js-libraries/)
- [A Thorough Analysis of CSS-in-JS](https://css-tricks.com/a-thorough-analysis-of-css-in-js/)
- [CSS in JS techniques comparison](https://github.com/MicheleBertoli/css-in-js)
- [react-native-web/benchmarks](https://necolas.github.io/react-native-web/benchmarks/)
- [Breaking Up with SVG-in-JS in 2023](https://kurtextrem.de/posts/svg-in-js)

### ReactNative with Tailwind

- [NativeWind](https://www.nativewind.dev/)
- [React Native Zephyr](https://formidable.com/open-source/react-native-zephyr/)
- [tailwind-react-native-classnames](https://github.com/jaredh159/tailwind-react-native-classnames)
- [React Universal Tailwind](https://github.com/react-universal/tailwind)
