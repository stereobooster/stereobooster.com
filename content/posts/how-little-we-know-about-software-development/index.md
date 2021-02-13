---
title: "How little we know about software development?"
date: 2021-02-13T20:10:09+01:00
draft: false
tags: [watercooler, beginners, productivity, programming, career]
---

> And indeed, on some absolute scale of things, we probably know less about the essence of computer science than the ancient Egyptians really knew about geometry.
>
> -- [Hal Abelson](https://www.youtube.com/watch?v=2Op3QLzMgSY)

<!--more-->

The software development (SD) industry is big. It is big by the amount of money and by the number of people. You would expect that in such a big industry we would figure out how things work by now. It seems to be not the case...

## Education

When I just started as a professional programmer I heard about Design Patterns (book by "Gang of Four"). And I thought of it as some sacral knowledge. It looked complex, a lot of people talked about it, so I thought that this is something smart. If I would learn - it would make me a better programmer. And I did try to learn it and apply it in my job. I can't say it made me a better programmer. The reader can argue that I did something wrong.

On the other side what empirical evidence we have that Design Patterns were a good idea in the first place? Design patterns are supposed to be building blocks for software. How do we know this is a full set of blocks? How do we know those are atomic blocks? Some people have different opinions about design patterns, for example: [Brian Marick - Patterns Failed. Why? Should We Care?](https://www.deconstructconf.com/2017/brian-marick-patterns-failed-why-should-we-care). Other people would object to the idea of Object-Oriented Programming and say that in Functional Programming the same patterns can be expressed more trivially, see:

- [Functional Programming Design Patterns](https://fsharpforfunandprofit.com/fppatterns/)
- [Lambda the Ultimate Pattern Factory](https://github.com/thma/LtuPatternFactory)

The other thing which I learned early in my career was Don't Repeat Yourself (DRY) and other programming "principles", like Keep It Simple (KISS), SOLID, use small functions ([up to 5 lines](https://thoughtbot.com/blog/sandi-metz-rules-for-developers)), use small files, etc. Based on the fact that principles had acronyms and were often repeated I thought it was something important, something that is a time-proven "rule of thumb". I learned the hard way that the DRY principle applied blindly is a bad idea. It took me a while to unlearn it. This quote "gave me permission" to stop believing in DRY:

> Duplication is far cheaper than the wrong abstraction
>
> -- [Sandi Metz](http://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

See also: [Too DRY - The Grep Test](http://jamie-wong.com/2013/07/12/grep-test/), [The life of a file, Evan Czaplicki, 2017](https://www.youtube.com/watch?v=XpDsk374LDE).

This is a general problem. We don't know how to teach software development (or at least I don't know good examples). In university, they would tell you about Big-O, notation, data structures, algorithms, cryptography. In bootcamps, they would tell you about HTML/CSS/JS, Unix/Git, Rails/Ruby. The problem is that either this knowledge is too abstract (how does P vs NP applies to CSS?) or too concrete (we know JS, but not sure how to implement [left-pad](https://www.davidhaney.io/npm-left-pad-have-we-forgotten-how-to-program/)).

They don't teach how to program, how the flow looks like. Most tutorials remind "how to draw the owl" meme. See the first 5 minutes of Justin Searls talk (he explains it better):

{{< youtube V4fnzHxHXMI >}}

Because nobody teaches us how to program, we end up imitating other programmers - following programming "principles" blindly. This situation reminds me [the plot of "The Eleventh Voyage"](https://scifi.stackexchange.com/a/214990) by Stanislaw Lem.

## Discourse

Often things in SD are claimed without proof or based on some anecdotical evidence or based on intuition (which some people would call "logic"). For example, does testing reduces bugs, or do programs written in statically typed languages have fewer bugs?

Hillel Wayne talks about this:

> There are many things in software we believe are true but very little we know. Maybe testing reduces bugs, or maybe it’s just superstition. If we want to improve our craft, we need a way to distinguish fact from fallacy. We need to look for evidence, placing our trust in the hard data over our opinions.
>
> Empirical Software Engineering is the study of what actually works in programming. Instead of trusting our instincts we collect data, run studies, and peer-review our results. This talk is all about how we empirically find the facts in software and some of the challenges we face, with a particular focus on software defects and productivity.
>
> -- [What We Know We Don't Know](https://www.hillelwayne.com/talks/what-we-know-we-dont-know/)

{{< youtube WELBnE33dpY >}}

## Productivity

It is interesting how often productivity and entrance barriers are ignored in our industry. People have been complaining for years about it is hard to write and maintain a big CSS codebase. And typical response is: "you don't know CSS, RTFM!". Eventually, somebody thought of BEM, CSS modules, CSS-in-JS, atomic (or functional) styles (Tailwind, for example). Now we have other people complaining that you need to learn JS to write CSS, that atomic styles lack semantic naming, that performance-vice CSS-in-JS is bad... Every solution has trade-offs. Who is right?

And again discourse is based on feelings, beliefs, faith not on some kind of evidence.

It is strange how little research we have about the human side of software development. Do static types improve productivity or not? Does TDD improve productivity?

Andreas Stefik talks about this:

> Computer science has a long and complex history with programming languages. Historically, we have conducted evaluations using proofs, to ensure they give us the answers we intend, and performance data, to ensure they perform efficiently. While these two techniques are well established and important, I argue a third is fundamentally missing from the design process: a scientific analysis of impact.
>
> In the academic literature, for example, there is a near-complete lack of replicable scientific evidence regarding how the design of programming languages impacts people or communities, which has led in part to the programming language wars. In this talk, I introduce Quorum, the world's first Evidence-Oriented Programming language. Throughout it, I will discuss the specific evidence gathered on Quorum to-date and how other designers can use it to improve or evaluate their own products. Along the way, I will provide information on the history of evidence gathering through the centuries and why rigorous attention to the scientific method in this domain is crucial for the future of computer science.

{{< youtube uEFrE6cgVNY >}}

See also: [Faith, hope, and love: an essay on software science's neglect of human factors](https://courses.cs.washington.edu/courses/cse590n/10au/hanenberg-onward2010.pdf).

## PS

To prevent confusion: I'm talking about software development as an industry, I'm not talking about computer science (which is a research area).

It took me years to realize how immature our industry is. That I should not blindly follow programming principles. I should not feel guilty for not knowing things (it is bad education and chaotic growth of the field). I should focus on things that matter (instead of arguing on Hacker News, Twitter). It is ok to ask questions and say "I don't know" (even if you have "Senior" in your title). If a person can't explain the thing, it means they don't understand the thing themself (and insecurity prevents them to acknowledge this).

If you are still unconvinced in the immaturity of our industry - we can't even agree on what programming language is. Is HTML a programming language?
