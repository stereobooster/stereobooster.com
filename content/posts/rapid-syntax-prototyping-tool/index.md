---
title: "Rapid Syntax Prototyping Tool"
date: 2020-12-31T03:34:12+01:00
draft: false
tags: [lisp, computerscience, syntax, grammar, parser]
---

I want to develop [alternative syntax for Lisp](https://stereobooster.com/posts/on-lisp-syntax/). My idea is to write several possible syntaxes and see if I like them or not.

<!--more-->
### Step 1

I imagine it like this:

- write some BNF-like syntax description
- generate a parser that will return S-expressions
- apply transformations similar to nanopass to get correct Lisp S-expressions
  - For example, transform `(a + b)` to `(+ a b)`

Parser + transformations give me a "reader", which I can put in my implementation of Lisp and try to run some examples.

To make it a faster process I want to:

- reuse "transformers" - which should be trivial, because they are pure functions
- reuse patterns in BNF similar to predefined patterns in [Rosie](https://rosie-lang.org/)

### Step 2

I wonder if it is possible to generate [pretty printer](http://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf) based on grammar and transformations. If it would be possible I can get a set of Lisp programs and generate programs in new syntax to see if it looks good.

Can we [inverse](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.143.3248&rep=rep1&type=pdf) transformers? Related: [Bidirectionalization Transformation Based onAutomatic Derivation of View Complement Functions](https://www.cs.gunma-u.ac.jp/~hamana/Papers/icfp07.pdf), [Combining Syntactic and Semantic Bidirectionalization](https://www.researchgate.net/publication/221241215_Combining_Syntactic_and_Semantic_Bidirectionalization), relational programming.

### Step 3

Given grammar and some additional annotations, it should be trivial to generate [syntax highligter](https://github.com/sharkdp/bat) (inspired by Rosie).

## Implementation

I need to chose [parser generator](/posts/an-overview-of-parsing-algorithms/). PEG parser seems like the best candidate for my purpose (Rosie uses it).

Potential issues with PEG:

- it is linear in time but needs more memory than others. I don't think this is important for an experiment
  - Possible solution: [Packrat Parsing with Elastic Sliding Window, Kimio Kuramitsu, 2015](https://www.jstage.jst.go.jp/article/ipsjjip/23/4/23_505/_pdf/-char/en)
- It doesn't support left recursion
  - Possible solution: [Direct Left-Recursive Parsing Expression Grammars, Laurence Tratt, 2010](https://tratt.net/laurie/research/pubs/html/tratt__direct_left_recursive_parsing_expression_grammars/), [Pika parsing: reformulating packrat parsing as a dynamic programming algorithm solves the left recursion and error recovery problems, 2020](https://arxiv.org/pdf/2005.06444.pdf)
- BNF is non-deterministic, but PEG is deterministic. So if I would naively translate BNF to PEG, there is a chance I would get the wrong parser. Is there a way to check that the two definitions are equivalent? Maybe swap the order of rules in "prioritized choice" and see if it is different grammar or not? If BNF defines an unambiguous language swapping choices should not affect. If there is only one "catch them all" rule it should go last in "prioritized choice".
  - Maybe use something like [model checker](https://youtu.be/FvNRlE4E9QQ?t=520) to generate sentences or counterexamples?
- Out of the box it doesn't have good error messages (because of backtracking)
  - Possible solution: [Syntax Error Recovery in Parsing Expression Grammars](https://arxiv.org/pdf/1806.11150.pdf), [Automatic Syntax Error Reporting and Recovery in Parsing Expression Grammars](https://arxiv.org/pdf/1905.02145.pdf).
- Not a PEG problem, but if the parser will generate S-expressions instead of AST (with meta-information about line and column) and later they will be transformed it will be hard to find the source of runtime error. Maybe it would be possible to generate something like [sourcemaps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)

Other ideas:

- [print decision tree](https://stackoverflow.com/a/62515220) (I guess it is more like a graph, rather than tree). Is this useful: [good decision trees](https://www.cs.tufts.edu/~nr/cs257/archive/luc-maranget/jun08.pdf) or [lazy decision trees](https://www.aaai.org/Papers/AAAI/1996/AAAI96-107.pdf)?
- print stack traces, like Rosie or [arborist](https://github.com/davidkellis/arborist) (`Arborist::GlobalDebug.enable!`)
- [visualise parsing](https://youtu.be/QppWTvh7_sI?t=1949)
- [Implementation of Tamias to Check Production Rules for Parsing Expression Grammar](https://www.atlantis-press.com/journals/jrnal/125917289/view)
  - [PetitParser: Building Modular Parsers](https://boris.unibe.ch/47152/1/Kurs13a-PetitParser.pdf)
- [NezCC: A Cross-Language PEG Parser Generator, 2017](http://jssst.or.jp/files/user/taikai/2017/SOFTWARE/software2-1.pdf)
  - [A Declarative Extension of Parsing Expression Grammarsfor Recognizing Most Programming Languages, 2015](https://www.jstage.jst.go.jp/article/ipsjjip/24/2/24_256/_pdf/-char/ja)
- Add optional semantic information in grammar, for exmaple
  - types: number, string etc.
  - specific syntax constructs: matching brackets, comments, like in [comby](https://comby.dev/en/projects)
- [Macros for Domain-Specific Languages](http://mballantyne.net/publications/extdsls-oopsla2020.pdf)

### Tutorials for PEG parsers

- [PEG parser generator experiments](https://github.com/we-like-parsers/pegen)
- [Mouse: From Parsing Expressionsto a Practical Parser](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.506.9272&rep=rep1&type=pdf)

## Grammars corpus

Another approach to finding "ideal" grammar is to take a look at existing grammars and see what good and bad parts they have - to learn from their experience:

- [The Grammar Tool Box: A Case StudyComparing GLR Parsing Algorithms](https://www.sciencedirect.com/science/article/pii/S1571066104052211)
- [Grammar Zoo: A corpus of experimental grammarware](https://www.sciencedirect.com/science/article/pii/S0167642314003347),
- [Grammar Zoo](http://slebok.github.io/zoo/index.html)

> Zipf’s law, in probability, assertion that the frequencies f of certain events are inversely proportional to their rank r. The law was originally proposed by American linguist George Kingsley Zipf (1902–50) for the frequency of usage of different words in the English language; this frequency is given approximately by `f(r) ≅ 0.1/r`. Thus, the most common word (rank 1) in English, which is `the`, occurs about one-tenth of the time in a typical text; the next most common word (rank 2), which is `of`, occurs about one-twentieth of the time; and so forth. Another way of looking at this is that a rank `r` word occurs `1/r` times as often as the most frequent word, so the rank 2 word occurs half as often as the rank 1 word, the rank 3 word one-third as often, the rank 4 word one-fourth as often, and so forth. Beyond about rank 1,000, the law completely breaks down.
>
> -- [britannica](https://www.britannica.com/topic/Zipfs-law)

Is it possible to construct some common corpus of syntactic constructs (assume they follow Zipf's law) and validate new syntax against those cases?

## Other "parsers" for inspiration

- [rosie](https://rosie-lang.org/)
- [REBOL 3 Concepts: Parsing: Parsing Blocks and Dialects](http://www.rebol.com/r3/docs/concepts/parsing-dialects.html)
- [Red Programming Language: Introducing Parse](https://www.red-lang.org/2013/11/041-introducing-parse.html)
- [OMeta: an Object-Oriented Language for Pattern Matching](http://tinlizzie.org/ometa/)
- [Higher-Order Functions for Parsing](https://www.cs.tufts.edu/~nr/cs257/archive/graham-hutton/parsing.pdf)
- [parsec: Monadic parser combinators](https://hackage.haskell.org/package/parsec) (LL(1))
- [frisby](http://repetae.net/computer/frisby/) (PEG)

### Racket

- BNF inspired: [brag](https://docs.racket-lang.org/brag/), [ragg](https://docs.racket-lang.org/ragg/)
- [PEG](https://docs.racket-lang.org/peg/index.html)
- [LALR(1)](https://docs.racket-lang.org/parser-tools/)
- Parsec inspired: [megaparsack](https://docs.racket-lang.org/megaparsack/index.html), [parsack](https://docs.racket-lang.org/parsack/index.html)

## Language Workbench

- [Spoofax](http://www.metaborg.org/en/latest/index.html)
  - [PLDI 2020 - Declarative Language Definition with Spoofax Tutorial](https://www.youtube.com/watch?v=TMhjttXnN54)
- [textX](http://textx.github.io/textX/stable/about/comparison/)
- [Evaluating and Comparing Language Workbenches](https://www.informatik.uni-marburg.de/~seba/publications/language-workbench-results-benchmarks.pdf)