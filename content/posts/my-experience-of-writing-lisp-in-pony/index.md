---
title: "My experience of writing Lisp in Pony"
date: 2020-12-20T10:03:40+01:00
draft: falses
tags: [lisp, pony, computerscience, til]
series: "Make-A-Lisp in Pony"
---

This is the second part of my reflection on implementing Lisp in Pony (following [Make-A-Lisp](https://github.com/kanaka/mal/blob/master/process/guide.md) tutorial).

I don't have previous experience in Pony. This is an impression of the newcomer. Also keep in mind, that Pony is still being actively developed. They have ambitious ideas, but they are not quite there yet.

## What I like

I like that Pony doesn't afraid to break some programming language "traditions", which leads to cleaner language. (Example of "tradition": `CAR`, `CDR` and `CONS` in Lisp.)

To get a value from an array you would use parenthesis, so it looks like a function call:

```pony
arr(0)?
```

If you think about it, it is indeed a function call you "map" from index to the value in that cell of the array. And this function is partial (marked with `?`), which means that not for every input you will get an output. In contrast, many languages will silently ignore this error and return null (or nil, or none - whatever you call it).

It has nice and concise syntax. It looks like Python, but it isn't indentation sensitive.

It has a pretty big standard library, I didn't get to use a lot of it (because you don't need that many things to build Lisp).

There are union types and "symbols", like in many functional programming languages (I like those) and you can do pattern matching on types.

Overall language works as you expect.

## What was hard

### Refcap

[Reference capabilities](https://tutorial.ponylang.io/reference-capabilities.html) (refcap) is the hardest part. But it is expected, there is the same experience with Rust borrow checker. I didn't get a full grasp of the refcap - I rather learned to workaround (just use `ref` everywhere).

I watched a couple of videos about it and it seemed I understood the idea (it makes sense):

|                               | Deny global read/write aliases | Deny global write aliases | Don’t deny any global aliases |
|-------------------------------|--------------------------------|---------------------------|-------------------------------|
| Deny local read/write aliases | iso                            |                           |                               |
| Deny local write aliases      | trn                            | val                       |                               |
| Don’t deny any local aliases  | ref                            | box                       | tag                           |
|                               | (Mutable)                      | (Immutable)               | (Opaque)                      |

But there are modifiers (`!`, `^`, `this->`), which confuse me a lot. Plus you can have capabilities declared on variables (makes sense), but as well you can have capabilities on functions. I decided to postpone learning refcap because otherwise, I would never finish writing Lisp.

### Compiler error messages

If you make an error in one place, the compiler will complain about errors in many places (understandably because it tries to compare a graph and find all points where types don't fit). As the result, you may have very long error traces. One example:

```pony
interface MallEffectHandler
  fun read_file(file_name: String): String ?

class StandardEffectHandler is MallEffectHandler
  fun read_file(file_name: String) ? =>
```

I made one error - I didn't implement the interface correctly (there is no return type). I think it should complain about only one file here, but it as well reported every case where I tried to use `StandardEffectHandler` in place of `MallEffectHandler`.

### No exceptions

There is `error` function, which is like Go's `panic`, except it doesn't take any arguments, [so you can't provide an error message](https://github.com/ponylang/rfcs/pull/76).

If you need to provide error messages you will need to develop your own mechanism for it. There are several approaches:

1. Store the error in the instance of the class method of which caused it. Example: [parse_report](https://stdlib.ponylang.io/json-JsonDoc/#parse_report) in JSON parser
2. "Either monad" (not a monad, just inspired by it). The idea is to have a disjoint union of successful and error cases `Either[L,R] = (Error[L]|Result[R])`, so you can pattern match and see if it was a success or not
3. Have one instance of a class that you pass around and which would store the error.

After the trial, I settled with the last approach, because others were doing code much harder than it supposes to be.

This is problematic, because language should provide default features, otherwise the community will invent some ways to work around, which would be incompatible with each other.

### No recursive types

There are no recursive types. Instead, I was forced to use classes to workaround. I learned this trick from [Json package](https://stdlib.ponylang.io/json-JsonType/).

It is kind of works, but still, there are limitations. For example, I have `MalList`, which represents a Lisp list, which can contain any Lisp values. But then if I would want to have a List of only `MalSymbol` (to describe a list of function arguments), I can't force it, I will get back into the problem of recursive types. Instead, I am forced to use the array - `Array[MalSymbol]`.

### Decoders

Lisp is a dynamically typed language, but Pony is statically typed. How do I jump from one world to another? Well, there is a couple of ways. If it would less strict type system, like C, I could just do typecasting, which is not an option in Pony (there is `as` operator, but it won't help).

Another way to do it (when you have a more strict type system) is to use something, like [Elm ports](https://guide.elm-lang.org/interop/ports.html) or [io-ts](https://github.com/gcanti/io-ts/blob/master/Decoder.md). This is a way to prove to a static type system, that dynamic data is of the correct type. Unfortunately, Pony type system is not expressive enough to make those decoders composable. By composable I mean I would write one decoder, which would prove that value is `MalSymbol`, then I would write another decoder which would prove that value is an `array`, then I can combine them to prove that value is an array of symbols.

So I end up writing code like this:

```pony
fun ref as_bool(input: MalType): Bool ? =>
  match input
  | let output: Bool => output
  else
    _eh.err("Expected bool instead got " + MalTypeUtils.type_of(input))
    error
  end
```

This function will either return `Bool` or will throw an error, because throwing an error is not considered as type in the return value, for type checker it means it always returns `Bool` value.

But I need a lot of those functions and I need to use them in a lot of places, which is a bit ugly.

### No IDE

There is no IDE for Pony. I configured VSCode with
- syntax highlighting
- remote container - o run Pony compiler in Docker, so I don't need to install it locally and
- ctags - for some code navigation. I still need to configure it to rerun on file save with fswatch

But Pony is a statically typed language, so it can have a much nicer IDE experience, like show inferred types on hover, or show documentation on hover, or jump to definition, better autocompletion (aka IntelliSense).

I guess if they bootstrap Pony it would be possible to reuse parser and type checker to build [language server](https://microsoft.github.io/language-server-protocol/).

### Documentation

There is enough documentation, but it is kind of scattered across several sites. Sometimes it is hard to find what you want, but not impossible. I use those links to find all I need:

- [tutorial](https://tutorial.ponylang.io/)
- [examples](https://github.com/ponylang/ponyc/tree/master/examples)
- [stdlib](https://stdlib.ponylang.org/)
- And source code of stdlib (because it is written in Pony)

## PS

It was a nice experience and in some way, Pony made me write a bit better-organized code because in a less strict language I could as well hack around some things.

The most interesting part would be to actually use actors (and [expose them in a Lisp](http://www.cs.rpi.edu/~govinn/actors.pdf)). Sadly I didn't get to that part yet, because I was focusing to make my Lisp work and I would need to understand better refcap before I can use actors.