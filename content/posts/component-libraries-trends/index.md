---
title: "Component libraries trends"
date: 2023-09-05T20:51:53+02:00
draft: false
tags: [webdev, react, css, components]
---

## Headless and accessible

**aka** unstyled, renderless

**Main idea** is to provide all the logic for component (often accessibility) without forcing any visual appearance.

- [Reach UI](https://github.com/reach/reach-ui/issues/972)
- [Radix primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [headlessui](https://headlessui.com/)
- [ariakit](https://ariakit.org/components)
- not a component library, but worth to mention [React Spectrum](https://react-spectrum.adobe.com/)

## Based on a design system

**Main idea** it is based on thoroughly documented design-system, so it gives more than just components. There can be a lot of implementations based on the same design system. For example, for [material design](https://m3.material.io/):

- [mui](https://mui.com/)
- [vuetify](https://v2.vuetifyjs.com/en/)
- [SUID](https://suid.io/)

Other design systems:

- https://designsystemsrepo.com/design-systems/

## For mobile development

**Main idea** is to support mobile devices, for example, [bottom navigation bar](https://daisyui.com/components/bottom-navigation/), [gestures](https://github.com/bmcmahen/react-gesture-stack), [safe-areas](https://konstaui.com/react/safe-areas), [action-sheet](https://tamagui.dev/docs/components/sheet/1.59.0) etc. Can be used for developing native apps with WebView (PhoneGap/Cordova) or for PWAs.

- [Konsta UI](https://konstaui.com/)
- [daisyUI](https://daisyui.com/components/)
- [Sancho](https://sancho-ui.com/)
- [Framework7](https://framework7.io/kitchen-sink/core/)
- [Vant](https://vant-ui.github.io/vant/mobile.html#/en-US)
- [Onsen UI](https://onsen.io/)
- [mobileui](https://mobileui.github.io/#getting-started)

All react-native-web component libraries are also in this category:

- [tamagui](https://tamagui.dev/)
- [paper](https://reactnativepaper.com/)
- [RNUI](https://wix.github.io/react-native-ui-lib/)
- [magnus](https://magnus-ui.com/)
- [React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/guides/running-on-the-web#existing-expo-applications)
- [gluestack-ui](https://ui.gluestack.io/), successor for [NativeBase](https://nativebase.io/)

## Based on Tailwind

**Main idea**: it is based on Tailwind. While CSS-in-JS in very unstable situation and they keep inventing zero-runtime solutions, Tailwind just works. So there is whole new wave of component libraries:

- [daisyUI](https://daisyui.com/components/)
- [Konsta UI](https://konstaui.com/)
- [NextUI](https://nextui.org/)
- [Flowbite](https://www.flowbite-react.com/)
- [Material Tailwind](https://github.com/creativetimofficial/material-tailwind)
- [preline](https://preline.co/examples.html)
- [ripple-ui](https://www.ripple-ui.com/)
- [tailwind-elements](https://tailwind-elements.com/docs/react/)
- [sailboatui](https://sailboatui.com/docs/components/tooltip/)

## Not a component library

This is new interesting approach. We already have enough good component libraries, so instead of creating another one, this tool allows to re-use existing. It is more like collection of snippets.

See [shadcn/ui](https://ui.shadcn.com/docs).
