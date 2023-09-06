---
title: "Lessons learned about code after my recent project"
date: 2019-09-24T13:13:21+02:00
draft: false
tags: [typescript, webdev, programming]
description: "Lessons learned (and other thoughts) after writing code for operational-visualizations"
---

Lessons learned (and other thoughts) after writing code for [operational-visualizations](https://github.com/contiamo/operational-visualizations).



## Premature optimization

> The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.
>
> -- Donald Knuth

This is a known idea. I heard about it many times. I've been quoting it million times. Yet I managed to add a lot of complexity because I worried that it will be not performant.

I guess this is a blind spot of any programmer, no matter how hard you try to make things simple you still will overcomplicate something. It seems the only cure to this problem is to give your code to other developer and ask to use it without telling how. You will immediately discover all the problematic places when you will see people struggling to use it.

See this [PR](https://github.com/contiamo/operational-visualizations/pull/96/files).

## Static types

I'm fun of static type checkers. I try to follow the principle of making illegal states unrepresentable.

**But** TypeScript is not a state of the art type checker, because it tries to be compatible with JS semantics, which means it fails to do some things, for example, disjoint union without discriminant (aka tag).

Sometimes pursuing "making illegal states unrepresentable" makes you write unmaintainable code. Often those complicated structures produce unreadable errors messages.

See [static-vs-dynamic-check.md](https://github.com/contiamo/operational-visualizations/blob/master/docs/adr/0006-static-vs-dynamic-check.md).

## Tools

It took quite some time [to integrate TypeScript and StoryBook in monorepo](https://github.com/stereobooster/typescript-monorepo) and it keeps breaking since then. At the moment type errors don't show up in the StoryBook overlay, so when there is an error you have no idea and need to switch to the terminal to see if there error messages.

It is kind of annoying, but I like the benefits it gives me:

- static type checking thanks to TypeScript
- screenshot testing thanks to StoreyBook and Chromatic

It took some time to figure out how to automate deployments with lerna. At first, we tried to use commitizen and commitlint, but it was pretty annoying experience: you try to commit something, it asks you 5 questions and in the end - commit fails. This is not a not critique of those tools, they simply didn't work for our team.

So we refused from commitlint, instead, we agreed to use conventional format for PR names and squash PRs, this way we can have a clean master branch without annoyance.

We automatically publish npm packages to canary channel from master, thanks to lerna. We run lerna with GitHub workflows. It was a pain to configure the GitHub workflow.

Netlify is an absolute delight to use - PR previews are very helpful. Travis goes without words - an old friend, which I like very much (yet concept of `"$TRAVIS_BRANCH" == "master"` is very confusing).

We use `react-scripts` for eslint config. It works well, except there is no way to make it fail for warnings in CI. `lint-staged` and `prettier` work nice.

It is a stunningly big number of tools. I start to wonder 🤔 if we overengineering it or some of those tools should be built-in in the standard environment.

## PS

It was a nice learning experience. A lot of things yet to be done.
