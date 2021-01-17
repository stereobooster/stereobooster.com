---
title: "Quiz: is this a programming language?"
date: 2021-01-17T17:43:52+01:00
draft: false
tags: [programming, computerscience, programming-language]
---

## Definttion

I would say that something is programming language (PL) if:

- 1: there is a machine that can do some actions (computations) based on the text written in the language (program)
- 2: or this language can be mechanically translated (compiled) to a programming language

Now let's see if we can tell based on this rule if something a PL or not.

- **Machine code**? Yes, it can be interpreted by CPU
- **Assembly**? Yes, it can be compiled to machine code.
- **C**? Yes, it can be compiled to an assembly.
- **JavaScript**? Yes, it can be interpreted by nodejs.
- **Postscript**? Yes, it can be interpreted by Ghostcript.
- **HTML**? Yes, it can be interpreted by a browser.

## Wait a second ... is HTML a programming language?

Yes according to my definition of PL (if you disagree provide your definition). There is a grammar, which specifies how to parse it. There is an interpreter - in response to instruction in the program it renders different things on the screen.

### But is it Turing complete?

Irrelevant question.

- [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) is Turing complete, but do you want to program with it?
- Agda and Coq are not Turing complete, but nobody seems to doubt that those are programming languages

|               | Turing Complete         | Not Turing complete |
| ------------- | ----------------------- | ------------------- |
| Practical     | JavaScript, Haskell, Go | HTML, CSS, Regex    |
| Not practical | "Turing tar-pit"        |                     |

> 54. Beware of the Turing tar-pit in which everything is possible but nothing of interest is easy.
>
> -- [Alan Perlis ](https://en.wikipedia.org/wiki/Turing_tarpit)

Turing tarpit examples: Brainfuck, C++ templates.

Related: "Pacman complete" (a term coined by Edwin Brady?) - how is it easy to implement Pacman game in the programming language (as an alternative to Turing completeness).

### General-purpose vs special-purpose

Or maybe you want to ask: is it a general-purpose PL? No, it's not - it has a special purpose to denote markup for hypertext. Postscript is Turing complete, but it is used for the same purpose as HTML - to denote markup.

|                 | Turing Complete         | Not Turing complete |
| --------------- | ----------------------- | ------------------- |
| general-purpose | JavaScript, Haskell, Go |                     |
| special-purpose | Postscript, Bash, Make  | HTML, CSS, Regex    |

Another name for special-purpose PL is a domain-specific language (DSL).

### Declarative vs imperative

> Declarative programming is when you write your code in such a way that it describes what you want to do, and not how you want to do it.

From my point of view, this is a very "sketchy" definition. For example, in CSS (before flexbox) to center `div` you would do something like this:

```css
.container {
  ...
  position: relative;
}
.child {
  width: 50px;
  /* Center vertically */
  position: absolute;
  top: 50%;
  margin-top: -25px; /* half this element's height */
}
```

Is it fair to say that I'm expressing "what" instead of "how"? Effectively I say move 50% from top and half of height back.

|             | Turing Complete | Not Turing complete |
| ----------- | --------------- | ------------------- |
| Declarative | Haskell         | HTML, CSS, Regex    |
| Imperative  | JS, Go          |                     |

## Let's continue with the quiz

- **XML**? In general case no, in special cases yes.
  - **XHTML**? Yes
  - **Apache ant**? Yes
  - **SVG**? Yes

XML itself has no meaning, it describes the structure. But as soon as you declare an application that can interpret XML you "define a meaning" for it.

## PS

> If you don't know how compilers work, then you don't know how computers work.
>
> -- [Steve Yegge](http://steve-yegge.blogspot.com/2007/06/rich-programmer-food.html)

I would change it a bit: "if you don't know how compilers and interpreters...".
