---
title: "Code comprehension: navigation"
date: 2020-11-01T23:46:40+01:00
draft: false
series: "Code Comprehension"
tags: [computerscience, codereadability, readability, programming]
---

Code navigation - one of the basic techniques required for code comprehension. For example, you want to understand how some piece of code works, you need to understand how each function (or class, or subroutine, etc) works, to do this you can jump to the definition of each function and read (or read the documentation if it is a built-in function).

## Text search

Most universal approach. I use it if everything else fails.

### Pros

Works for everything: code, comments, non-code files (for example, translation files).

### Cons

A big number of false positives, for example, you want to find a variable, but it will match the text in comments, keywords, name of functions, classes, text in strings, variables with a similar name, etc.

### When fails

Metaprogramming may break search, for example, you may find nothing in the codebase for rails magic methods, like dynamic `find_by_*` finders, and the dynamic `*_path` URL path generators.

"Smart" code. For example, you want to find the translation key `page.component.header`, but it is written as

```js
const t = (key) => i18n.t("page.component." + key);
t("header");
```

or for example, the translation file looks like this:

```json
{
  "page": {
    "component": {
      "header": "Title"
    }
  }
}
```

or for example, you search for `some text`, but the code looks like this:

```js
print("long bla-bla ... some " + "text ... more bla-bla");
```

See also: [Too DRY - The Grep Test](http://jamie-wong.com/2013/07/12/grep-test/).

## ctags

> The ctags and etags programs generate an index (or "tag") file for a variety of language objects found in source files. This tag file allows these items to be quickly and easily located by a text editor or other utilities.
>
> -- [MAN ctags](https://docs.ctags.io/en/latest/man/ctags.1.html)

A technique similar to **text search**, except it, is aware of syntax, so you can search for name and kind of identifier. For example, for C language following kinds defined: "macro", "function", "variable", "typedef", etc.

### Pros

Less false positives, compared to **text search**. But there are still false positives, for examples, it will find similarly named variables in different scopes:

```js
const fn1 = (x) => {
  console.log(x);
};
const fn2 = (x) => {
  console.log(x);
};
```

### When fails

Metaprogramming and "smart" code (see **text search** section).

## Find all references

_aka find all references_

Basically a fancy **ctags**. Quickly see all the places that use a class, method, variable, or similar. Kind of the opposite of **Go to definition**.

Gives less false positives in languages with explicit imports and exports and languages with static types.

## Go to definition

_aka go to declaration_

In some IDEs this function is activated by `Cmd`/`Ctrl` + click. This technique fully relies on syntax. It will find the exact variable definition in the given scope.

### Pros

No false positives. When there is no way to trace the source of the item, the system will fallback to a ctags-like approach (in this case false positives are possible).

Easy to jump to the origin through many variable and function calls ("chain" of assingments and calls), for example, it would be trivial to get from `y` to `f1`:

```js
const f1 = () => {};
// a lot of code
const x = f1();
// a lot of code
const y = x + 1;
// a lot of code
fn2(y);
```

### Cons

Navigates only in one direction (from bottom to top).

Will miss reassignments:

```js
let x = 1;
// a lot of code
x = 2;
// even more code
fn(x);
```

### When fails

Metaprogramming (see **text search** section).

May fail (fallback to ctags-like approach) for programming languages without explicit imports, for example, Rails project.

May fail for (fallback to ctags-like approach) for programming languages with redeclarations, for example, classes in CSS or interfaces in TypeScript.

Callbacks (and any other function arguments) will break the chain. After this, you will need to switch to ctags or text search to get places where function used and trace the desired value from there.

### When fails

Metaprogramming (see **text search** section).

## Go To Implementation

Using Go To Implementation, you can navigate from a base class or type to its implementations. Useful for OOP languages or statically typed languages. Most likely will work only for statically typed languages.

## Go To Base

Using Go To Base, you can navigate up the inheritance chain of the selected element. Useful for OOP languages or statically typed languages. Most likely will work only for statically typed languages.

## Type search

Ability to find variables and functions by type signature, for example, [hoogle](https://hoogle.haskell.org/).

### Pros

May help in case of a broken chain (when **go to definition** fails).

### Cons

Only works with statically typed languages.

In the case of basic types (string, number, etc.) is useless, but will work for more unique types, like functions and object signatures.

## Go to file, line, column

Go to file (`Cmd`/`Ctrl` + `P` in some IDEs) useful when you know which file you need, for example, when there is code convention, like in Rails. Or for example, you are in file `Component.js` and you want to go to the corresponding test file, you can easily do this if there is a code convention - `Component.test.js`.

Go to file as URI scheme, like `some/file.js:30:10`. For example, when you see an exception stack trace in the browser you can go to this code place in IDE by clicking it. It also can work in terminal (console).

## Go back, go forward

This approach similar to browser history behavior, but instead of web-pages it jumps between cursor positions.

When you jump between files or position in a big file, for example with **Go to definition** or **Go to file**, it is useful to jump back to the previous place where you came from.

## Bookmarks

One more technique is inspired by browsers. Useful when you need to jump around (back and forth) some code places many times.
