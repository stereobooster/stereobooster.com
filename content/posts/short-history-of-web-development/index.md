---
title: "A short history of web development"
date: 2020-11-06T02:38:25+01:00
draft: false
tags: [webdevelopment, programming]
cover: timeline.png
---

A small overview of web development approaches and when they appeared.

## Documents vs Applications

This is a popular argument to justify SPAs and CSS-in-JS. The web was invented for documents, but now we use the Web for applications. Also, it's called [Sites vs Apps](https://dev.to/godspowercuche/svelte-for-sites-react-for-apps-mmi-temp-slug-4826936).

**Documents** - is when you mostly read the content. For example, a static website generated with something like Jekyll, or Hugo, or Eleventy, etc.

**Applications** - is when you create, read, update, and delete (CRUD) content. For example, content management systems, like the admin part of WordPress.

This is not a strict separation, but rather a spectrum. For example, a blog by its nature is a collection of documents, but then you have comments, login, etc. So it's somewhere in the middle of the spectrum.

**This is true that the Web was invented to distribute documents** - scientific papers about physics. It was invented by Tim Berners-Lee employed by CERN (The European Organization for Nuclear Research). The world's first browser/editor, website, and the server went live at CERN in December 1990 ([source](https://home.cern/science/computing/birth-web/short-history-web)).

**But** HTTP and URI invented at that time already contained the so-called "object model” idea, which later transformed in [REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) (Roy Fielding, 2000). [HTML 00](https://tools.ietf.org/html/draft-ietf-iiir-html-00) had forms tag. So you were able to write some kind of Web application from the beginning. Create some forms and lists to do CRUD operations on the server.

> Ok, probably, people who talk about "Web was invented for documents”, have something else in mind for applications (something with JS).

JavaScript was introduced in 1996 (in Netscape corp). In 1997 IE4 appeared and Microsoft introduced the idea of DHTML. In 1999 Microsoft introduced XMLHttpRequest (AJAX, now we use `fetch` instead) and JSON standard appeared in 2001. JavaScript was in use at least since the late ‘90s. It means that JS used at least 20 years (2⁄3 of all Web existence).

> Ok, probably, people who talk about "Web was invented for documents”, have something else in mind for applications - SPA (single page applications).

It is hard to say for sure when SPAs appeared. I guess in 2010 when AngularJS and Backbone.js appeared.

This is confusing - let's distinguish different approaches for web development.

## Server-side vs Client-side

**Server-side** applications - when the server is responsible for generating all HTML (no JS). This approach exists since the invention of the Web.

**Client-side** applications (aka SPA) - when server is responsible for serving HTML (almost empty) first time, after this all HTML generation (or manipulation) is done on client-side. Let's say this approach exists since 2010.

This separation is a **spectrum** - there are a lot of hybrid approaches that are in the middle of the spectrum.

**First-generation** hybrid approach - when the server is mainly responsible for HTML generation, the client as well can generate or manipulate HTML, but it is viewed as an addition to what the server does. I guess we can say this approach exists since 1997 ( **DHTML** - Dynamic HTML). Similar approaches: **Unobtrusive JavaScript** (2002), [Progressive Enhancement and Graceful degradation](https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement). Developers need to write both client-side and server-side code. At the moment they were called web developers. Separation to frontend and backend developers appeared later - when SPAs appeared.

**Second-generation** hybrid approach - when the server is responsible for HTML generation (and logic), but there exists some additional layer on the client, which would swap HTML on the client to make it look like SPAs. In this case, developers need to write only server-side code (this what differentiates it from the first-generation). Hard to pinpoint when it's appeared, maybe [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html) (2018). Also, similar ideas were in pjax (2015) and later in quicklink (2018).

### Notes

Strictly speaking, we can compare pure server-side and client-side application only to some extent, because

- some functionality is impossible to implement without JS
- most SPA's need backend API endpoints

The first-generation hybrid approach is a very wide category, maybe we need sub-categories here.

All of those approaches are in use today (they didn't replace each other).

## PS

This is just the first step in [my research](https://github.com/stereobooster/the-history-of-frontend-development).

A more interesting question would be which historical events, technical advancement, and constraints influenced web development. How and why.

For example,

- iOS killed Adobe (previously Macromedia) Flash
- JSON was invented to replace XML in XMLHttpRequest because it was easy to parse on the client with `eval` (this is not secure though)
- jQuery inspired `document.querySelectAll`
- NodeJS introduced CommonJS modules, but they don't work in a browser. Then Browserify, require.js, and Webpack appeared to solve the problem, and later ES Modules
- `null` exist in JS (in addition to undefined), because it was a bug in the implementation

Do you know interesting facts about web development history?
