---
title: "Hugo: an almost ideal static website generator"
date: 2019-08-19T20:43:44+02:00
draft: false
description: "I use Hugo for my blog. For me, as a developer, this is an ideal experience"
tags: [hugo, blog, webdev, go]
---

I use Hugo for [my blog](https://github.com/stereobooster/stereobooster.com). For me, as a developer, this is an ideal experience.



- I can edit markdown files in my editor of choice.
- I can open-source it, so people can send PRs with edits (or translation of articles).
- I can host it with static hosting. I use Netlify, but now, or Cloudflare + S3 would work as well.

For me, the concept of [Hugo](https://gohugo.io/) is very clear because it is the same idea as in [Jekyll](https://jekyllrb.com/). Implementation is a bit faster, but it is not that easy to extend. In the case of Jekyll, it is easy to add a plugin. In the case of Hugo, you need to recompile it. Trade-offs - as always.

I use Parcel to bundle frontend assets. I use a bit of JS and PostCSS (instead of traditional SASS).

[I fine-tuned the performance of the theme](https://dev.to/stereobooster/building-high-performance-hugo-theme-3b9). I configured very basic styles - nothing fancy but works for me.

I'm almost happy...

## But

### Templates

It is always a problem for me to write some advanced logic with declarative template language. I'm not saying that Hugo template language is bad. I'm saying all templating languages that I've worked with have this issue. I worked with Smarty, Twig, handlebars, etc. - I don't remember all of them it was some time ago.

In this sense, JSX, PHP, erb is easier to work with because they are not declarative. I have nothing against declarative DSL (domain-specific languages), but they typically made with some specific use cases in mind and as soon as you cross this line it becomes clumsy. Try to work with graph data in SQL - yes there are ways, but it is the worst use case for SQL.

In Jekyll, it was possible to write custom ("liquid") tags in ruby, but in Hugo, I need to use templates for custom tags.

It is hard for me to find the logic behind this language, so I end up searching the internet for example and copy-pasting.

As a result, I have now "image" tag which breaks if I use more than one instance of it on the page and I have no idea how to debug this. I will eventually figure out, but this is annoying.

**Possible solution:** maybe instead of templating language use DSL based on flexible language, for example [ruby](https://github.com/goby-lang/goby) and [lisp](https://github.com/glycerine/zygomys).

### ToC

I can't customize the table of contents. Table of contents uses `h1` for root-level elements, but instead, I want to use `h2`, because `h1` is for main page title (I try to follow semantical structure).

### Can't override markdown tags

It would be nice if I could customize markdown output, for example, if I could replace default image `![](image.jpg)`, with my custom implementation, which would generate responsive images and provide `width`, `height`. Instead I need to use `{{ < img src="image.jpg" > }}`.

## What do you think about Hugo?

What features do you miss? What feature do you like? Do you know some interesting tricks?
