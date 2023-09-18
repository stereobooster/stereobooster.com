---
title: "Abstraction"
date: 2019-01-06T00:00:00+02:00
description: What developers mean when they talk about abstraction?
tags: [programming, beginners]
discuss:
  devto: abstraction-1987
---

Developers talk about abstractions all the time. For example:

> The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.
>
> -- Edsger Dijkstra



or

> Prefer duplication over the wrong abstraction.
>
> -- [Sandi Metz](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

or

> How do we create abstractions that hide implementation details of a particular UI part?
>
> -- [Dan Abramov](https://overreacted.io/the-elements-of-ui-engineering/)

Also, Dan mentioned "abstraction ladder" in one of his tweets. I used "abstraction tower" in [my previous post](/content/posts/complexity/index.md). What developers mean when they say "abstraction"?

## What is an abstraction?

> Abstraction, the cognitive process of isolating, or “abstracting,” a common feature or relationship observed in a number of things, or the product of such a process.
> What is abstracted—i.e., **the abstraction** or abstractum—is sometimes taken to be a concept (or “abstract idea”) rather than a property or relation.
>
> -- [Britannica](https://www.britannica.com/science/abstraction)

I also checked [Oxford Dictionaries](https://en.oxforddictionaries.com/definition/abstraction), [Merriam-Webster](https://www.merriam-webster.com/dictionary/abstract), [SEP](https://plato.stanford.edu/entries/computer-science/#AbstCompScie), but they weren't particularly helpful.

A shorter definition would be - **abstraction** is an artifact of the process of details removal. Pay attention it doesn't specify what details to remove, why and how we do it. This is quite a wide definition and when programmers use word abstraction it can mean a big range of things. Let's see what.

### Abstraction as a model

When we need to represent real (or not real) object in the application, we often chose only some properties (details) to which we pay attention. This attempt to represent something is called modeling. We pay attention only to some chosen details and _throw away other details_, we abstracting.

**Examples**: modeling entities as tables in relational DB, modeling entities as classes in OOP, [modeling entities as types in advanced type systems](https://www.youtube.com/watch?v=XpDsk374LDE).

### Abstraction as implementation details hiding

When we construct some API or interface or contract and hide how it is done, so we can change the implementation without changing API. We hide implementation _details_ e.g. _removing_ them from sight, we abstracting.

**Examples**: high-level languages which abstract away implementation details of how it is implemented at hardware level; a relational database which exposes API in the form of SQL, we don't need to know what algorithms and data structures it uses under the hood to work with it.

Sometimes abstraction hides different abstractions, so we have **layers of abstractions** also known as the tower of abstraction or ladder of abstraction.

If we still need to understand how it is done under the hood it is called "leaky abstraction". For example, indexes in relational Dbs typically implemented as BTrees, that is why query `LIKE abc%`, but `LIKE %abc` will be slow.

### Abstraction as a generalization

We can pay attention only to some common detail of the group, so we can join the group in the one category and make a judgment about the whole group. We _remove_ uncommon _details_, we abstract.

![](https://thepracticaldev.s3.amazonaws.com/i/b30vbk7on0di0pisqhsg.png)

As you can see the choice to which details pay attention can change what group we will get. In this sense abstraction is a point of view.

**Examples**: base class in OOP (inheritance) hierarchy;

### Issue with a broad definition

As we can see a lot of things can be considered as an abstraction in software development and this can be confusing (I think). Do we need to distinguish different types of abstractions? Are they similar or just seems to be similar? I dunno.

### Wrong abstraction

Sometimes we can hear a phrase like "the wrong abstraction". What makes abstraction wrong (or bad)? Abstraction wrong is when we choose to focus on wrong details. For example, when two pieces of code have a syntactic similarity (e.g. looks similar), but not necessarily have the same purpose - the introduction of abstraction here can be a big mistake (this is what Sandi Metz talks about).

When we say "focus on wrong details" we need to understand that "wrong" depends on the context. It happens that abstraction can become wrong eventually when context changes, for example, new requirements were introduced and our old abstraction doesn't fit into the new context anymore.

## Abstract thinking

Abstraction is going beyond software development. It is a cognitive process. Abstract thinking has downsides the same way as [categorical thinking](/content/posts/categorical-thinking/index.md). And we need to be aware of it.

### Different things may seem similar

When we abstract we can choose such a set of details so that different things can start to look similar. For example, Ferris wheel vs auto, both have wheels and you can ride both, but only one can be used to move from one place to another.

### Similar things may seem different

When we abstract we can choose such a set of details that similar things can start to look different. For example, whales are more related to hypos than to sharks.

### Different people can choose different abstractions

Abstraction is like the coordinate system - it can be chosen arbitrarily and as a consequence, this can be a source of confusion.

## Further reading

- "[What Do You Mean?](https://www.youtube.com/watch?v=EbIEtV_31-w)" by Kevlin Henney
- "[On Abstraction](https://www.youtube.com/watch?v=x9pxbnFC4aQ)" by Zach Tellman
- "[On the Nature of Abstraction](https://www.youtube.com/watch?v=XpxzL4q9Rwk)" by Ron Pressler
- "[The abstraction paths: from experience to concept](https://royalsocietypublishing.org/toc/rstb/358/1435)"
