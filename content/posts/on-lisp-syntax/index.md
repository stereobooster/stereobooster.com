---
title: "On Lisp Syntax"
date: 2020-12-26T22:59:37+01:00
draft: false
tags: [lisp]
---

**Note**: when I say Lisp I mean any member of the Lisp family, for example, Common Lisp, Scheme, Racket, Clojure, etc. - all languages that use S-expressions. They all are different, but for this article, it doesn't matter.

## Why Lisp?

Lisp is a micro language - it is [trivial to implement basic Lisp interpreter](http://www.norvig.com/lispy.html). Lisp is a source of many discoveries in computer science, for example, garbage collection, tail call optimization, macros, etc. Lisp is used for teaching - SICP, MIT 6.001, How to design programs. Lisp is used for production - Clojure, Clasp. Lisp is used for research - Scheme, Racket.

It is a majestic language, except for the syntax.

## What is the problem?

There is nothing specifically bad about Lisp syntax. There are a lot of people who write Lisp in a day to day job. The problem is rather the first impression. When you see Lisp for the first time it most likely will seem to you very strange, because it doesn't look like anything you've seen before. For example, math (that you have learned in school):

```text
1 + 2
f(5)
```

in Lisp will look like this:

```lisp
(+ 1 2)
(f 5)
```

The difference is not dramatic it is an easy mapping from one concept to another, but it seems strange and very obvious why would you want to invest your time in adopting that syntax.

It is somewhat similar to the `Vim` editor. It doesn't work like many other editors, you need to invest time to memorize short cuts and learning about modes. But I would say adopting Lisp syntax is easier than learning Vim...

## What is the solution?

I think there is no way to convince all people that Lisp syntax is ok. This ship sailed - all mainstream languages look like C (more or less).

This problem has several dimensions:

- It is hard to read / it is hard to write
- Solve by changing syntax (notation) / solve by changing editor (media)

|               | hard to read | hard to write |
| ------------- | ------------ | ------------- |
| change syntax | 1            | 2             |
| change editor | 3            | 4             |

1: this is what I want to talk about
2: I have no good examples
3: [dim parentheses, rainbow brackets, etc](https://youtu.be/K0Tsa3smr1w?t=723) 4. parinfer, paredit, etc. See [Inspiring a future Clojure editor with forgotten Lisp UX - Shaun Lebron](https://www.youtube.com/watch?v=K0Tsa3smr1w)

I want to explore a potential solution for the 1-st quadrant. What if we can change syntax (but not too much), so it becomes more appealing to a wider audience - internally it would be compiled down to S-expressions, so no other changes for core required, except changing reader and printer. Lisp code is not that far away from traditional languages (like Python) if you remove parentheses.

Example in Python:

```python
def gcd(a, b):
  if b == 0:
    return a
  else:
    return gcd(b, a % b)
```

Example in Racket:

```lisp
(define [gcd a b]
  (if (zero? b)
    a
    (gcd b (modulo a b))))
```

## Let's dive into the problem

### Prefix vs infix notation

Prefix notation

```lisp
(+ 1 2)
```

Infix notation

```python
1 + 2
```

I don't think this is a big problem because there is a small number of infix functions: math operations (`+`, `-`, `*`, `%`, `^`), comparisons (`>`, `<`, `==`, `!=`), bitwise operators (`&`, `|`, `>>`, `<<`), logical operators (`and`, `or`, `xor`) and some other less common, for example `::` in Haskell (`cons`). The number of prefix functions is much bigger and there are no complaints about them.

Another problem with infix notation - it requires precedence rules (which are hard to remember) or explicit grouping (for example, in Pony).

For the first iteration let's use prefix notation for all functions. Using words instead of special symbols may make it less controversial:

```js
plus(1, 2, 3);
```

### Parentheses outside

This is a trivial transformation:

```js
plus(1 2)
```

We need simply move the first symbol inside the list:

```lisp
(plus 1 2)
```

### Too many parentheses

Reduce "optional" parentheses, for eaxmple traditional Lisp:

```lisp
(cond
  ((evenp a) a)
  (t 17))
```

vs Clojure (it removes `()` around cases)

```clj
(cond
  (even? a) a
  true a)
```

Vary (alternate) parentheses, for eaxmple traditional Lisp:

```lisp
(let ((a 1)
      (b 2)
      (c 3))
  (+ a b c))
```

vs Racket

```lisp
(let ([a 1]
      [b 2]
      [c 3])
  (+ a b c))
```

Reserved words instead of `()`, for example in Ruby it is possible to do:

```ruby
[].each do |x|
  puts x
end
# or
[].each { |x| puts x }
```

Other possible candidates:

- `do`/`begin`/`end`
- `try`/`catch`/`end`
- `if`/`then`/`else`/`end`
- (function arguments)/`end`

Infer `()` from indentation (Pythonish syntax), for example, for each indent we can assume `(begin` and for each dedent `)`, this way we can organize function bodies without additional parentheses.

## Other alternative Lisp syntaxes

- [History of alternative syntaxes for Lisp](https://github.com/shaunlebron/history-of-lisp-parens/blob/master/alt-syntax.md)
- [LISO: An operator-based syntax for Racket programs; O-expressions](http://breuleux.net/blog/liso.html)
- [Honu](https://github.com/shaunlebron/history-of-lisp-parens/blob/master/papers/rafkind2012.pdf)
- [G-expressions](https://github.com/shaunlebron/history-of-lisp-parens/blob/master/papers/palmer2009.pdf)
- [wisp: Whitespace to Lisp](https://www.draketo.de/english/wisp)
- [Readable Lisp S-expressions Project](https://readable.sourceforge.io/)
- [LISP Infix Syntax Survey](http://xahlee.info/comp/lisp_sans_sexp.html)
- [Curly infix, Modern-expressions, and Sweet-expressions: A suite of readable formats for Lisp-like languages](https://dwheeler.com/readable/sweet-expressions.html)
- [nonelang](https://nonelang.readthedocs.io/en/latest/dataformat.html)
- [rhombus-brainstorming](https://github.com/racket/rhombus-brainstorming/issues/3)

### See also

- [Homoiconicity It Is What It Is - Stuart Sierra](https://www.youtube.com/watch?v=o7zyGMcav3c)
- [A Racket Perspective on Research, Education, and Production - Matthew Flatt](https://youtu.be/LN0qG-i1iT0?t=2360)
