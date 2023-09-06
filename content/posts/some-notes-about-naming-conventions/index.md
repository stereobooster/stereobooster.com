---
title: "Some notes about naming conventions"
date: 2021-02-17T00:37:40+01:00
draft: false
tags: [syntax, programming]
---

List of random notes about naming conventions (for my small research). Send more examples along the way.



## Multiple-word identifiers

### Historical note

> Letter case (or just case) is the distinction between the letters that are in larger uppercase or capitals (or more formally majuscule) and smaller lowercase (or more formally minuscule) in the written representation of certain languages.
>
> These terms originated from the common layouts of the shallow drawers called type cases used to hold the movable type for letterpress printing. Traditionally, the capital letters were stored in a separate shallow tray or "case" that was located above the case that held the small letters.[2][3]
>
> -- [wikipedia](https://en.wikipedia.org/wiki/Letter_case)

My guess that `snake_case`, `camelCase`, etc. were derived from "letter case". I would say it is more correct to use the word "notation" here.

### camelCase 🐫

Classically camelCase is supposed to start with a small letter. If it starts with a capital letter it is called PascalCase. For simplicity, I would refer to both variations as camelCase.

Other names (variations): dromedaryCase, PascalCase, UpperCamelCase, StudlyCase.

Used in: Java, JavaScript, etc.

Issues:

- how to represent abbreviations in camelCase. Should we use HTTPHeader or HttpHeader? What about XMLHTTPRequest? I would prefer to capitalize the only first letter of the abbreviation - it is easier to see the boundaries of a word that way.

Used in: Pascal, Modula, Java, .NET, etc.

### snake_case 🐍

Other names: pothole case, c_case.

Variations:

- camel_Snake_Case, Pascal_Snake_Case
- SCREAMING_SNAKE_CASE, MACRO_CASE, CONSTANT_CASE (less readable)

Used in: Python, Ruby, C/C++ standard libraries, etc.

A bit longer than `camelCase`. It seems to be less "readable" than camelCase according to [this research](https://ieeexplore.ieee.org/abstract/document/5090039), but there are [other researches with different results](https://ieeexplore.ieee.org/abstract/document/5521745) (so take it with a grain of salt)

### kebab-case 🍡

Other names: kebab-case, dash-case, lisp-case, css-case

Variations:

- Train-Case, HTTP-Header-Case
- TRAIN-CASE, COBOL-CASE, SCREAMING-KEBAB-CASE (less readable)

Used in: COBOL, Lisp, Perl 6, CSS, etc.

Issues:

- many language parsers would interpret `-` as infix minus operation, so it is not widely adopted. It is not a problem in Lisp, because subtraction operation looks like this `(- 1 2)`
- an additional problem if `-` is used at the beginning of a word, for example, `-moz-column-count` - Google interprets `-` as `NOT` operation, which makes those identifiers ungoogleable. Use quotes to find them

### Other

I don't consider: flat case (twowords), upper flat case (TWOWORDS), doner|case (two|words). Because they are unreadable.

Sources:

- [What are the different kinds of cases?](https://stackoverflow.com/questions/17326185/what-are-the-different-kinds-of-cases)
- [Multiple-word identifiers](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Multiple-word_identifiers)
- [Special case styles](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles)
- [Naming Conventions](https://devopedia.org/naming-conventions)

## Hungarian notation

In Hungarian notation name contains information about the type, for example, `iCount` means that the variable is of type integer. It comes from Fortran where variables starting with i-n (mnemonics INteger) were considered integers, other variables were floats.

Have you seen `for (i = 0; i < 100; i++)`? This code uses `i`, because of Fortran.

I guess static type systems and [LSP](https://microsoft.github.io/language-server-protocol/) make this notation obsolete, except when type doesn't provide enough information (for example, `money` vs `moneyInDollars`).

## Other interesting conventions

In Ruby and some Lisps predicates (which are boolean values) denoted with the question mark in the end (`number?`). In JavaScript people sometimes use `is` prefix (`isNumber`). The problem with `is` prefix it is easy to miss preceding `!` (negation).

Lisps use `!` in the end of the word to destructive functions. See this [wiki](https://www.cliki.net/naming%20conventions).

Some languages use `_` or `__` at the beginning of a word to denote private variables and non-public APIs (for example, Pony).

Pony uses `?` at the end of the word to denote partial function.

Pony uses the first capital letter (PascalCase) to denote types (and classes, traits, interfaces).

Ruby on Rails uses singular nouns to denote models and plural nouns to denote collections of these models, for example, `Member` and `organization.members`. Also, it is considered a good practice to use verbs for methods (functions).

See also: [Naming cheatsheet](https://github.com/kettanaito/naming-cheatsheet).

## Punctuation-based names

Punctuation-based names, typically used for operators or built-in functions. For example, `...`, `[]`, `>>`, `!==` etc.

Issues:

- It is hard to search on the internet because search engines were built to search natural-language words (it is still possible to find using quotes). To address this issue people build special pages to lookup punctuation based syntax, for example [Operator Lookup](https://www.joshwcomeau.com/operator-lookup/)
- Hard to pronounce - not everybody knows that Ruby programmers call `=>` "hash rocket", JS programmers would call it "fat arrow", Haskell programmers call `:` "cons", etc.
