---
title: "Categorical Thinking"
date: 2018-12-24T00:00:00+02:00
description: I find categorical thinking helpful to understand some aspects of software development
tags: [programming, beginners]
discuss:
  devto: categorical-thinking-22kp
---

This post inspired by [the lecture of Stanford professor Robert Sapolsky](https://www.youtube.com/watch?v=NNnIGh9g6fA) which skims over some ideas of categorical thinking. I find it helpful to understand some aspects of software development.

## What is a category?

Categorical thinking is one of the tricks our brain employs to deal with big amounts of information. Instead of dealing with each nuance of given objects brain separates in categories (buckets) and deal with less number of objects (categories). As a software developer, I can assume this "compression" improves the speed of processing and storage (it is better to refer to the scientific paper on biology to get a more authoritative opinion).

This trick is especially "useful" when we have to deal with continuous information. For example, there is the whole spectrum of colors but we tend to distinguish only 7 colors in the rainbow (at least English speakers; [thanks to Newton, who believed in alchemy and mystical power of number 7](http://quarksandcoffee.com/index.php/2015/09/14/why-are-there-seven-colors-in-the-rainbow/)).

Categories are some arbitrarily chosen buckets. It is not necessarily dictated by some "logic". Choice of categories can be dictated by culture and language, also can change over time. Returning to rainbow example - not all languages have the same basic set of words for colors. For example, Russian and Greek both consider light blue and dark blue as separate colors. People who work with colors professionally, like painters, can distinguish more colors (remember this meme "Artist vs Normal People"?). Important to understand that we have the same vision (not considering any kind of disorders), but we have an issue to distinguish (it takes us more time, or we're more likely to do an error or harder to recall) depending on how rich our color vocabulary.

Related ideas: abstract thinking, symbolic thinking, stereotypes, pattern recognition.

## How it can go wrong?

When the choice of categories is arbitrary and not dictated by some universal logic (universal logic like they have in math), then categorical thinking can lead to issues.

### Things can be seen as similar even if they different when they fall into one category

![](https://thepracticaldev.s3.amazonaws.com/i/18gt2z7parlbb9aql8jh.png)

As we can see objects `a` and `b` are pretty distant yet they are in the same category so they can be perceived as of the same kind.

In programming, this principle manifest as ["duplication is far cheaper than the wrong abstraction"](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction).

For example, [Evan Czaplicki explains how lists of checkboxes, which can be seen as a similar turn out to be completely different](https://www.youtube.com/watch?v=XpDsk374LDE).

### Things can be seen as different even if they similar when they fall into different categories

![](https://thepracticaldev.s3.amazonaws.com/i/280lxlxnlva7oxubasqs.png)

As we can see objects `a` and `b` are pretty close yet they are in different categories so they can be perceived as of a different kind.

For example, the infinite debate about CSS vs CSS-in-JS. From those categories point of view, CSS Modules falls in CSS-in-JS, but it much closer to CSS's BEM methodologies.

### Thinking in categories traps you and it is hard to see the big picture

Focusing on categories we sometimes forgot to pause and reevaluate what we are dealing with.

In programming, this principle manifests as "law of the instrument " e.g. if the only tool you have is a hammer, it is tempting to treat everything as if it were a nail.

For example, the debate about different paradigms like OOP and functional styles. It is possible to write the same application in both styles, so there is something common behind it, yet programmers argue about which category is better.

### Different understanding of categories

Categories are chosen arbitrarily. And when there is no formal basis for these choices different people can choose differently and lately this will source of confusion.

In programming, this manifests as sketchy terms which have no precise meaning or "taste" for the code.

For, example [strong vs weak types](https://dev.to/stereobooster/pragmatic-types-dynamically--statically--gradually--weakly--strongly--and-un-typed-languages-5gf4), some people will consider C++ as weak because of memory unsafety, some people will consider JS as weak because of implicit coercions, some people will consider Go as weak because of the absence of the polymorphism. In practice, this sketchy terminology is useless and must be replaced with a more precise one.

## Conclusion

Be aware of categories you use and make sure you are not trapped in one set of buckets.
