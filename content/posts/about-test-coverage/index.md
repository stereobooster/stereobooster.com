---
title: "About test coverage"
date: 2024-08-05T12:11:43+02:00
draft: false
tags: []
warning: "**Warning!**: I need to re-write this blog post. I did a bit [more reserach](https://github.com/stereobooster/test-coverage-calculation) and changed my opinion slightly."
---

## What is test coverage?

Test coverage shows how much of your code is being executed during tests run. But what does it mean "how much of code"? How dooes one measure it? There are options:

- lines (lines of code or LoC)
- statements
- functions
- branches

For example,

```js
// comment

export function comp(a, b) {
  if (a === b) {
    return 0;
  } else if (a > b) {
    return 1;
  } else {
    return -1;
  }
}
```

this code contains

- 11 lines, if you count empty lines and comments. Tool that I use (`coverage-v8`) counts them
- 11 statements, if you count empty lines and comments. Tool that I use (`coverage-v8`) counts them
- 1 function
- 3 branches

Now if we have following test:

```js
test("compares", () => {
  expect(comp(1, 1)).toBe(0);
  expect(comp(1, 0)).toBe(1);
});
```

Test coverage would say that we covered

- 9 out of 11 lines. Some tools may say 10 out of 11
- 9 out of 11 statementes. Some tools may say 10 out of 11
- 1 out of 1 functions
- 2 out of 3 branches

## How it works?

There are different options. I will give one example how it can be done to demonstrate the idea. One way to do it is so called "instrumentation". Before runing tests, test-coverage-tool parses source code and puts counters (or functions with counter) for each line, statement, function or branch. Something like this:

```js
let f1 = 0,
  b1 = 0,
  b2 = 0,
  b3 = 0;
// comment

export function comp(a, b) {
  f1++;
  if (a === b) {
    b1++;
    return 0;
  } else if (a > b) {
    b2++;
    return 1;
  } else {
    b3++;
    return -1;
  }
}
```

After test execution test-coverage-tool collects data from counters and makes a report.

## Does 100% test coverage guarantees that there are no bugs?

No. The same way as tests - test only show absence of known bugs. Some examples:

### Input

Some bugs can be observed only for specific input, for example

```js
export function serialize(x) {
  return encodeURI(x);
}
```

and test

```js
test("serialize", () => {
  expect(serialize("a")).toBe("a");
  expect(serialize(" ")).toBe("%20");
});
```

This will give us 100% coverage (by all metrics). But if we provide string `"\uD800"` as input it will throw an exception (which can result in a bug).

### Imported modules

Test coverage tools (typically) only show coverage of own code. It doesn't show how much of code inside imported modules are not covered.

## Make sure to understand what you count

### Comments and empty lines

In the first example, I showed that it counts (in my case) empty lines and comments. So lines and statements coverage is `81.81%` (9/11). If I would delete empty lines and comments - test coverage will drop to `77.77%` (7/9), even so I didn't change neither the (executable) code nor tests.

### Lines and statements

Even if we ignore empty lines and comments. Lines and branches is not a very good metric.

If I would rewrite code like this:

```js
export function comp(a, b) {
  if (a === b) return 0;
  else if (a > b) return 1;
  else return -1;
}
```

Coverage would rise to `85.71%` (6/7).

If I would rewrite code like this:

```js
export function comp(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}
```

Coverage would rise to `100%` (for all metrics except branches). Even so the logic behind the code is the same and tests are the same.

### How branches counted

(This seems like a bug in my specific tool, but make sure to check your tool as well).

If I would add one more test:

```js
expect(comp(0, 1)).toBe(-1);
```

It shows 4 out of 4 branches covered (before it was 2 out of 3). If there was one more uncovered branch, in a different place, numbers would be - before 2/4 (50%), after 4/5 (80%). So it increases by 30%, but actually it suppose to increase only by 25%.

If I change code to:

```js
export function comp(a, b) {
  if (a === b) {
    return 0;
  } else if (a > b) {
    return 1;
  }
  return -1;
}
```

It shows 5 out of 5 branches. Even so code is the same - jumps in counter are unexpected.

## Real-life example

I took real life code ([left-pad](https://github.com/left-pad/left-pad)), which has 100% coverage to show that it still may have bugs.

**Important**: I do **not** mean to assault authors. I don't think I'm better programmer. This was just the first good example I found.

**Related**: [Let's Prove Leftpad](https://www.hillelwayne.com/post/lpl/).

### More realistic bugs

It doesn't work with multibyte characters

```js
expect(leftPad("x", 2)).toEqual(" x");
// but
expect(leftPad("😭", 2)).toEqual("😭");
```

It is possible to trigger exception (for example if that number comes from the user input)

```js
expect(() => leftPad("foobar", Number.MAX_SAFE_INTEGER)).toThrowError(
  "Invalid string length"
);
```

### Less realistic bugs

Those are less realistic examples - just me being nitpicky.

Function doesn't make sense with rational numbers, but it kind of works as if it takes integer part of a number. Except for cases when it needs to add from 1 to 9 spaces:

```js
expect(leftPad("foobar", 16.1, 0)).toEqual("0000000000foobar");
expect(leftPad("foobar", 7.1, 0)).toEqual("0foobar");

expect(leftPad("foobar", 16.1, " ")).toEqual("          foobar");
// but
expect(leftPad("foobar", 7.1, " ")).toEqual("undefinedfoobar");
```

If you use TypeScript it would not allow to use `BigInt`.

```ts
declare function leftPad(
  str: string | number,
  len: number,
  ch?: string | number
): string;
```

But if you don't, than there are some surprises. BigInt 0 behaves differently compared to Float 0:

```js
expect(leftPad("foobar", 7, 0)).toEqual("0foobar");
// but
expect(leftPad("foobar", 7, BigInt(0))).toEqual(" foobar");
```

One can't use BigInt as the second argument:

```js
expect(() => leftPad("foobar", BigInt(0))).toThrowError(
  "Cannot mix BigInt and other types, use explicit conversions"
);
```

## PS

I'm **not** saying that you should stop using test-coverage. I'm saying - make sure you understand what it is and what it is not.

Other tools that may help:

- Type checker (TypeScript in case of JavaScript)
- Type coverage tool for gradual-typed system ([type-coverage](https://github.com/plantain-00/type-coverage) in case of TypeScript). Same as test-coverage, but for types
- Property testing (for example, [fast-check](https://github.com/dubzzz/fast-check) in case of JavaScript)
- Mutation testing (for example, [stryker](https://github.com/stryker-mutator/stryker-js) in case of JavaScript)
- Fuzz testing or fuzzing
