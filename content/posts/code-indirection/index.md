---
title: "Code Indirection"
date: 2020-02-23T16:11:20+01:00
description: In this post, I want to talk about one specific readability metric - code indirection
tags: [codereadbility, readbility]
---

# Code indirection

## Code readability

> Readability is the ease with which a reader can understand a written text.
>
> -- [Wikipedia](https://en.wikipedia.org/wiki/Readability)

<!--more-->

> Readability is what makes some texts easier to read than others.
>
> -- [The Principles of Readability](https://files.eric.ed.gov/fulltext/ED490073.pdf)

Many factors play into the readability of text. For example, contrast, font, choice of words and many more. (See: [readbility for natural languages](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide))

Some factors are **subjective** e.g. depends on the reader - if the reader knows given programming language, if the reader knows the context if the reader familiar with the jargon, etc. There is a great talk on the subject: [Laura Savino - Talk Session: Readable Code](https://www.youtube.com/watch?v=IbOp_e9yh0k). She says that "readability needs a reader".

Some factors are **objective** e.g. doesn't depend on the reader - length of the text, indirection in code, etc.

## Code indirection

In this post, I want to talk about one specific readability metric - code indirection. At some point of reading code, you will find yourself asking the question: "where does this variable (or function) come from?". Then you can go to definition of the variable (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>-click) and trace variable to the origin. For example:

```ts
import a from "./a.ts";

const b = a();

function c() {
  b;
}
```

- from `b;` to `const b = a();`
- from `const b = a();` to `import a from "./a.ts";`
- from `import a from "./a.ts"` to file `a.ts`
- etc.

In the given example you can easily "trip" from start to end. But there are cases when the trip is not so trivial, for example:

```ts
let b = a();

// ...

b;
```

<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>-click on `b` will bring you to `let b = a();`, but you can't be sure this is the actual value of `b`, because let allows reassignment, so you need to use search of `"b"` (which could match more than the desired variable) to find first previous occurrence of `b`.

Or the second example:

```ts
function c(b) {
  b;
}
```

to find a source of `b` you will need to find where `c` is called and where it gets arguments.

**The more code indirections you have the harder it is navigating through the code base, the less readable code**.

Direct code:

```txt
e ← d ← c ← b ← a
```

Indirect code:

```txt
e → d ← c ← b ← a
```

## PS

More about readability:

- [Too DRY - The Grep Test](http://jamie-wong.com/2013/07/12/grep-test/)
- [Clear is better than clever](https://dave.cheney.net/paste/clear-is-better-than-clever.pdf)
- [I am a puts debuggerer](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer.html)