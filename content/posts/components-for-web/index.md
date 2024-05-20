---
title: "Components for Web"
date: 2024-05-20T14:49:21+02:00
tags: [components, a11y, webdev]
---

Unsorted notes about components in web development

## Headless components

Headless, aka un-styled, but (and it's important) with a11y

| React                                                      | Vue                                          | Svelte                         | Solid                                                          | Qwik                                                      | Angular | Preact |
| ---------------------------------------------------------- | -------------------------------------------- | ------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------- | ------- | ------ |
| [Radix UI](https://www.radix-ui.com/)                      | [Radix Vue](https://www.radix-vue.com/)      | [Melt UI](https://melt-ui.com) | [kobalte](https://kobalte.dev/docs/core/overview/introduction) | [Qwik UI](https://qwikui.com/docs/headless/introduction/) | ?       | ?      |
| [Headless UI](https://headlessui.com/)                     | [Headless UI](https://headlessui.com/v1/vue) |                                |                                                                |                                                           |         |        |
| [React Aria](https://react-spectrum.adobe.com/react-aria/) |                                              |                                |                                                                |                                                           |         |        |
| [Ark](https://ark-ui.com/)                                 | [Ark](https://ark-ui.com/)                   |                                | [Ark](https://ark-ui.com/)                                     |                                                           |         |        |

**Notes**: I didn't metnion some libraries:

- [Svelte Headless UI](https://svelte-headlessui.goss.io/docs/2.0)
- [Radix Angular](https://github.com/radix-ng/primitives)
- [Radix Svelte](https://radix-svelte.com/) deprecated in favour of Melt UI
- [Radix Solid](https://github.com/TrentsPC/solid-radix) - last commit a year ago
- [Solid Aria](https://github.com/solidjs-community/solid-aria) - last commit 2 years ago
- [Qwik-React](https://qwik.builder.io/docs/integrations/react/) - allows to use any (?) React library in Qwik
- [shoelace](https://shoelace.style/) for WebComponents

### Pre-styled versions of headless components

|                                                  | Headless components            | Styling solution         | Framework            |
| ------------------------------------------------ | ------------------------------ | ------------------------ | -------------------- |
| [shadcn/ui](https://ui.shadcn.com/)              | Radix UI                       | Tailwind CSS             | React                |
| [JollyUI](https://www.jollyui.dev/)              | React Aria                     | Tailwind CSS             | React                |
| [NextUI](https://nextui.org/)                    | React Aria                     | Tailwind CSS             | React                |
| [Tailwind UI](https://tailwindui.com)            | Headless UI                    | Tailwind CSS             | React / Vue          |
| [Park UI](https://github.com/cschroeter/park-ui) | Ark                            | Tailwind CSS / Panda CSS | React / Vue / Solid  |
| [Float UI](https://floatui.com)                  | Radix UI / Radix Vue / Melt UI | Tailwind CSS             | React / Vue / Svelte |

## Cross-framework components

It is hard to ignore this new trend. As soon as all framework would port Radix-like libraries it would be easy to implement cross-framework component libraries, especially using framework independent styling solution, like Tailwind CSS. Example: [Float UI](https://floatui.com).

Similar idea, but taken to the next level - [mitosis](https://mitosis.builder.io/). It allows to compile from Mitosis to different frameworks.

Somehow this reminds me of WebComponents, which supposed to be basic building blocks - lower level abstractions for JS framework. Yet, nobody keen to use it.

### Non-framework specific components

Another approach is to provide CSS and some JS which don't rely on some specific framework. Very similar to WebComponents, without actually defining custom elements. For example:

- [Flowbite](https://flowbite.com/), see for example [Accordion](https://github.com/themesberg/flowbite/blob/main/src/components/accordion/index.ts)
- [Preline UI](https://preline.co/docs/index.html), see for example [HSAccordion](https://github.com/htmlstreamofficial/preline/blob/main/src/plugins/accordion/index.ts)
- etc

## Standards and comparison

Attempt to standardise behaviour, states and content:

- [WAI ARIA patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [zag.js](https://zagjs.com/) - UI components powered by Finite State Machines
- [Open UI](https://open-ui.org/research/component-matrix/). Long term, we hope that Open UI will establish a standard process for developing high-quality UI controls suitable for addition to the web platform.

Open UI mainly compares styled components. It would be interesting to compare unstyled components. On the other hand I assume they all be pretty similar, because they either inspired by Radix UI or reference WAI ARIA patterns

## Primitives

Open UI mainly compares functional components, like checkbox or button. It would be interesting to investigate primitives used by different component libraries. For example

### Layout

- [Braid DS](https://seek-oss.github.io/braid-design-system/foundations/layout): Box, Stack, Inline, Columns...
- [Flutter](https://docs.flutter.dev/ui/widgets/layout): Column, Stack, GridView, AspectRatio...
- [TamagUI](https://tamagui.dev/ui/stacks/1.0.0): XStack, YStack, ZStack, ScrollView...

### A11y helpers

- VisuallyHidden
- Portals
- lock focus
- lock scroll

## Mobile specific primitives

### Animations

Especially interruptible and spring based animations:

- [React Spring](https://www.react-spring.dev/)
- [Motion One](https://motion.dev/dom/spring)

### Gesture handlers

- [React NativeGesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [useGesture](https://use-gesture.netlify.app/)

### Mobile specific components

- [Action sheet](https://tamagui.dev/ui/sheet/1.59.0)
- [Bottom navigation bar](https://daisyui.com/components/bottom-navigation/)
