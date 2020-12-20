---
title: "Make a Lisp - review"
date: 2020-12-20T03:08:24+01:00
draft: false
tags: [lisp, pony, computerscience, til]
series: "Make-A-Lisp in Pony"
---

Writing a Lisp is a good learning exercise for a programmer. It will provide you with a deeper understanding of basic concepts: what is lambda, what is closure, what is binding etc. Is it relevant to modern programming (LISP was invented in 1958)? Well yes. First of all, because modern Lisps are quite different from the original version (it got the main revamp in 1975 when Scheme was created). Second, a lot of modern languages borrow basic concepts from Lisp, for example, JavaScript uses some concepts from Scheme: lexical scope, call-by-reference, anonymous functions (sometimes called Lambdas), closures, etc.

Lisp is a very small language, so it is relatively easy to implement. It is packed with good concepts (TCO, garbage collection, closures, etc.).

So I decided to do it. I had previous attempt: [write-a-language](https://github.com/stereobooster/write-a-language), it is heavily inspired by [lispy](http://www.norvig.com/lispy.html). But I didn't have the motivation to finish it - I implemented basics and then got bored.

[This is my second attmept](https://github.com/stereobooster/pony-lisp). I decided to follow [MAL](https://github.com/kanaka/mal) and use [Ponylang](https://www.ponylang.io/) to implement it. I don't have any previous experience in Pony, so I thought it would be a good way to learn it. I'm interested in Pony because it is a very interesting language, but I don't have any interesting project to use it for. I have no motivation to build a TODO app or echo server - it sounds boring. Any other idea I can think of seems to be very hard to implement. Lisp is a sweet spot - it is fun to implement and not too complex (but not too easy either).

At the moment I implemented 8.5 steps of MAL (out of 10). I kind of get bored and decided to write down my reflection on the exercise.

## Confusing bits

MAL is very well structured, but it is confusing in some places. I found an explanation on why it is done the way it is done after I watched [conference talk about it](https://www.youtube.com/watch?v=lgyOAiRtZGw) - I should have done this before step 1 instead of after step 8. MAL (as a project) is intended as a learning tool for programming language in which you building Lisp, not so much to learn the concept themselves.

So here are my thoughts on MAL. **Author made an excellent project**, but I would prefer to do some parts differently. **This is not a critic**, this is just a different point of view.

1. Parser is done with regular expressions, which complicates the process a lot. It took me a while to get it right in Pony because Regexp is implemented as a library, it is not a native language feature, which means I needed to double escape some characters - first for a string itself, the second time for Regexp. For example, in JavaScript you would write `/\\/` in Pony you would write `"\\\\"`. Later I discovered tripled quoted strings `"""\\"""`, which don't need additional escaping. This step was unnecessarily complicated. Instead, I would start with tokenizer based on string splitting, like in Lispy - it should support everything except comments and later I would propose an optional step to implement it with Regexp and maybe the next step could be PEG parser 🤷‍♀️.

![](./0.svg)

2. There are a lot of unessential things, which add complexity without additional learning experience and are not required for self bootstrapping, for example, vectors, keywords, hash maps (aka hash table, associative array, dictionary, etc.)

3. Confusing naming for built-in functions, like `cons`, `prn`, etc. I do understand that they are preserved for historical reasons, but if we building new languages as a learning exercise, we can use something more readable. On the bright side, there is no `CAR` and `CDR`. Also what `*` stands for in function names?

4. A lot of same-ish functions, for example, `pr-str`, `str`, `prn`, `println`, etc. Instead, I would prefer to have the smallest set possible. This way it would be easier to build the compiler, which would turn Lisp language into the code of a different language, which then can be compiled. For example, [Shen requires 46 primitive functions](https://github.com/Shen-Language/shen-sources/blob/master/doc/porting.md#setting-up-the-primitive-instruction-set) to implement port.

5. I would outline some things more clear, maybe create separate steps for it. For example, variadic functions, special forms as a separate construct instead of pattern matching in `eval`, etc.

## Good bits

What I liked about MAL is that it "explained" things that I thought were complex, but turned out to be simple, for example

- tail call optimization (TCO)
- macros

And I would like to have more of that!

## MAL 2.0

What could improved version of MAL look like? Fix confusing parts and add more "scary" things (like TCO and macros):

- structural comaprison (so that we can write tests in the language itself aka assert)
- [continuations](https://stackoverflow.com/questions/6512/how-to-implement-continuations)
- pattern matching and destructuring
- concurency (event loop)
- parallelism (threads or actors)
- [persistent data structures](https://common-lisp.net/project/funds/funds.pdf). See [MIT course](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-851-advanced-data-structures-spring-2012/lecture-videos/session-1-persistent-data-structures/)
- [compiler](https://bernsteinbear.com/blog/compiling-a-lisp-0/) aka AOT compiler
- [JIT compiler](https://www.youtube.com/watch?v=1AjhFZVfB9c)
- [garbage collector](https://stackoverflow.com/questions/6866531/how-to-implement-a-garbage-collector)
- [Lisp without garbage collector](https://stackoverflow.com/questions/18249337/lisp-without-a-garbage-collector-for-low-level-programming) aka "soft real time". See [Carp](https://github.com/carp-lang/Carp), [bone-lisp](https://github.com/wolfgangj/bone-lisp)
- [lazy evaluation](https://common-lisp.net/project/clazy/)
- [module system](https://www.stephendiehl.com/posts/exotic01.html) (and namespaces)
- named parameters for functions
- dynamic type checker aka guards or [design by contract](https://www.eiffel.com/values/design-by-contract/introduction/)
- [static type checker](https://alhassy.github.io/TypedLisp.html
) (gradual type system?)
- excpetions with stack traces
- [partial application](https://m-language.readthedocs.io/en/latest/tutorial/functions.html#currying) aka auto-currying]
- pattern matching on function params (like in [Shen](https://www.youtube.com/watch?v=lMcRBdSdO_U))
- logic programming (prolog or [minikanren](http://minikanren.org/))
- [alternative to regular expressions](https://youtu.be/MkTiYDrb0zg)
- function overloading
- user defined types and/or data structures
- [effect system](https://www.stephendiehl.com/posts/exotic03.html)
- [better error messages](https://github.com/elm/error-message-catalog)
- REPL improvements, for example, show all currently defined variables, show documentation for a function, show infered types, etc.

Gamification is a big part of MAL. There are 10 small-ish steps that lead to a final goal - bootstrapping. We need an account for this with new steps. What the final goal here? For example, TCO is not essential, but without it, you can't have deep recursions - maybe you can get some kind of additional badge ("achievement") for every non-essential step.

### Multiverse

Another way to make it more fun is to explore alternative ways to approach the same problem. For example, `if` initially implemented as a [special form](http://www.lispworks.com/documentation/HyperSpec/Body/03_ababa.htm), but it could be implemented as a macro, or with the help of Church encoding, or as a regular function if the language supports lazy evaluation.

Or if you implemented continuations you can try to reuse them for all control flow structures, like `try/throw/catch`, loops, etc.

Or can you make a simplified calculator without numbers and native math functions by using Church encoding?

## MAL alternatives

- [Building LISP](https://www.lwh.jp/lisp/)
- [How to implement a programming language in JavaScript](http://lisperator.net/pltut/dream)
- [Lisp implementations](https://bernsteinbear.com/blog/lisp/)
- [William Byrd on "The Most Beautiful Program Ever Written"](https://youtu.be/OyfBQmvr2Hc)
- [(How to Write a (Lisp) Interpreter (in Python))](http://www.norvig.com/lispy.html), [(An ((Even Better) Lisp) Interpreter (in Python))](http://norvig.com/lispy2.html)
