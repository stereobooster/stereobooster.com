---
title: "Developer eXperience: error messages"
description: Let's talk about error messages and warnings in developer tools, like compilers, linters type checkers etc.
tags: [dx]
cover_image: error.jpg
date: 2018-11-09T00:00:00+02:00
discuss:
  devto: developers-experience-error-messages-5cbn
---

Let's talk about error messages and warnings in developer tools, like compilers, linters type checkers etc.

## Clear error messages

I guess the trend of clear error messages is started by Elm. At least I haven't seen that clear messages before. After Elm trend was picked up by [JS](https://github.com/codehag/js-better-errors), [ReasonML](https://github.com/reasonml-community/error-message-improvement), [Ocaml](https://github.com/gasche/ocaml-better-errors), [Rust](https://blog.rust-lang.org/2016/08/10/Shape-of-errors-to-come.html) etc.

Clear error messages make the learning curve much easier, especially if there is a very strict type system, basically, type checker turns into an interactive tutorial.

If error messages are unclear, you need to search the error on the internet. You will be lucky if there is a page which explains what the issues, for example [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md). But there can be a long discussion in the GitHub and you need to scan all comments to find an answer, for example [Warning: Critical dependencies](https://github.com/webpack/webpack/issues/196). It would save a lot of time if the error message would clearly explain how to fix the it, without the need to search for it, without the need to switch context.

I wonder why it hasn't happened before. I guess because it is an additional task, you need to write additional code to make error messages clear. See, for example, [Constructing human-grade parsers](http://duriansoftware.com/joe/Constructing-human-grade-parsers.html).

## Noise in the logs

For better DX, it is required to limit the output of warnings, debug messages, because if there will be a lot of repetitive or unrelated information programmer will develop blindness for the messages. I saw a couple times where developers struggle to solve the issue even that error message clearly explained what to do - they simply didn't read it, because they get used to noise in logs. For example:

```text
FAILED: src/ListItem.mlast
reason-react-hacker-news/node_modules/bs-platform/lib/bsc.exe -pp "reason-react-hacker-news/node_modules/bs-platform/lib/refmt.exe --print binary" -ppx 'reason-react-hacker-news/node_modules/bs-platform/lib/reactjs_jsx_ppx_2.exe'   -w -30-40+6+7+27+32..39+44+45+101 -nostdlib -I 'reason-react-hacker-news/node_modules/bs-platform/lib/ocaml' -bs-no-version-header -bs-super-errors -no-alias-deps -color always -c -o src/ListItem.mlast -bs-syntax-only -bs-binary-ast -impl reason-react-hacker-news/src/ListItem.re
File "reason-react-hacker-news/src/ListItem.re", line 30, characters 24-25:
Error: 3355: <UNKNOWN SYNTAX ERROR>

  We've found a bug for you!
  reason-react-hacker-news/src/ListItem.re

  There's been an error running Reason's refmt parser on a file.
  This was the command:

  reason-react-hacker-news/node_modules/bs-platform/lib/refmt.exe --print binary 'reason-react-hacker-news/src/ListItem.re' > /var/folders/sd/gvj7n1494zj86l861747vbd00000gn/T/ocamlppc688eb

  Please file an issue on github.com/facebook/reason. Thanks!

ninja: error: rebuilding 'build.ninja': subcommand failed
```

And the important part is:

```text
File "reason-react-hacker-news/src/ListItem.re", line 30, characters 24-25:
Error: 3355: <UNKNOWN SYNTAX ERROR>
```

Everything else will not help to fix the error.

> Photo by Matthew Brodeur on Unsplash
