---
title: "Server-side UI Components"
date: 2024-07-14T14:35:59+02:00
tags: [rails, js, php, elixir, components, webdev]
---

## JS

I think that this whole trend (of UI components) started with React. Even so there were components before, like jQuery UI and in desktop and mobile applications, it is still fair to say that only with React concept got mainstream (in web development).

All JS UI components first of all meant for client-side. But all modern frameworks (React, Solid, Qwik etc.) support server-side rendering. See [Components for Web](/content/posts/components-for-web/index.md).

With one exception - Astro.

### Astro

Astro components is the only server-side UI components. Even so there are not much pure Astro components:

- [Accessible Astro Components](https://github.com/markteekman/accessible-astro-components)
- [Astro-Bootstrap](https://astro-bootstrap.github.io/)
- Related [Astro Icon](https://www.astroicon.dev/guides/components/)

I think this is because, Astro makes it very easy to use any other frontend framework, so there is no strong need for pure Astro components.

### WebComponents

I have to mention WebComponents...

- [shoelace](https://shoelace.style/)

## Ruby

I wrote about [Rails UI components](/content/posts/rails-ui-components/index.md) before.

## PHP

### Laravel

Component libraries:

- [bladewindui](https://bladewindui.com/) - A collection of over 30 easy-to-customize but elegantly designed blade UI components for your Laravel projects.
- [maryUI](https://mary-ui.com/) - gorgeous Laravel Blade UI Components made for Livewire 3 and styled around daisyUI + Tailwind
- [DashUI](https://github.com/combindma/dash-ui) offers a suite of UI components, all inspired by Shopify Polaris, exclusively crafted with TailwindCSS, Laravel Blade and Javascript.

Related:

- [tallstack](https://tallstack.dev/resources) - **T**ailwind, **A**lpine.js, **L**aravel, and **L**ivewire. A full-stack development solution, built by Laravel community members.
- [laravelviews](https://laravelviews.com/) - Laravel package to create beautiful common views like data tables for the TALL stack.
- [Blade UI Kit](https://blade-ui-kit.com/docs/0.x/introduction) is a set of renderless components to utilise in your Laravel Blade views. In all essence, it's a collection of useful utilities, connecting the dots between different parts of the TALL stack
- [Laravel Mix](https://laravel-mix.com/extensions/single-file-blade-components) extension which lets you use blade components like Vue's single file components.
- [inertia](https://inertiajs.com/). Create modern single-page React, Vue, and Svelte apps using classic server-side routing. Works with any backend — tuned for Laravel.

### Symfony

With Symfony and Twig it is also [possible to create components](https://symfony.com/bundles/ux-twig-component/current/index.html). I didn't find component libraries though.

## Elixir

Component libraries:

- [primer-live](https://primer-live.org/) - An implementation of GitHub's [Primer Design System](https://primer.style/) for Phoenix LiveView
- [SaladUI](https://salad-storybook.fly.dev/welcome) - inspired by [shadcn/ui](https://ui.shadcn.com/)
- [petal](https://petal.build/components) - Tailwind CSS, Alpine.js
- [Bloom UI](https://bloom-ui.fly.dev/) - Tailwind CSS
- [Phoenix UI](https://phoenix-ui.fly.dev/) - Tailwind CSS
- [Surface UI](https://surface-ui.org/)

Storybook-like:

- [phoenix_storybook](https://github.com/phenixdigital/phoenix_storybook)

## Python

In Python it seens idea haven't got mainstream yet (or I didn't find good examples):

- [Django Packages: Components](https://djangopackages.org/grids/g/components/)
- [django-viewcomponent](https://github.com/rails-inspire-django/django-viewcomponent) - inspired by Rails ViewComponent
- [storybook-django](https://github.com/torchbox/storybook-django)
- [Tetra](https://www.tetraframework.com/) - full stack reactive component framework for Django using Alpine.js

## Conclusions and ideas

- Trend 1: HTML over Wire
  - HotWire - Ruby
  - LiveWire - PHP
  - LiveView - Elixir
- Idea 1: while "HTML over Wire" is a popular idea it often follows REST convention. Now there is a new trend for "invisible" RPC, for example:
  - [Qwik's `server$`](https://qwik.dev/docs/server$/)
  - [Electric's `server`](https://github.com/hyperfiddle/electric)
  - [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html)
- Trend 2: backend components (as you saw above). Often combined with Tailwind CSS and Alpine.js
- Idea 2: [Mitosis](https://mitosis.builder.io/) is compiler for client side components to translate from Mitosis to specific framework, like React, Vue, Alpine.js etc. It would be nice to have similar compiler for backend components, like Astro, Phlex, Blade, Phoenix etc.
