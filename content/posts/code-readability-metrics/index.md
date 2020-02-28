---
title: "Code readbility metrics?"
date: 2020-02-29T00:07:12+01:00
description: Let's assume you need to build code-readbility-meter. How would you do it?
tags: [codereadability, readability, programming, discuss]
---

Let's assume you need to build code-readability-meter. **How would you do it?**

## What is code readability?

> Readability is the ease with which a reader can understand a written text.
>
> – [Wikipedia](https://en.wikipedia.org/wiki/Readability)

> Readability is what makes some texts easier to read than others.
>
> – [The Principles of Readability](https://files.eric.ed.gov/fulltext/ED490073.pdf)

Many factors play into the readability of text. For example, contrast, font, choice of words and many more. (See: [readability for natural languages](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide))

Some factors are **subjective** e.g. depends on the reader - if the reader knows given programming language, if the reader knows the context if the reader familiar with the jargon, etc. There is a great talk on the subject: [Laura Savino - Talk Session: Readable Code](https://www.youtube.com/watch?v=IbOp_e9yh0k). She says that “readability needs a reader”.

Some factors are **objective** e.g. doesn't depend on the reader - length of the text, indirection in code, etc.

## Subjective factors

In my opinion the only way to control subjective factors of readability is with code reviews e.g. if every team memeber can read and understand give code.

## Objective factors

On the other hand objective factors can be measured by the porgramm, for example, we can build graph of function calls or variables, types, clesses dependencies and measure depth of graph.

So the question is: which objective factors we can measure to detect code readability?

## Goodhart's law

> When a measure becomes a target, it ceases to be a good measure
>
> – [Wikipedia](https://en.wikipedia.org/wiki/Goodhart%27s_law)

I want to think about possible metrics of readability to better understand it, I don't plan to make it one of those metrics like, test coverage or so called code quality.
