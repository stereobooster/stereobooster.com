---
title: "TypeScript: type vs interface"
date: 2019-07-21T00:34:03+02:00
description: "Let's figure out what the difference between types and interfaces once and for all"
tags: [typescript]
cover_image: thekitze-tweet.png
---

In one of my recent PRs I changed all `interface`s to `type`s because there were already more `type`s than `interface`s. In the review, I was asked to revert the change. I did it, but as well I wondered what the actual difference between `interface` and `type`. Let's figure out this. I use the latest TS (v3.5.1) for examples in this post.

<!--more-->

## Similarities

### Records

```ts
interface IAnimal {
  name: string;
}

type Animal = {
  name: string;
};
```

### Generics

```ts
interface IAnimal<P = string> {
  name: P;
}

type Animal<P = string> = {
  name: P;
};
```

### Intersections

```ts
type Robot = {
  power: number;
};

interface IRobot {
  name: string;
}

interface IRoboAnimal1 extends IAnimal, IRobot {}
interface IRoboAnimal2 extends IAnimal, Robot {}
interface IRoboAnimal3 extends Animal, IRobot {}
interface IRoboAnimal4 extends Animal, Robot {}

type RoboAnimal1 = Animal & Robot;
type RoboAnimal2 = Animal & IRobot;
type RoboAnimal3 = IAnimal & Robot;
type RoboAnimal4 = IAnimal & IRobot;
```

### `implements`

```ts
class Dog implements IAnimal {
  name: string = "good dog";
}

class Cat implements Animal {
  name: string = "Where is my food, human?";
}
```

### Extend classes

```ts
class Control {
  private state: any;
}

interface ISelectableControl extends Control {
  select(): void;
}

type SelectableControl = Control & {
  select: () => void;
};
```

### Functions

```ts
type Bark = (x: Animal) => void;

interface iBark {
  (x: Animal): void;
}
```

and generics:

```ts
type Bark = <P = Animal>(x: P) => void;

interface iBark {
  <P = Animal>(x: P): void;
}
```

### Recursive declarations

```ts
type Tree<P> = {
  node: P;
  leafs: Tree<P>[];
};

interface ITree<P> {
  node: P;
  leafs: ITree<P>[];
}
```

### Exact

```ts
type Close = { a: string };
const x: Close = { a: "a", b: "b", c: "c" };
// Type '{ a: string; b: string; c: string; }' is not assignable to type 'Close'.

interface IClose {
  a: string;
}
const y: IClose = { a: "a", b: "b", c: "c" };
// Type '{ a: string; b: string; c: string; }' is not assignable to type 'IClose'.
```

### Indexable

```ts
type StringRecord = {
  [index: string]: number;
};

interface IStringRecord {
  [index: string]: number;
}
```

## Differences

### Primitive types

You can use only types to alias primitive types

```ts
type NewNumber = number;

interface INewNumber extends number {}
// 'number' only refers to a type, but is being used as a value here.

// this works
interface INewNumber extends Number {}
// but don't forget that 1 instanceof Number === false;
```

### Tuples

You can't declare tuples with interfaces

```ts
type Tuple = [number, number];

interface ITuple {
  0: number;
  1: number;
}

[1, 2, 3] as Tuple; // Conversion of type '[number, number, number]' to type '[number, number]' may be a mistake

[1, 2, 3] as ITuple; // Ok
```

### Disjoint unions

Disjoint unions works only for types:

```ts
type DomesticAnimals = { type: "Dog" } | { type: "Cat" };
```

And you can't use disjoint union types with `extends`

```ts
interface IDomesticAnimals extends DomesticAnimals {}
// An interface can only extend an object type or intersection of object types with statically known members
```

### `new`

You can declare the type of `new`

```ts
interface IClassyAnimal {
  new (name: string);
}
```

it doesn't work as you expect

```ts
class Parrot implements IClassyAnimal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
// Class 'Parrot' incorrectly implements interface 'IClassyAnimal'.
//  Type 'Parrot' provides no match for the signature 'new (name: string): void'.
```

`constructor` doesn't seem to work either

```ts
interface IClassyAnimal {
  constructor(name: string): void;
}

class Parrot implements IClassyAnimal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
// Class 'Parrot' incorrectly implements interface 'IClassyAnimal'.
//  Types of property 'constructor' are incompatible.
//    Type 'Function' is not assignable to type '(name: string) => void'.
//      Type 'Function' provides no match for the signature '(name: string): void'.
```

### Only one declaration per scope

You can declare types only once per scope

```ts
type Once = { a: string };
type Once = { b: string };
// Duplicate identifier 'Once'.
```

you can declare more than once per scope (the final result will be the join of all declarations)

```ts
interface IOnce {
  a: string;
}
interface IOnce {
  b: string;
}
```

### Utility types

Most of the time you would use types instead of interfaces to create utility types, for example:

```ts
export type NonUndefined<A> = A extends undefined ? never : A;
```

## Conclusion

Not all of those things were possible in early versions of TS, so people got used to interfaces. But in the latest version of TS, it seems that types are more capable and we can always use them 🤔. Or I miss something?

There are a lot of nuances in TS - something may work for a small example (which I showed), but broken for big ones. **Please correct me if I missed something.**

[Dedicated to @thekitze](https://twitter.com/thekitze/status/1150793200510148614).
