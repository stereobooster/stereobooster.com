---
title: "Programming urban legends"
date: 2019-08-31T14:55:27+02:00
draft: false
tags: [beginner, computerscience]
description: "Lisp is a functional language. Turing machines are the most 'powerful' computation model. Sound type system guarantees the correctness of the program"
---

## Lisp is a functional language

> Something called “Pure LISP” never existed — McCarthy (1978) records that LISP had assignment and goto before it had conditional expressions and recursion — it started as a version of FORTRAN I to which these latter were added.
> LISP was not based on the lambda calculus, despite using the word “LAMBDA” to denote functions. At the time he invented LISP, McCarthy was aware of (Church 1941) but had not studied it...
>  ...Unfortunately, this gives the wrong binding rules for free variables (dynamic instead of lexicographic).
> Not until SCHEME (Sussman 1975) did versions of LISP with default static binding appear...
>
> -- [Some History of Functional Programming Languages](https://www.cs.kent.ac.uk/people/staff/dat/tfp12/tfp12.pdf), D. A. Turner

Of course, it depends on how you define functional language. I define it as lambda calculus-based, which includes:

  - lexicographic scope
  - normal-order evaluation (or lazy evaluation, or call-by-need). See [CLAZY: Lazy Calling in Common Lisp](https://common-lisp.net/project/clazy/).
  - to do IO it would need to use monads because otherwise, the order of evaluation would matter (which is not the case for lambda calculus). This is based on my current understanding, I need to learn more about monads.

## Turing machines are the most "powerful" computation model

> TMs cannot compute all problems, nor can they do everything that real computers can do.
>
> -- [The Origins of the Turing Thesis](https://pdfs.semanticscholar.org/9a9d/3d5393dd90a37ef9a0b8420fe4c41fc5d8f9.pdf). Dina Goldin, Peter Wegner, June 25, 2004

Turing himself was aware of the problem and proposed additional variations of TM, for example, "choice machines" (TM with ability to read user input, which makes it non-deterministic) and "oracle machines" (TM machines with oracle - "magic" device which can answer some questions).

TM is equivalent to lambda calculus and in this sense, TM can't do non-deterministic calculations the same way as lambda calculus can't do it (hence the requirement for IO monad).

Even more not all programming languages (PL) strive for Turing completeness, because Turing completeness means that there is no way to solve the halting problem for that language. Sometimes PL designer chooses to make it not Turing complete.

## Sound type system guarantees the correctness of the program

> Lots of people say "FP is easier to analyze than imperative code because of purity" but whenever I ask for evidence people look at me like I'm crazy. So I'd like to make a challenge: I'll provide three imperative functions, and your job is to convert them into pure functions.
> Here's the catch: I formally proved all three functions are correct. You have to do the same. And by "formally prove", I mean "if there are any bugs _it will not compile_". Informal arguments don't count. Quickcheck doesn't count. Partial proofs ("it typechecks") don't count.
>
> -- [The great theorem prover showdown](https://www.hillelwayne.com/post/theorem-prover-showdown/), Hillel Wayne

Another widespread legend that sound type system guarantees the correctness of the program. My guess confusion rises from the phrase "types are proofs" (simplified rephrase of Curry–Howard correspondence).

A sound type system can prove only the absence of type errors. It doesn't prove correctness in all senses:

- It doesn't prove that program behaves as expected
- It doesn't prove that the program will have no issues with memory
- It doesn't prove that the program will produce result instead of running infinitely (it is unprovable for Turing complete systems in general). This is based on my current understanding but simply typed lambda calculus isn't Turing complete 🤔.
