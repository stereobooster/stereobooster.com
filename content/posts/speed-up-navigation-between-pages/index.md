---
title: "Speed up navigation between pages"
date: 2023-09-10T19:56:21+02:00
draft: false
tags: ["webdev", "performance"]
---

Basic idea - navigating between pages is slow, because:

- browser waits for network response
- it is expensive to redraw the whole page from scratch. Much faster would be to replace `innerHTML` of the document. At least this is common belief, but there are [nuances to that](https://jakearchibald.com/2016/fun-hacks-faster-content/).

## History

First solution appeared in 2010. See [defunkt/jquery-pjax](https://github.com/defunkt/jquery-pjax)

Around 2015 "olympic torch" was taken over by [turbolinks](https://github.com/turbolinks/turbolinks). Which was part of Rails stack and later replaced by [Turbo Drive](https://turbo.hotwired.dev/handbook/drive).

Around the same time there were also:

- [MoOx/pjax](https://github.com/MoOx/pjax)
- [falsandtru/pjax-api](https://github.com/falsandtru/pjax-api#features)
- [barba](https://barba.js.org/), 2016
- [swup](https://github.com/swup/swup), 2017

In 2018 Google jump in on that boat with [quicklink](https://github.com/GoogleChromeLabs/quicklink)

**Note**: later doesn't mean better, because development didn't stop at the release date. For example, `swup` recently released v4.

## Is it still alive?

**Yes**.

One would think that with SPA trend (started around 2015) nobody would care about this kind of solutions, but static website still popular. For example Hugo, Astro and [others](https://jamstack.org/generators/)

## The devil is in the details

I put all those libraries in one category but they are actually different and use different assumptions. For example,

- PJAX uses [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) and AJAX (or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)). It takes over browser navigation mechanism
- quicklink on the other side bothers itself only with [prefetching](https://developer.mozilla.org/en-US/docs/Glossary/Prefetch)/[prerendering](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/prerender)

### Browser history

So we have **two main approaches**:

- don't take over browser navigation
  - pros:
    - easy to integrate
  - cons:
    - animations are not possible
    - state of the page reseted, like selected tabs, collapsed menu, scroll position in sidebar
  - examples: `quicklink`, [@astrojs/prefetch](https://docs.astro.build/en/guides/integrations-guide/prefetch/), [astro-hover-prefetch](https://code.juliancataldo.com/component/astro-hover-prefetch/), [swup preload](https://swup.js.org/plugins/preload-plugin/)
- take over browser navigation
  - pros:
    - hard to integrate
  - cons:
    - animations are possible
    - state of the page can be preserved but needs additional work
  - examples: `pjax`, `barba`, `swup`, [astro-spa](https://github.com/RafidMuhymin/astro-spa)

### Adaptability

Besides browser navigation we need to take into account:

- we don't want to prefetch all the links
  - quicklink uses [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect links within the viewport
  - Other approach is to do this on hover, focus, tap
  - Some libraries allows to specify which links to prefetch
  - Or we can statistically [guess](https://github.com/guess-js/guess)
- we don't want it to do while browser is busy doing something else. You don't want to degrade user experience
  - quicklink uses [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
- Making additional requests on mobile devices may cost user additional money
  - quicklink uses `navigator.connection.effectiveType` to detect slow networks, and `navigator.connection.saveData` to detect data-saver mode

### Related functionality

Main subject is to speed up navigation between pages, but there are related functionalities:

- **animate** page navigations, like in `swup` and `barba`
- **replace only part of the page**, for example to filter list or table, like in [Turbo Frames](https://turbo.hotwired.dev/handbook/frames), [swup fragment](https://swup.js.org/plugins/fragment-plugin/), [astro view transitions](https://docs.astro.build/en/guides/view-transitions/)
- show **page preview** on hover, like in [Obsidian](https://help.obsidian.md/Plugins/Page+preview). See also [previewbox](https://github.com/Fischer-L/previewbox) and [astro-link-preview](https://github.com/cijiugechu/astro-link-preview)
- highlight section if navigated with anchor, like in StakOverflow

I mainly concern myself with static web sites, but in the context of dynamic websites there is so called "HTML over wire" approach:

- Elixir [Phoenix LiveView](https://github.com/phoenixframework/phoenix_live_view)
- Ruby [Turbo](https://turbo.hotwired.dev/)
- PHP [Laravel livewire](https://laravel-livewire.com/)

### Complexity with browser history

Basic implementation can look like this

1. Add global click event listener
2. on click you fetch remote content
3. extract element that needs to be replaced (for example `main`)
4. replace content with `target.innerHTML = response`
5. Push new item to history with `history.pushState(state, "", url);`

**But** you need to take care of:

- removing event handlers from old HTML
- attaching event handlers to new HTML
- replacing title, maybe announce it to screen reader
- replacing styles
- replacing scripts
- maybe provide a hook so that it would be possible to integrate analytics
- scrolling to top of the page
- listen to history for back navigations
- maybe resolve relative links
- it doesn't preserve state of scroll or tabs

It is an error-prone approach.

## To be continued...

While I was doing the research on the subject I stumbled upon:

- [View transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- ["Prerender 2"](https://wicg.github.io/nav-speculation/prerendering.html)
- [Back/forward cache](https://web.dev/bfcache/)
- [Cache API](https://web.dev/cache-api-quick-guide/)

I will need more time to finish the research
