---
title: "Referential vs structural comparison"
date: 2020-12-06T17:54:29+01:00
draft: false
tags: [programming, reference]
---

Comparison of values is one of the basic operations in programming.

```js
a === b;
```

It is easy to compare atomic types, like a number, boolean, strings, symbols (or atoms) - we need to compare their values.

It is a bit harder to compare collections, like lists, arrays (vectors, tuples), hash maps (dictionaries). There are two approaches: referential and structural.

The referential comparison would compare only references (if this the same instance of the object), so two similar data structures would not be equal

```js
{} === {} // false
```

Structural comparison would compare actual contents of the data strcutures:

```js
deepEqual({}, {}); // true
```

But there are two main issues with this approach:

- complexity is `O(n)`
- we need a cycle detection algorithm, otherwise, it would it will overflow the stack (or run infinitely if there is tail call optimization)
- even in this case it is possible to overflow the stack (if we use recursive function)

That is why most programming languages prefer to use referential comparison.

## Cycle detection algorithm

There are many cycle detection algorithms, for example, Floyd's Tortoise and Hare, Brent's algorithm, Gosper's algorithm. But we need more than cycle detection, we need to compare values and the same time compare cycles if they are present. For example:

```js
const a = { test: 1 };
const b = { test: 1 };
const c = { test: 1 };
a.cycle = b;
b.cycle = c;
c.cycle = c;
deepEqual(a, c); // true
```

In this case, the graph would look like this

```text
a → b → c → c → ...
c → c → c → c → ...
            ↑
the same cycle detected
```

Second example

```js
const a = { test: 1 };
const b = { test: 1 };
const c = { test: 1 };
a.cycle = a;
b.cycle = c;
c.cycle = b;
deepEqual(a, c); // true
```

```text
a → b → a → b → ...
c → c → c → c → ...
        ↑
the same cycle detected
```

The most naive version would be to store already visited nodes in the set and check if we are visited them before or not:

```js
function deepEqual(a, b, compared) {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    if (!compared) compared = { a: new Set(), b: new Set() };
    if (compared.a.has(a) && compared.b.has(b)) return true;
    if (!compared.a.has(a)) compared.a.add(a);
    if (!compared.b.has(b)) compared.b.add(b);
    // ...
  }
  // ...
}
```

This will add overhead for complexity and space depending on the implementation.

Set can be implemented as an array - complexity overhead `~O(n²)`, space overhead `O(n)`
Set can be implemented as a hash map - complexity overhead `O(n)~(n²)`, space overhead `~O(n)`. Similar approach described [here](https://cs.stackexchange.com/questions/24118/is-there-an-anti-bloom-filter).

We can try to use Bloom filter or similar approach (see [1](https://arxiv.org/pdf/1902.07353.pdf), [2](https://www.hindawi.com/journals/mpe/2013/516298/), [3](http://www.vldb.org/pvldb/vol13/p197-wang.pdf), [4](https://www.itu.dk/people/pagh/papers/bloom.pdf), [5](https://arxiv.org/pdf/1912.08258.pdf)), but we need to be extra careful because of false positives (which are high for small size, see [6](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=903775), [7](https://blog.cloudflare.com/when-bloom-filters-dont-bloom/)).

There is also [Bloom-like filter with zero false positives](http://lendulet.tmit.bme.hu/lendulet_website/wp-content/papercite-data/pdf/kiss2018bloom.pdf).

## Type system to the rescue

The compiler can use a static type system to detect upfront cyclic structure and use expensive cycle detection only when it's appropriate.

For example, OCaml has special syntax to declare recursive types:

```ocaml
type inttree = Empty | Node of node
    and node = { value: int; left: inttree; right: inttree }
```

## Float

[IEEE 754 - IEEE Standard for Floating-Point Arithmetic] is the gift that keeps giving.

There is `NaN`:

```js
NaN === NaN // false
```

`-0` and `+0` are distinct values, though they both compare as equal.

```js
+0 === -0 // true
Object.is(+0, -0) // false, JS strikes again
```

## Functions

How to compare functions (aka lambdas) structurally? We can compare AST (without comments) if we would rename variables using [de Bruijn indices](https://blog.jez.io/variables-and-binding/). It means that we need to keep AST available at runtime. Function's AST can have cycles as well (recursive functions). In [unison](https://www.unisonweb.org/) that would be easy, because each function has a unique id.

But then there are closures, which means we would need to compare bounded variables as well.

## That is why we can't have nice things

Structural comparison is more natural for humans, but it can be quite tricky to implement, that is why we stack with references (at least for now).