---
title: "Code navigatability?"
date: 2020-03-08T03:41:44+03:00
description: Navigatability is the ease with which a reader can navigate a written text
tags: [codereadability, readability, programming, discuss]
---

## What is navigatability?

I made up this word in the same manner as read-ability. If readability "is the ease with which a reader can understand a written text" ([Wikipedia](https://en.wikipedia.org/wiki/Readability)). Navigatability is the ease with which a reader can navigate a written text.



For example, traditional printed texts have the following navigation patterns:

- Start and end - we can read the book from start to end
- Table of contents, chapters
- Alphabetical index

Online texts have (in addition to traditional texts)

- hyperlinks
- text search

Navigatability contributes to readability. Easier it is to navigate text easier it is read text.

## Navigatability in code

Navigatability in code is a special case. If we take traditional text it's navigatability is predefined, for example, table of contents for a book. But navigatability in code will vary depending on IDE, on task, on a reader, on programming language, etc.

Let's talk about some popular navigation solutions for code.

### File structure

One of the attempts to improve navigatability is by introducing a file structure. For example:

```text
/src
/tests
/utils
```

This works well if there is time tested convention, for example, Ruby on Rails.

The idea of putting code in separate files is widely adopted, but there is no research that proves it makes navigation easy.

The downside of files is that you need to keep the context in memory when you jump between files.

### Jump to definition

Some IDEs and text editors allow to trace the origin of the symbol (variable, function, etc.). The effectiveness of this varies depending on PL. As well it will break in case of "code indirections", for example, callbacks, dependency injections, etc.

### Text search

As well sometimes called grep-ability. I call this strategy fallback, e.g. people use it when everything else failed, for example:

- when "jump to definition" doesn't work, we can search for this symbol instead
- when we failed to follow file structure we can try to search some keyword (phrase on the screen, the path in URL, etc)

### Debuging

Sometimes when everything else failed we can use debugging methodologies to find a way around in the code. If this is the case it means navigatability is very poor.

## Reasons to navigate

I guess the way we navigate through code as well depends on the reason why we want to navigate through code. For example, 

- I need to change behavior (look, text, etc) of some code, where is code responsible for this behavior?
- I edit function (component etc) where is it used?
- See [I am a puts debuggerer](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html) for other examples

## Your thoughts?

Do you know other code navigation patterns I missed?



