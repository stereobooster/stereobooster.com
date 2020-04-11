---
title: "CSS architecture?"
date: 2020-04-11T20:22:03+02:00
draft: true
tags: [programming, css, webdev]
---

Have you heard the term "CSS architecture"? You can search the internet for it, for example, there is the [article by Philip Walton](https://philipwalton.com/articles/css-architecture/). I understand it as a set of best practices to make you CSS scalable, e.g. some rules which allow you to write a lot of CSS before it becomes unmaintainable and collapses due to incidental complexity.

Let's step back for a moment. What is CSS? CSS is a declarative language for layout and painting engine. Right?

## Declarative languages

There are a lot of declarative languages, for example, SQL, YAML (as config), HTML (some people would argue this is not a programming language, but markup).

Have you heard about SQL architecture? There are database architects, but they not bothered with how to write big SQL queries, they rather working on the database itself, so it's not the same.

## Layout engines

There are a lot of layout engines, for example, [flutter](https://youtu.be/UUfXWzp0-DU), [subformapp](https://www.deconstructconf.com/2017/kevin-lynagh-choosing-features), [yoga](https://yogalayout.com/), [layoutkit](http://layoutkit.org/), [Render](https://github.com/alexdrone/Render) (see [#layout-engine](https://github.com/topics/layout-engine)).

It seems they don't have dedicated practices on how to write a lot of layout code. Maybe they don't have the same requirements, maybe layout in their case can't be separated from components.

## 🤔 Wondering

Did we by any chance gone too far with this CSS thing? Maybe it brings more incidental complexity in the long run than it solves essential complexity?
