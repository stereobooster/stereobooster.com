---
title: "Native-like PWA"
date: 2023-08-28T20:01:43+02:00
draft: false
tags: [webdev, pwa, ux]
---

Modern PWAs are very powerfull - they can use/do: geolocation, notifciations, file system, payment, bluetooth, camera, microphone, etc. See full list [here](https://whatpwacando.today/). Plus there is
[WebAssembly](https://webassembly.org/), WebGL, etc.

<!--more-->

## Introduction

Let's assume we want to build native-like PWA for mobile platform that will be on separate domain. We don't need to take into account desktop. With this approach priorities would be different, than for typical web development.

What is **important**:

- Service workers for offline support
- Icon, splash screen, theme color
- AppShell
- [Bottom navigation bar](https://www.smashingmagazine.com/2019/08/bottom-navigation-pattern-mobile-web-pages/)
- Support for gestures
- Smooth animations
- Dark theme

What is **not important**:

- Static side generation (SSG), Server side rendering (SSR). Client side rendering (CSR) is enough.
- Search engine optimization, social media optimization.
- Routing, like [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). In standalone mode there is no browser UI anyway.

So far so good. But we can go even further. Take a look at typical native application for mobile platform.

- they typical support only one orientation (portrait or landscape)
  - So we can [lock orientation](https://css-tricks.com/snippets/css/orientation-lock/)
- there is no text selection
  - `user-select: none;` - when people do this on web, it's annoying
- there is no zoom
  - `<meta content="width=device-width, initial-scale=1, user-scalable=no" />` - this is a bad for accessibility (so don't do it unless you know what you are doing)
- we don't need overscroll
  - `overscroll-behavior: none;` or `position: fixed;`
- we don't need other Safari things
  - `-webkit-tap-highlight-color: transparent;` and `-webkit-touch-callout: none;`

And this is not a full-list.

## TodoMVC for PWA

It would be interesting to create minimal demo application for native-like PWA and implement it using different technologies. The same way as [TodoMVC](http://todomvc.com/) used to showcase different "MVC" frameworks.

For inspiration:

- https://codebase.show/
- https://tastejs.com/
- https://tastejs.com/movies/index.html
- https://propertycross.com/

### Specification

In order to do this we need to define specification, similar to [this one](https://github.com/tastejs/todomvc/blob/master/app-spec.md). It can be something like this:

1. It should be installable
   - it should have webmanifest and all required icons
   - it should provide installation instruction for iOS
2. It should work offline
   - It should show at least AppShell when offline
   - If no other functionality is available it should show message (something like "You are offline")
3. It should provide AppShell
   - It should include at least bottom navigation bar (for portrait mode)
4. It should update automatically
   - but it should be unobtrusive
5. It should support gestures
   - For example, ability to swipe left/right to navigate between pages
6. It should support dark mode
   - It should be possible to switch between light and dark mode and it shoould take into account default system mode

## UI framework

Here are some potential candidates for UI framework for the task:

| Name                                                      | React | Vue | other                                    |
| --------------------------------------------------------- | ----- | --- | ---------------------------------------- |
| [Sancho](https://sancho-ui.com/)                          | yes   | no  |                                          |
| [Base Web](https://baseweb.design/)                       | yes   | no  |                                          |
| [Framework7](https://framework7.io/kitchen-sink/core/)    | yes   | yes | Svetle                                   |
| [Vant](https://vant-ui.github.io/vant/mobile.html#/en-US) | no    | yes |                                          |
| [Onsen UI](https://onsen.io/)                             | yes   | yes | Angular                                  |
| [mobileui](https://mobileui.github.io/#getting-started)   | no    | yes | Angular, Phaser                          |
| [Konsta UI](https://konstaui.com/)                        | yes   | yes | Svetle                                   |
| [daisyUI](https://daisyui.com/components/)                | yes   | yes | Solid, Svetle, Angular, Preact, Elm, Lit |
| [MUI](https://mui.com/)                                   | yes   | no  |                                          |
| [Vuetify](https://v2.vuetifyjs.com/en/)                   | no    | yes |                                          |
| [SUID](https://suid.io/)                                  | no    | no  | Solid                                    |

### Use-gesture and co

[use-gesture](https://use-gesture.netlify.app/docs/examples/) and [react-spring](https://www.react-spring.dev/) deserve special mention. They are not UI frameworks, but they can be used to create native-like gestures and animations. See:

- https://github.com/bmcmahen/react-gesture-stack
- https://github.com/bmcmahen/react-page-controller
- https://sancho-ui.com/
- https://github.com/wobsoriano/solid-gesture

### React-native-web

And sepparate place for React Native. It was build to create native mobile applications in first place, so it would cover a lot of requirements out of the box. There is [react-native-web](https://necolas.github.io/react-native-web/), which allows to use React Native on web. And [Expo](https://docs.expo.dev/guides/progressive-web-apps/) seems to support PWA to some extent. So this is separate list for React Native:

- [paper](https://reactnativepaper.com/)
- [RNUI](https://wix.github.io/react-native-ui-lib/)
- [magnus](https://magnus-ui.com/)
- [React Native UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/guides/running-on-the-web#existing-expo-applications)
- [gluestack-ui](https://ui.gluestack.io/), successor for [NativeBase](https://nativebase.io/)

As an alternative to Expo it is possible to use:

- [Vite](/posts/react-native-web-with-vite/)
- [turborepo](https://vercel.com/templates/next.js/turborepo-react-native)

And one more interesting project - [tamagui](https://tamagui.dev/). Which takes the same idea as react-native-web, but does some interesting optimizations, for example:

- [react-native-web-lite](https://github.com/tamagui/tamagui/tree/master/packages/react-native-web-lite)

## Known issues

Be aware that while PWAs are very powerfull, there are still some issues. For example:

- https://firt.dev/notes/pwa-ios/
- https://caniuse.com/?search=PWA
- https://github.com/PWA-POLICE/pwa-bugs

## Other resources

- https://web.dev/learn/pwa/capabilities/#empowering-your-pwa
- https://pwa-book.awwwards.com/

Asset generators:

- https://vite-pwa-org.netlify.app/assets-generator/
- https://github.com/elegantapp/pwa-asset-generator
- https://web.dev/maskable-icon/
- https://docs.elk.zone/pwa
- [Definitive edition of "How to Favicon" in 2023](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7)
- https://realfavicongenerator.net/

Minimal requirements:

- https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html

PWA examples:

- https://github.com/hemanth/awesome-pwa
- https://github.com/hzzheng/awesome-pwa
- https://0data.app/glance
- https://appsco.pe/
- https://www.pwalist.app/
