---
title: "Evaluating Developer eXperience of a programming language"
date: 2018-11-18T00:00:00+02:00
draft: false
description: "it is like 'The Joel Test' but for programming languages"
tags: [dx, programming-language, programming]
cover_image: test.jpg
discuss:
  devto: developer-experience-the-stereoboster-test-for-a-programming-language-4c44
---

Ok, I need to explain myself. There is ["The Joel Test"](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/). This is a "3-minute" test to evaluate the software team. The test itself is a bit outdated, for example, the question "Do you use source control?", it is like to ask do you brush your teeth - everybody should do that without questions, but I still like the test and consider it useful.

So I thought I will come up with the same kind of test to evaluate DX of programming language and tooling around it.

## Does a language have a package manager?

There were times when the software was written from the scratch, in assembly language or using punch cards. But nobody writes software this way anymore.

> Sussman said that in the 80s and 90s, engineers built complex systems by combining simple and well-understood parts. The goal of SICP was to provide the abstraction language for reasoning about such systems.
>
> Today, this is no longer the case. Sussman pointed out that engineers now routinely write code for complicated hardware that they don’t fully understand (and often can’t understand because of trade secrecy.) The same is true at the software level, since programming environments consist of gigantic libraries with enormous functionality. According to Sussman, his students spend most of their time reading manuals for these libraries to figure out how to stitch them together to get a job done.
>
> -- [Programming by poking: why MIT stopped teaching SICP](http://lambda-the-ultimate.org/node/5335)

Today's programming language should have a package manager, to install additional libraries and dependencies.

I guess one of the best examples of package managers out there is [Bundler](https://bundler.io/) (Ruby). A lot of other package managers were inspired by it, like Cargo (Rust), Yarn (Node), and I guess Cocoapods (Objective-C).

Need to say that not every package manager is the same. There are some criteria for good package managers, for example, it should be able to cache packages (for faster installs), it should be deterministic (so each installation would be the same), it should be able to work offline (once all packages installed). For example, npm v3 is an example of not so good package manager, they fixed a lot of problems in the latest version. npm v3 is the reason why yarn exists, it was so hard to use that Facebook decided to create own package manager. [And they keep improving it](https://github.com/yarnpkg/rfcs/pull/101).

On the other side if authors of the language do not provide any option community will find a way around. I guess this is how Cocoapods were born, and it is kind worked out (I have no idea how popular widespread it is right now), but there can be and not so good outcomes when community splits, for example, [The Saga of Go Dependency Management](https://blog.gopheracademy.com/advent-2016/saga-go-dependency-management/) and [Go 1.11 Modules (vgo) vs dep](https://github.com/golang/dep/issues/1959).

**Reminder**: my purpose here is not to judge or blame, this is just a case study of how things can go wrong, and to show how developers struggle when no attention paid to DX.

## Does a language have a code formatter?

I guess syntax is the number one reason for bikeshedding. Not to bring hate, but just show how much energy can be wasted on this: [bootstrap-dropdown.js clearMenus() needs ; at the end](https://github.com/twbs/bootstrap/issues/3057).
If there is no official style guide community can get fragmented, for example, [“No semicolons” is the opposite of practical](https://github.com/standard/standard/issues/78) (JS again).

With good code formatter and integration in IDE, you don't need to worry about formatting at all - you can write anything and formatter will make it look nice.

Examples of formatters:

- [gofmt](https://golang.org/cmd/gofmt/) from Golang
- [prettier](https://github.com/prettier/prettier) from JavaScript

Worth to mention that linter is not a replacement for formatter, for example, eslint. No need to check that formatting is wrong and force developer to fix it when it is possible simply fix it. Leave all boring work to computers (and yes I know that eslint has `--fix` option, but it is slow and inconsistent compared to `prettier`).

There is a good scientific paper on this subject - [A prettier printer
by Philip Wadler](https://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf). That is what they use in [Prettier](https://prettier.io/docs/en/technical-details.html).

## Does a language have a version switcher?

If you developing application most likely you have to deal with one version of the language. But if you have to deal with more than one project or develop library you may want to have more than one version of the language installed on the same machine and typically this is an issue because executables are named the same way. That is why you want to use some kind of "version switcher", application or shell function which can switch to different versions of programming languages.

Good version manager can:

- switch version based on the preference in the directory, so each project can set the required version. For example, `rbenv` will switch version based on `.ruby-version` file.
- can download and install the required version. For example, `rustup install stable-x86_64-pc-windows-msvc`

Examples of version switchers:

- [rbenv](https://github.com/rbenv/rbenv)
- [rustup](https://github.com/rust-lang-nursery/rustup.rs)

Worth to mention that with the rise of Docker this issue is less relevant recently.

## Does a language have static analyzer?

Static analyzer - an application which will help to find bugs in your code before you ship it to production. It can be linter guarding against footguns or type checker.

Some languages are statically typed, so it is easy to do type checking, but it doesn't mean that you can't do static analysis for dynamically typed languages. There are a lot of examples of gradual type systems:

- Ruby: [sorbet](https://sorbet.run/), [steep](https://github.com/soutaro/steep), [diamondback-ruby](https://github.com/stereobooster/diamondback-ruby)
- JS: Facebook Flow, TypeScript (can be used with JSDoc)

On the other hand, if the language is statically typed it doesn't mean that type checker will find all errors, for example, [Infer](https://fbinfer.com/) can detect potential bugs in Java or C/C++/Objective-C.

Examples of static analyzers:

- Bash: [shellcheck](https://www.shellcheck.net/)
- JS: ESlint with [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- Nginx configuration: [gixy](https://github.com/yandex/gixy)

## Does a language provide clear error messages?

[I wrote about this earlier](/posts/dx-error-messages/). I will not repeat myself, except that I consider [Elm](http://elm-lang.org/blog/compiler-errors-for-humans) to be the best example in this category.

## Does a language has a debugger?

### Imperative languages

If language is imperative you can [get away with print to stdout](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html) or `console.log`. This is not an ideal solution - I remember horror story about debugging JS in Internet Explorer with `alert`, later Firebug appeared, it was a big improvement of DX, and then Chrome DevTools Protocol.

Sometimes it is possible to use "common" (not language specific) tools, like `GDB` or `strace`, but it can be hard and it is better to have language-specific tools.

Examples of debug tools:

- To debug Linux performance issues: [linuxperf](http://www.brendangregg.com/linuxperf.html)
- To debug HTML/CSS/JS perfrormance issues: [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
- To debug microservices: [Jaeger](https://www.jaegertracing.io/docs/1.7/#trace-detail-view)
- To debug goroutines [gotrace](https://github.com/divan/gotrace)
- To debug Garbage Collector: ?

### Declarative languages

But if the language is declarative you definitely want some tool for it, otherwise, you doomed. SQL is a good example of declarative language, and `explain` is debug tool, which will help you figure out why the query is slow. [PostgreSQL tooling is specifically good](http://tatiyants.com/postgres-query-plan-visualization/).

On the other hand, there is no good debugger for CSS (which is also declarative language) and as a result, developers struggle with it.

- https://twitter.com/thomasfuchs/status/493790680397803521
- https://twitter.com/chriscoyier/status/919798232179511296

There are some works in this field:

- [pesticide](http://pesticide.io/)
- [csstriggers](https://csstriggers.com/)

## Does language have a standard library?

This is one is a bit vague. So I won't give the definition instead give some examples.

Don't:

- [OCaml std lib is hard to work, so the company which uses OCaml a lot wrote their own lib](https://github.com/janestreet/core).
- [In Go some things can be standardized instead of writing it over and over again](https://twitter.com/garybernhardt/status/905945308202287104)
- JS lacks std lib to work with dates, so [people created a big library to work with it](https://momentjs.com/). Guess what? Next, complain was that it is too big and it affects load time.

Do:

- I guess, Rust
- Maybe Ruby to some extent

## Does a language have learning resources?

At some point, you will need to land junior developer to your project and you will need to teach and help to adapt. And those learning resources first of all will save time for the senior developer, which would be able to send a link to some course and answer some questions instead of reading this course.

Again, a bit vague definition, so I'll provide examples:

Don't:

- [Flow type](https://flow.org/). I wasn't able to find anything useful besides official documentation

Do:

- TypeScript. I found a lot of resource and introduction material on egghead.io and others

## Does a language have a list of best practices?

A typical question from a newbie: what to use for X. Where X can be HTTP request, HTTP server, stream implementation, exotic data structure, ORM or anything else. What are the current best practices?

Don't:

- JS is known for being oversaturated with choices. There is even term for it [JavaScript fatigue](https://www.quora.com/What-is-JavaScript-fatigue). The situation got better recently with some convention over configuration trend set by create-react-app, and [bestofjs](https://bestofjs.org/) appeared, but still, it is hard

Do:

- A good example comes from the Ruby world, again. There is [ruby-toolbox](https://www.ruby-toolbox.com/). It is not so glorious right now (after the incident), but believe me, [it was](https://web.archive.org/web/20170430093635/https://www.ruby-toolbox.com/).

## Is a language environment easy to setup?

This is not always a trait of the language, sometimes rather a trait of projects in this language, but there is definitely a trend. It is fair to say that with Docker rise, this is less a problem, but still.

Some C and C++ projects have ridiculous requirements like you need `make`, `cmake`, `GYP`, `python`, `node` some dynamic libraries and all of that should be of some exact version otherwise it is incompatible. I understand there is a reason to have exact versions of dynamic libraries (or OS specific libraries), but otherwise, it is just bad DX.

## PS

This is the first draft (to be precise the second, previous one is at my old blog). I guess I will need to update it after getting feedback. Did I miss something?

I hope I made myself clear - I don't want to shame or blame any of those languages or tools, I just wanted to show what is bad DX and what is good DX, so people can learn and improve. If you feel like I crossed the line, please tell me.

> Photo by rawpixel on Unsplash
