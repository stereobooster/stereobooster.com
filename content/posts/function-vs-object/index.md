---
title: "Function vs Object"
date: 2019-08-27T00:42:33+02:00
series: "fp vs oop"
draft: false
tags: [beginner, explainlikeimfive, computerscience, javascript, function]
descriptpion: "There is an ongoing discussion about the difference between object-oriented programming (OOP) and functional programming (FP). Let's talk about similarities instead. Let's talk about the main building blocks: functions and objects."
discuss:
  devto: function-vs-object-1pe3
---

There is an ongoing discussion about the difference between object-oriented programming (OOP) and functional programming (FP). Let's talk about similarities instead. Let's talk about the main building blocks: functions and objects.



If I won't be lazy this is gonna be a series of posts.

## What is an object?

I tried to find a good definition, but it was harder than I thought a lot of sources talking about what is OOP, but nobody bothers to explain what is an object.

Let's go with [object definition from Java](https://docs.oracle.com/javase/tutorial/java/concepts/object.html), I guess:

> Objects are key to understanding object-oriented technology. Look around right now and you'll find many examples of real-world objects: your dog, your desk, your television set, your bicycle.
>
> Real-world objects share two characteristics: They all have state and behavior. Dogs have state (name, color, breed, hungry) and behavior (barking, fetching, wagging tail). Bicycles also have state (current gear, current pedal cadence, current speed) and behavior (changing gear, changing pedal cadence, applying brakes). Identifying the state and behavior for real-world objects is a great way to begin thinking in terms of object-oriented programming.

Pretty approachable definition. I will rephrase it a bit. The object is a state with a behavior attached to it.

## What is a function?

I wrote 2 posts about it:

- [Introduction: from function to closure](/posts/from-function-to-closure/)
- [Not a Function](/posts/not-a-function/)

Let's go with the simplified definition (in the same vein as the object definition) and say that function is a behavior (for precise definition see links above).

In functional programming, they like to pass functions as values, to be able to do this functions "converted" to closures (converted is not a precise word here, because closure is a function with free variables, but let's go with a simplified view).

What is [closure](/posts/demystify-closures/) (in programming language)?

> Closures are data structures with both a code and a data component.
>
> -- [Closure conversion: How to compile lambda](http://matt.might.net/articles/closure-conversion/)

I will rephrase it a bit. Closure (or function as value) is a behavior with a state attached to it.

## Wait a second 🤔

Compare those 2 definitions again:

- The object is a state with a behavior attached to it
- The closure (or function as value) is a behavior with a state attached to it

Aren't they the same?

### I don't believe it. What is your proof?

Let's write some codes. I will use JavaScript because it supports both paradigms.

```js
class DogClass {
  #name;
  constructor(name) {
    this.#name = name;
  }
  bark() {
    console.log(`${this.#name} is a good dog!`);
  }
}
const belka = new DogClass('Belka');
belka.bark();
```

_Note_: this example uses ["Class field declarations for JavaScript"](https://github.com/tc39/proposal-class-fields#private-fields) proposal to declare private field name. At the moment of posting example works in Chrome.

```js
const DogFunction = (name) => {
  return {
    bark: () => {
      console.log(`${name} is a good dog!`);
    }
  }
}
const strelka = DogFunction('Strelka');
strelka.bark();
```

_Note_: function returns record data structure (which in JS confusingly named "Object", but we don't use any "objecty" feature we use it as a simple key-value data structure). Variable `name` privately stored in the scope of a closure, there is no way to access it outside.

## Not a new idea

If you think about it makes a lot of sense all [computers](/posts/what-is-computer/) deal with state (data) and behavior. This idea was discovered again and again:

Here is how Lamport defines computation:

> There are several ways to define computation. For now, I take the simplest: **a computation is a sequence of steps, which I call a behavior**. There are three common choices for what a step is, leading to **three different kinds of behavior**:
>
> - **Action Behavior**. A step is an action, which is just an element of some set of actions. An action behavior is a sequence of actions.
> - **State Behavior**. A step is a pair `(s, t)` of states, where a state is an element of some set of states. A state behavior is a sequence `s1 → s2 → s3 → · · ·` of states. The step `(si, si+1)` represents a transition from state `si` to state `si+1`.
> - **State-Action Behavior**. A step is a triple `(s, α, ti)`, where `s` and `t` are states and `α` is an action. A state-action behavior is a sequence `s1 -α1→ s2 -α2→ s3 -α3→ · · ·`. The step `(si, αi, si+1)` represents a transition from state `si` to state `si+1` that is performed by action `αi`.
>
> -- [Computation and State Machines](https://lamport.azurewebsites.net/pubs/state-machine.pdf). Leslie Lamport, 19 April 2008

Wirth wrote the book "Algorithms + Data Structures = Programs".

[Ray Toal wrote about types](https://cs.lmu.edu/~ray/notes/types/): A type consists of a set of values and a set of allowable operations.

## PS

The question which we haven't touch is a mutation. In "pure" FP, mutations are not allowed. In OOP they are allowed. When I say pure I mean lambda calculus with lazy evaluation and IO monad, which is a narrow area `¯\_(ツ)_/¯`.