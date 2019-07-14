---
title: "Legendary MIT 6.001"
date: 2018-12-02T00:00:00+02:00
description: Computer science is a terrible name for this business. First of all, it’s not a science. It might be engineering or it might be art, but we’ll actually see that computer so-called science actually has a lot in common with magic…
tags: [programming-language, programming, programming-education, education]
cover_image: legendary-mit-6.001.jpg
series: Computer Science education
discuss:
  devto: legendary-mit-6001-2l6
---

> Computer science is a terrible name for this business. First of all, it’s not a science. It might be engineering or it might be art, but we’ll actually see that computer so-called science actually has a lot in common with magic… So it’s not a science. It’s also not really very much about computers. And it’s not about computers in the same sense that physics is not really about particle accelerators, and biology is not really about microscopes and petri dishes. And it’s not about computers in the same sense that geometry is not really about using surveying instruments.
>
> — Hal Abelson

<!--more-->

{{< youtube 2Op3QLzMgSY >}}

## Introduction

In 1980 Hal Abelson and Gerald Jay Sussman started a course at MIT. Later, in 1985, based on this course they wrote a book - Structure and Interpretation of Computer Programs or SICP or wizard book. This course taught N generations of programmers in MIT.

Here is what people are saying about SICP:

> This is one of the great classics of computer science. I bought my first copy 15 years ago, and I still don’t feel I have learned everything the book has to teach.
>
> — [Paul Graham](https://www.amazon.com/gp/customer-reviews/R3G05B1TQ5XGZP/ref=cm_cr_srp_d_rvw_ttl?ie=UTF8&ASIN=0262011530)

Peter Norvig, researcher in Google.

> Those who hate SICP think it doesn't deliver enough tips and tricks for the amount of time it takes to read. But if you're like me, you're not looking for one more trick, rather you're looking for a way of synthesizing what you already know, and building a rich framework onto which you can add new learning over a career. That's what SICP has done for me. I read a draft version of the book around 1982, when I was in grad school, and it changed the way I think about my profession. If you're a thoughtful computer scientist (or want to be one), it will change your life too.
>
> — [Peter Norvig](https://www.amazon.com/gp/customer-reviews/R403HR4VL71K8/ref=cm_cr_srp_d_rvw_ttl?ie=UTF8&ASIN=0262011530)

## Give it a try

At the moment all materials for the course is available online for free. So you can try it at your own pace.

Install Racket according to instructions from [the official website](https://download.racket-lang.org/). I tried to install with the package manager, but I was able to install only CLI version, but not the desktop version. CLI REPL uses Emacs editor, which can be a barrier for the newbie. Unless you already know how to use Emacs I recommend to use GUI version of Racket.

Install SICP dialect of Scheme by following [instructions from manual](https://docs.racket-lang.org/sicp-manual/).

You can watch all the lectures [here](https://www.youtube.com/watch?v=2Op3QLzMgSY&list=PLE18841CABEA24090).

You can read the book [online](http://sarabander.github.io/sicp/) or [download pdf](http://web.mit.edu/alexmv/6.S184/sicp.pdf).

The full collection of materials is on [official MIT website](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-001-structure-and-interpretation-of-computer-programs-spring-2005/).

## Why they stop to teach it?

For the fullness of picture, I need to say that [they stopped to teach SICP in 2008(?)](https://mitadmissions.org/blogs/entry/the_end_of_an_era_1/).

This is what Sussman said about his course:

> Sussman pointed out that engineers now routinely write code for complicated hardware that they don’t fully understand (and often can’t understand because of trade secrecy.) The same is true at the software level, since programming environments consist of gigantic libraries with enormous functionality. According to Sussman, his students spend most of their time reading manuals for these libraries to figure out how to stitch them together to get a job done. He said that programming today is “More like science. You grab this piece of library and you poke at it. You write programs that poke it and see what it does. And you say, ‘Can I tweak it to do the thing I want?'”. The “analysis-by-synthesis” view of SICP — where you build a larger system out of smaller, simple parts — became irrelevant. Nowadays, we do programming by poking.
>
> — [Why MIT stopped teaching SICP](https://web.archive.org/web/20160504164044/http://www.posteriorscience.net/?p=206)

Similar insight from Hickey:

> Everyone's experience will be different, of course. Here's my 2 cents:
>
> I don't think SICP is a book about a programming language. It's a book about programming. It uses Scheme because Scheme is in many ways an atomic programming language. Lambda calculus + TCO for loops + Continuations for control abstraction + syntactic abstraction (macros) + mutable state for when you need it. It is very small. It is sufficient.
>
> The book really deals with the issues in programming. Modularity, abstraction, state, data structures, concurrency etc. It provides descriptions and toy implementations of generic dispatch, objects, concurrency, lazy lists, (mutable) data structures, 'tagging' etc, designed to illuminate the issues.
>
> Clojure is not an atomic programming language. I'm too tired/old/lazy to program with atoms. Clojure provides production implementations of generic dispatch, associative maps, metadata, concurrency infrastructure, persistent data structures, lazy seqs, polymorphic libraries etc etc. Much better implementations of some of the things you would be building by following along with SICP are in Clojure already.
>
> So the value in SICP would be in helping you understand programming concepts. If you already understand the concepts, Clojure lets you get on with writing interesting and robust programs much more quickly, IMO. And I don't think the core of Clojure is appreciably bigger than Scheme's. What do Schemers think?
> ...
> Learning Scheme or Common Lisp on your way to Clojure is fine. There will be specifics that don't translate (from Scheme - no TCO, false/nil/() differences, no continuations; from CL - Lisp-1, symbol/var dichotomy). But I personally don't think SICP will help you much with Clojure. YMMV.
>
> — [Rich Hickey](https://groups.google.com/forum/#!topic/clojure/jyOuJFukpmE)

Critiques from Lambda man:

> Abelson and Sussman have written an excellent textbook which may start a revolution in the way programming is taught Instead of emphasizing a particular programming language, they emphasize standard engineering techniques as they apply to programming. Still, their textbook is intimately tied to the Scheme dialect of Lisp. I believe that the same approach used in their text, if applied to a language such as KRC or Miranda, would result in an even better introduction to programming as an engineering discipline.
>
> — [Philip Wadler. Why calculating is better than scheming, 1987](https://www.cs.kent.ac.uk/people/staff/dat/miranda/wadler87.pdf)

## Second life

They stopped original 6.001, yet some enthusiast started more advanced variation of SICP - [6.037 - Structure and Interpretation of Computer Programs](http://web.mit.edu/alexmv/6.S184/).

It would be nice to have online SICP edition with inline [REPL](https://repl.it) to write exercises without leaving the browser, with [Parinfer](https://shaunlebron.github.io/parinfer/) and maybe in the browser [Scheme written in WASM](https://github.com/google/schism).

## Other books

Here are some alternatives to SICP:

- [How to Design Programs](https://www.htdp.org/)
- [Programming Languages: Application and Interpretation](https://cs.brown.edu/~sk/Publications/Books/ProgLangs/2007-04-26/)
- [More books about Scheme](https://racket-lang.org/books.html)
- The Little Schemer, The Seasoned Schemer, The Reasoned Schemer
