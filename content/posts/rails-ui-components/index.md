---
title: "Rails UI components"
date: 2024-07-12T10:39:31+02:00
tags: [rails, components, webdev, ruby]
---

## Classical approach

Classical Rails view (V from MVC) approach is: [ERB](https://docs.ruby-lang.org/en/master/ERB.html) plus [helpers](https://guides.rubyonrails.org/action_view_overview.html#helpers). Which conceptually it [the same as PHP4](https://www.sitepoint.com/introduction-to-cells-a-better-view-layer-for-rails/#railsviewsphp4). And it's understandable - when Rails were invented it was the only way.

There are alternatives to ERB, like: [HAML](https://haml.info/), [Slim](https://slim-template.github.io/), [liquid](https://github.com/Shopify/liquid). But this is essentially the same approach

## New approach

There are different opinions about React, somebody loves it, somebody hates it. But no one can't argue that it changed frontend development practices. And the main changes are JSX and components. React components broke old stigma that separation of concerns should be horizontal: HTML, CSS, JS. Instead React component can encapsulate all that it needs. One can pick up component of the shelf (npm) and use it directly (almost) without configuration.

And this idea slowly cripples in Rails world. There are several libraries which adopt components approach:

- [ViewComponents](https://github.com/ViewComponent/view_component)
- [phlex](https://github.com/phlex-ruby/phlex-rails)
- [papercraft](https://github.com/digital-fabric/papercraft)
- [cells](https://github.com/trailblazer/cells)
- [dry-view](https://github.com/dry-rb/dry-view)

And [benchmark](https://github.com/KonnorRogers/view-layer-benchmarks) if you're interested.

### ViewComponents

[ViewComponents created by Github](https://github.blog/2020-12-15-encapsulating-ruby-on-rails-views/). To my taste it requires a lot of boilerplate code. Second concern is that Github took course to migrate to React, so ViewComponents may be abandoned eventually.

Component libraries:

- [primer](https://github.com/primer/view_components)
- [polaris](https://github.com/baoagency/polaris_view_components)
- [govuk](https://govuk-components.netlify.app/introduction/using-components/)

Form builders:

- [ViewComponent::Form](https://github.com/pantographe/view_component-form)

Storybook-like:

- [ViewComponent::Storybook](https://github.com/jonspalmer/view_component-storybook)
- [Lookbook](https://lookbook.build/guide/components/view_component)

### Phlex

Ligtweight syntax compared to ViewComponents.

Component libraries:

- [RubyUI](https://rubyui.com/) Tailwind CSS, Stimulus JS (PhlexUI previously)
- [ZestUI](https://zestui.com/) Tailwind CSS, Stimulus JS, not free
- [protos](https://github.com/inhouse-work/protos) TailwindCSS, JS

Form builders:

- [superform](https://github.com/rubymonolith/superform)

Icons:

- [phlex-icons](https://github.com/AliOsm/phlex-icons)

Storybook-like:

- [Lookbook](https://lookbook.build/guide/components/phlex)

Awesome list:

- [awesome-phlex](https://github.com/thedumbtechguy/awesome-phlex)

## Ideas

### HTML-over-the-Wire comparison

- [Hotwire](https://hotwired.dev/): [Turbo](https://turbo.hotwired.dev/), [Stimulus](https://stimulus.hotwired.dev/), and [Strada](https://strada.hotwired.dev/)
  - [HTMX vs Hotwire vs Alpine.js - HTML-over-the-Wire Comparison](https://brokeartisan.com/blog/htmx-vs-hotwire-vs-alpine-js-html-over-the-wire-comparison)
- [Alpine.js](https://alpinejs.dev/)
  - [Alpine AJAX](https://alpine-ajax.js.org/comparisons/)
- [htmx](https://htmx.org/)
- [hyperscript](https://hyperscript.org/)
- [unpoly](https://unpoly.com/)
- Related: [Inertia.js Rails](https://inertia-rails.dev/)

### Alpine.js UI libraries

Alpine.js is a good JS option for "backend" components. I imagine it would be easy to port components:

- [PinesUI](https://devdojo.com/pines)
- [SailboatUI](https://sailboatui.com/)
- [PenguinUI](https://www.penguinui.com/)
- [Alpine components](https://alpinejs.dev/components)

### Tailwind UI libraries

Tailwind is a good CSS options for "backend" components. I imagine it would be easy to port components:

- [Flowbite](https://flowbite.com/docs/getting-started/rails/)
- [Preline](https://preline.co/)
- [FloatUI](https://floatui.com/components)
- [HyperUI](https://www.hyperui.dev/)

### Other

It is worth to mention [RailsUI](https://railsui.com/), [shadcn.rails-components.com](https://shadcn.rails-components.com/) and [hotwire.io](https://hotwire.io/ecosystem).

And it would be nice to have component for icons from [iconify](https://iconify.design/).
