---
title: "Programming Language: To Write or Not To Write?"
date: 2019-08-05T23:36:29+02:00
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript]
discuss:
  devto: programming-language-to-write-or-not-to-write-1aci
---

Programming languages (PL) are treated as a religion. People have holly wars around PL. People confuse paradigms and languages.

> Any sufficiently advanced technology is indistinguishable from magic.
>
> -- Clarke's Third Law

You may want to write a programming language to demystify it. A programming language is just a tool.

## Learning exercise

Don't think about it as the language which you will use for your work or something which will go in production, rather treat it as a learning experience. The main takeaway is to understand the logic behind programming languages and not to write performant or exhaustive implementation.

This exercise follows two principles:

- [Building from scratch](/posts/about-learning/#building-from-scratch)
- [“Problem first” approach](/posts/about-learning/#problem-first-approach)

## What?

What kind of language we gonna write? Lisp. Wait don't close the browser. Listen to me out. I can explain why.

As I said this is learning exercise, and we want to focus on the logic of programming language itself, we want to remove as much side complexity as possible. We don't want to lose time on tokenizers, lexers, parsers, compilers, etc. We want to get to the core. And Lisp is ideal for this purpose because it has **almost** no syntax, which means it is very easy to implement a parser for it.

The simplest implementation of the parser will have only one type of parsing error - no matching bracket.

### But brackets

You don't need to write long programs in Lisp. We will implement the minimal subset of it. So the number of brackets will be tolerable.

Don't forget that choice of brackets is arbitratry:

```text
// Lisp
(a b)
// C-like
a(b)
// Ruby
c.a b
c.a(b)
c.send(:a, b)
// Lua
c.a(c, b)
c:a(b)
```

## How?

We will implement the minimal possible Lisp-like language and extend it as we need. We will implement it with JavaScript. Why? Because if you read this article using web browser it means you already have JS on your machine.

### No assembly? No compiler?

Some people may be confused that we implement one PL in another. Isn't it cheating? Shouldn't we do compiler? Or use assembly?

The trick here is that if you can implement something in Turing complete language you can port (theoretically) to any other Turing machine (this follows from the fact that you can implement one Turing machine inside another Turing machine - turtles all the way down).

It is ok to implement one PL with another one.

## Let's try it

This post is inspired by [(How to Write a (Lisp) Interpreter (in Python))](https://norvig.com/lispy.html). The original post is quite good, you can read that. The main difference between my explanation and the original one is how I divide material. I do this to show explicitly what it takes to add each new feature to the language.

As the first step, we will implement calculator language. It will provide `+`, `-` operations and number values. Seems like not much but, we would learn about REPL, tokenization, parsing, AST, and evaluation along the way.

### How program executes?

Programming language runtime (aka interpreter) does the following steps:

1. reads the text of the program, for example, from the file system or another input
2. parses text - converts text to internal representation which then is evaluated
3. evaluates (executes) instructions

### Evaluation

Evaluation for a calculator language is the same as calculation, but for more complex language evaluation as well means it will make computer to do other things, like read from the input, print to the output, make sounds, make lights blink, etc.

For example, `5 - (2 + 1)` evaluate to `2`. As the first step we need evaluate `(2 + 1)` to `3`, then `5 - 3` to `2`.

This example is a small program. The program consists of small instructions (steps), which computer can evaluate one by one or in parallel. For simplicity, we will assume instructions executed one by one.

Instructions in program text are not always executed in the same order they occur in the program, e.g. `-` stands before `+`, but it is executed second.

> Syntax - the rules that state how words and phrases must be used in a computer language.
>
> [Oxford Learner's Dictionaries](https://www.oxfordlearnersdictionaries.com/definition/english/syntax)

Order of execution is determined by the syntax. When a language has flow control instructions it works a bit different, but we don't have those yet. In our case order of execution is determined solely by syntax rules.

Order of execution matters, because `5 - (2 + 1)` is `2`, but `5 - 2 + 1` is `4`.

### Lisp syntax

This is standard arithmetic notation: `5 - (2 + 1)`. The same example in Lisp will look like this: `(- 5 (+ 2 1))`.

It may confuse you first, but let's see how we can transform from one to another:

1. Add parenthes (it doesn't change the meaning): `5 - (2 + 1)` -> `(5 - (2 + 1))`.
2. Change from infix notation to prefix notation: `(5 - (2 + 1))` -> `(- 5 (+ 2 1))`

Infix notation - when function name (`+`, `-`; as well it can be called operation) stands between arguments of a function (as well they can be called operands), for example `a + b`.

Prefix notation - when function name stands before arguments, for example, `+ a b`.

There are some extensions to this syntax, but we don't need them for the calculator.

### Parsing

Parsing is the process of converting text to internal representation so-called syntax tree.

A tree is the data structure. Syntax tree means it was built according to syntax rules.

A data structure is a way we (developers) organize data to work with inside the computer. For example:

- Singe value. Jen's year of birth is `2000`
- List. My groupmates years of birth are `2000, 2001, 2002`
- Record. My groupmates years of birth are `Jen: 2000, Ben: 2001, Ken: 2002`

A tree is a way to organize hierarchical data. For example, a file system (without links) is a tree

```ascii
home
 ├ My documents
 │ └ Picture.jpg
 ├ My music
 └ My videos
```

A tree can be implemented with nested lists (lists inside lists). Array in JavaScript is a way to represent list (not a linked list, but the concept of the list in general).

```js
const list = [2000, 2001, 2002];
const tree = [
  "home",
  [["My documents", ["Picture.jpg"]], "My music", "My videos"]
];
```

> A tree is a collection of nodes connected by directed edges.
>
> - One node is distinguished as a root;
> - Every node (exclude a root) is connected by a directed edge from exactly one other node; A direction is: parent -> children
>
> -- [Online Textbook for 15-111 Intermediate and Advanced Programming](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm)

By parsing following program

```lisp
(- 5
 (+ 2 1))
```

we will get following (abstract) syntax tree:

```js
["-", 5, ["+", 2, 1]];
```

There are two flavors of syntax trees: abstract and concrete. In AST (abstract syntax tree) we erase details which don't change the meaning of the program, for example, whitespaces and new lines, but in CST this information is preserved. You may need CST when you want to manipulate source code but preserve formatting, for example, to do "refactoring" in IDE, like rename variable.

### Tokenisation

Tokenisation can be one of the sub-steps of parsing. Tokenisation is the way to convert the text of the program to list of tokens (words and punctuation signs). Then the parser can read tokens from the list (or stream) and create AST out of it.

Tokenisation will convert

```lisp
(- 5 (+ 2 1))
```

to

```js
["(", "-", "5", "(", "+", "2", "1", ")", ")"];
```

This is not essential, but this sub-step will make parsing a bit easier.

### Implementing parser

Simple (not optimal) implementation of tokenizer:

- take text (string in JS)
- replace all parenthesis (`(`, `)`) with parenthesis surrounded by spaces (` ( `, ` ) `)
- replace any number of consequent space-like characters (tabs, spaces, newlines) with one space
- split by space

```js
// Convert a string of characters into a list of tokens.
const tokenize = program =>
  program
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .replace(/^\s+|\s+$/g, "")
    .split(/\s+/g);
```

Test for it:

```js
const assert = requires("assert");
const program = "(- 5 (+ 2 1))";
assert.deepStrictEqual(tokenize(program), [
  "(",
  "-",
  "5",
  "(",
  "+",
  "2",
  "1",
  ")",
  ")"
]);
```

Simple (not optimal) implementation of the parser:

- `tokens_to_ast` routine
- take a list of tokens
- pick first one from the list (`shift`)
- check if it is `(`, if yes
- start a new list (array in case of JS, `let L = [];`)
- call `tokens_to_ast` with the rest of tokens
- put (`push`) the result inside of the newly created list (`L`)
- repeat until you get to `)`
- return list (`L`) as the result of the execution of routine
- if not `(`
- check if it is `)`, this is an error program can't be started with `)`
- check if it is number `if (!isNaN(parseFloat(token))) {`
- if yes, return the number
- otherwise, return a string (string is a piece of text). In Lisp, they call it symbols or atoms, but in JS we will use strings.

```js
const parse = program => tokens_to_ast(tokenize(program));

const tokens_to_ast = tokens => {
  if (tokens.length === 0) {
    throw new SyntaxError("Can't parse empty program");
  }
  const token = tokens.shift();
  if (token === "(") {
    let L = [];
    while (tokens[0] !== ")") {
      L.push(tokens_to_ast(tokens));
    }
    tokens.shift(); // pop off ')'
    return L;
  } else if (token === ")") {
    throw new SyntaxError("Unexpected closing parenthesis");
  } else if (!isNaN(parseFloat(token))) {
    // Numbers become numbers
    return parseFloat(token);
  } else {
    // every other token is a symbol or an atom
    // for simplicity we use strings
    return token;
  }
};
```

Test for parser

```js
assert.deepStrictEqual(parse(program), ["-", 5, ["+", 2, 1]]);
```

### Implementing evaluator

Let's think what it would take to evaluate following programs: `(+ 2 2)` and `(- 2 2)`. We need to take AST, destructure it in function name, first and second argument and do calculation based on the name of the function:

```js
const evaluate = ast => {
  // function call handling
  let [name, first, second] = ast;
  if (name === "+") {
    return first + second;
  } else if (name === "-") {
    return first - second;
  } else {
    // runtime error
    throw new Error(`${name} is not a function`);
  }
};
```

But this evaluator can't handle following case: `(+ 2 (+ 2 2))`. On the other side we can handle nested expression e.g. `(+ 2 2)` so maybe we can use evaluator inside evaluator 🤔.

```js
const evaluate = ast => {
  // number handling, like this: 2
  if (typeof ast === "number") {
    return ast;
  } else {
    // function call handling
    let [name, first, second] = ast;
    if (name === "+") {
      return evaluate(first) + evaluate(second);
    } else if (name === "-") {
      return evaluate(first) - evaluate(second);
    } else {
      // runtime error
      throw new Error(`${name} is not a function`);
    }
  }
};
```

This is it - we have evaluator working for calculator language. It is not a very universal piece of the code, but very straightforward implementation. As soon as we would want to add more features we would need to change the code, but this is the part of the exercise, we would learn what kind of changes we need to do to add new features.

Test for evaluator:

```js
assert.deepStrictEqual(evaluate(["-", 5, ["+", 2, 1]]), 2);
```

## REPL

We have the core of our language, let's add some interface to be able to interact with it. REPL stands for:

- Read - read the text of the program, which the user provides using the interface
- Eval - evaluate the program
- Print - print the result
- Loop - repeat the process from the beginning

REPL is a simple interactive interface for a programming language interpreter. For now, our language doesn't have nor read, nor write, nor loop functions, so we will implement this interaction outside of the core (with JS). We can do it two ways: web page or Node.js command-line interface (CLI).

### REPL in web page

Let's try a web page. We will read user input from the HTML text field, evaluate it on the form submit and print results to textarea.

```html
<html>
  <body>
    <form id="form">
      <textarea id="program" placeholder="program"></textarea><br /><br />
      <input type="submit" value="evaluate" /><br /><br />
      <textarea id="result" placeholder="result"></textarea>
    </form>
    <script>
      // implementation of parse and evaluate functions which we wrote before
      // ...
      const form = document.getElementById("form");
      const programInput = document.getElementById("program");
      const resultOutput = document.getElementById("result");
      form.addEventListener("submit", e => {
        // prevent page reload
        e.preventDefault();
        try {
          // evaluate a program
          const result = evaluate(parse(programInput.value));
          // and print it to the textarea
          resultOutput.value = result;
        } catch (e) {
          // in case of error print the error to the textarea
          resultOutput.value = e.message;
        }
      });
    </script>
  </body>
</html>
```

### REPL in CLI

```js
// implementation of parse and evaluate functions which we wrote before
// ...
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "calcy> "
});
rl.prompt();

rl.on("line", input => {
  try {
    console.log(evaluate(parse(input)));
  } catch (e) {
    console.log(e.message);
  }
  rl.prompt();
});
```

## Conclusion

In this tutorial, we did the groundwork for future learning. Next task can be, for example, add variables to the language (a way to save the result of the calculation, to be able to reuse it in the different task), or add functions, or add handling of bigger or smaller number of arguments in functions (for now all functions take exactly two arguments). So much learning opportunities.

I guess in the next tutorial we will add variables, [functions and closures](/posts/from-function-to-closure).

Source code is [here](https://github.com/stereobooster/write-a-language/tree/master/calcy).
