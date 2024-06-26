---
title: "Complexity"
date: 2018-12-28T00:00:00+02:00
description: Complexity is the property of the system. The more (unique) parts it has, the more connections there are between parts, the more complex is the system
tags: [programming, beginners]
discuss:
  devto: complexity-5d62
---

**Clarification**: this post is not about computational complexity e.g. big O notation etc.

There are classical works on the subject of complexity:

- Frederick P. Brooks Jr. article "[No Silver Bullet: Essence and Accidents of Software Engineering](http://www.cs.nott.ac.uk/~pszcah/G51ISS/Documents/NoSilverBullet.html)", 1987
- Rich Hickey talk "[Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy)", 2011

Also worth to mention:

- Justin Searls talk "[How to Stop Hating your Test Suite](https://www.youtube.com/watch?v=VD51AkG8EZw)", 2015. It is about testing, but also touches some ideas behind complexity, for example, [rule of product from combinatorics](http://cse.unl.edu/~choueiry/S06-235/files/Combinatorics-HandoutNoNotes.pdf).
- Gerald M. Weinberg book "General Systems Thinking", 1975. Which I haven't read yet, but [I know it talks about complexity (specifically about "Organized complexity")](http://ryanbarringtoncox.github.io/notes/an-introduction-to-general-systems-thinking/).

Complexity is in the heart of software development. A computer is a very complex thing, it has billions of "relays" (in form of transistors). How many details have the most complex mechanical watch? I guess way less.

Computers and computer networks are the most complex things humanity ever build. And software is supposed to work with this complexity. Obviously, we don't write software to directly manipulate all relays, instead, we deal with tower of "abstraction", transistors form logical gates, logical gates form processor, the processor works with machine code, machine code is generated by programmes typically from high-level languages, and the top of the tower are libraries, frameworks, paradigms etc.

We built this tower to hide complexity. You can stay at one level of "abstraction" and if you are lucky you will avoid complexity, but chances are you will face complexity. Have you heard about "divide and conquer", "tight coupling" or encapsulation? They are about managing complexity.

## What is complexity?

> Complex - consisting of many different and connected parts.
>
> -- Oxford Dictionaries

Complexity is the property of the system. The more (unique) parts it has, the more connections there are between parts, the more complex is the system.

Hickey focuses on connections. Indeed the number of (unique) items doesn't matter that much as far as you can take the small group at once into consideration, but if a big number of things connected in a rigid way you need to "drag" all them together, to think about the group, to reason about the group.

Also, Hickey defines the complexity of the part. If something has more than one responsibility, more than one role it is complex. It can be interpreted as if it is more than one thing packed together, therefore it is complex.

### Why complexity is hard?

Hickey distinguishes hard-easy vs complex-simple. Brooks uses "difficult" instead of hard. So why complex systems are hard?

[Miller’s law](https://www.khanacademy.org/test-prep/mcat/social-sciences-practice/social-science-practice-tut/e/miller-s-law--chunking--and-the-capacity-of-working-memory) (it's empirical law), states that people can hold 7 (+/- 2) items in focus. So for example, if experimenter will name some numbers and ask to repeat it in reverse order, people will most likely succeed if there were 7 (+/- 2) items. So our brain can't hold a lot of objects at the time.

To grasp some complex idea you need to "boot it up" in your brain. Often it takes some time and "external" memory (notebook, laptop etc). You know [this comic about focus and how you should not disturb programmers](https://www.monkeyuser.com/2018/focus/). It illustrates the concept of "booting up" a complex idea (system, model).

[![](https://thepracticaldev.s3.amazonaws.com/i/1e5a8mts8rc3ly24g9ap.png)](https://www.monkeyuser.com/2018/focus/)

So the real problem here is that if you will deal with the complex system it will "kill" you in long run. Every time you need to change something, every time you need to explain it (and other people need to learn it), this slow evaluation of complex system will repeat.

### Essential vs accidental complexity

> Following Aristotle, I divide them into _essence_, the difficulties inherent in the nature of software, and _accidents_, those difficulties that today attend its production but are not inherent.
>
> -- Frederick P. Brooks Jr

Brooks talks about "difficulties", not complexity. I consider difficulties to be a wider term, so difficulties of a software production include complexity.

Essential complexity - is the complexity of the problem you are actually trying to solve, it is irreducible unless you agree to change the scope of the initial task.

Accidental complexity - is the complexity added by tools or selected path to solve the problem, they are not initial and can be (in theory) removed without change of the scope of the initial task.

Examples: I need to write a frontend application which does "the thing". "The thing" is essential complexity. The need to configure webpack, babel, suffer from JS fatigue (choose frameworks), argue about semicolon, manually format code (unless there is prettier) are accidental difficulties.

**Important**. It is not always obvious what is essential and what is accidental complexity. People sometimes confuse them and focus on accidental complexity.

Essential and accidental are relative categories, they depend on the context.

If I need to capture some business rules in code, selection of data structure (how to implement record, is it Robin Hood Hashtables or Relativistic Hashtables) and algorithm for it (quicksort or timsort, for example) is accidental complexity. But if I need to write a standard library for the programming language selecting data structures and algorithms is essential complexity.
Selecting data structure is still required at (some) high-level programming language because there is no easy way to automate it yet, but there are [works on this direction](https://blog.acolyer.org/2018/12/14/darwinian-data-structure-selection/).

### Examples of accidental complexity

Essential complexity varies on the task, but accidental complexities repeat from task to task. I guess it is possible to identify a list of "bad habits" in the realm of complexities. I will name some (non-exhaustive list).

**Wrong abstraction**. For example, CSS position model. First attempt: `position`, `flow`, `margin` - hard to describe layout, you need to use CSS hacks, because those primitives are not about the layout. Second attempt: Flexbox - easier to describe layout, because it provides primitives like columns, align etc. Third attempt: Grid Layout - now we are talking about layout. But the complexity of all those solutions is pretty big (big number of configuration). The essential task of the layout is to describe the size of blocks and how space is distributed between. [The solution proposed by Kevin Lynagh is simpler](https://www.deconstructconf.com/2017/kevin-lynagh-choosing-features). People who used "[spacer gif](https://spacergif.org/)" intuitively discovered that the issue is about space distribution.

**Abstraction level breach**. As I mentioned above we use abstraction levels to isolate complexities from each other. And sometimes a breach of abstraction happens - when low-level abstraction sneaks into a higher level. For example, `goto` command, which existed at high-level programming languages until [it was criticized by Dijkstra](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf).

**Legacy** - when we need to work with some old standard, convention approach etc. This is similar to the **wrong abstraction** problem except that it can happen that initial abstraction was ok, it just went beyond its initial purpose (it was "repurposed" in terms of Brooks). And you need to keep it even if it doesn't fit anymore.

### Movement against accidental complexity

Generally, humanity fights accidental complexity so we can dedicate more energy to solve essential complexity. This is why high-level programming languages exist - interaction with the machine using machine codes is tedious and error-prone, so we created programmes (compilers and co) which translate from more readable language to machine code. By doing so we actually increased total complexity, because the complexity of a compiler itself is pretty high. We increased overall complexity to decrease accidental complexity in some contexts (which are high interest for us). Same time this additional artifact (compiler and standards for it) can become a **legacy** eventually. Welp, life is full of trade-offs.

One way or another we took a course to fight accidental complexity, so we can deliver faster and more, so we can solve bigger and bigger problems.

Today we rarely write an algorithm instead we take something ready from the shelf, we rarely implement data structures, we rarely create standards etc (statistically speaking - there are people who do this, but the number is significantly less compared to those who use it). Open source is essential here.

> Nowadays, we do programming by poking.
>
> -- Gerald Jay Sussman

There are things which can be considered as accidental complexity, but still, exist at a higher level only because we haven't figured out how to solve it in a general way. For example:

- manual memory management. We are close to a solution, there are effective GC implementations, for example in Ponylang.
- null issue. We can use maybe monad or [maybe not](https://www.youtube.com/watch?v=YR5WdGrpoug).
- need to choose algorithms and data structure instead of general data types and leave the machine to figure out what is the best implementation for given use-case is.
- parallelism. There are a lot of attempts.

We move in direction higher levels abstractions, to more declarative solutions, to more appropriate abstractions. The convenience of the declarative solution is that we can swap low-level implementation without touching the high level.

The higher we climb this tower of abstraction the higher cost of the wrong abstraction, the more we trapped in legacy. So from time to time regression happens, when we come back to couple levels back and reevaluate best practices.

Interesting effect when people got used to some accidental complexity and can't view it as accidental complexity anymore:

- they believe that it is an appropriate abstraction. If it is hard to understand you just need to learn it harder
- they believe that it is required for performance. This argument was used to protect `goto`, for example
- they believe that true programmers suppose to know it. I guess pointers is a good example here
- they can't believe it can be solved without this accidental complexity. For example, long-standing believe that you need to use manually managed memory to write low-level things, like a database. There is [a database written in Go](https://github.com/cockroachdb/cockroach), to be fair it is not possible to write Memcached in Go, but I believe it is possible with Ponylang.

Even more disturbing is that those people can have a lot of experience and authority, so it takes a lot of effort to change those opinions.

### It is hard to make simple things

It is hard to produce a simple solution, but it is easy to use one. And it is easy to produce a complex solution and hard to use it (sometimes it can be seen as easy to use, but this impression goes away fast).

Examples:

- it took 2 years for Rich Hickey to design Clojure (behind closed doors). Features are added very slowly for what it has been criticized
- Elm adds features very slow
- React appeared 5 years ago (something like this). It didn't have good composable state management. People invented tones of solutions (more than 20 for sure). Only this year they showed hooks and it is not final yet, we still wait for final thing and Cache thing and then it would be possible to build a proper solution based on those abstractions.

This is because it is hard to find proper abstraction, to find proper abstraction you may need to write (and use) 10 wrong ones. It is ok to do errors, as long as you learn from errors and you don't insist that your solution is the right one, its just everybody else needs to learn it.

## How to deal with complexity?

### Where complexity comes from?

Complexity comes from interconnected, tangled, twisted, complected (in terms of Hickey) things. Those connections grow (typically) more than a linear way with the number of items. This can idea can be considered as a derivation of [rule of product from combinatorics](http://cse.unl.edu/~choueiry/S06-235/files/Combinatorics-HandoutNoNotes.pdf).

> **Combinatorics** is the study of collections of objects. Specifically,
> counting objects, arrangement, derangement, etc. of objects along
> with their mathematical properties.
>
> If two events are not mutually exclusive (that is, we do them
> separately), then we apply the **product rule**.

If you add even one thing there is a high chance that complexity will grow by more than one, typically quickly than a linear progression.

![](https://thepracticaldev.s3.amazonaws.com/i/35qsox1c5rfx49d1tltb.png)

So if you about to add one more... param to a function, configuration to an application, one more feature to the project, one more choice for the consumer of your library be aware of the consequences.

### How to manage complexity?

To decrease complexity we can decrease the number of things (nodes in terms of graphs). In practice, this means that we refuse from some features, narrowing down scope etc. This is the only way to decrease complexity, all other methods will help to manage it.

![](https://thepracticaldev.s3.amazonaws.com/i/yowfi1z5hv7kt1tkeupf.png)

To manage complexity we can decrease the number of connections (edges in terms of graphs). In practice, this means that we make more strict isolation, typical examples are "divide and conquer", encapsulation, narrowing down types (decrease cardinality). By isolating and hiding some nodes we make sure that there will be no "unexpected" connections.

![](https://thepracticaldev.s3.amazonaws.com/i/dtwq71w1zws6wyj1nm1q.png)

We can make "connection" weaker, by introduction additional intermediate node. In practice, this means that we introduce some interface or type (with structural subtyping) or instead of direct call we introduce message queue etc. The number of nodes increased (so complexity increased), but the connection is weaker, so we can tear apart graph in subgraphs and reason only about part of it.

![](https://thepracticaldev.s3.amazonaws.com/i/knwfcl7bsfa7e5611va6.png)
