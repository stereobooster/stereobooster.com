---
title: "Educational Programming Languages"
date: 2018-12-02T00:00:00+02:00
description: Let's talk about programming languages which were designed specifically for education. Logo, Pascal, Scheme, SmallTalk
tags: [programming-language, programming, education]
series: Computer Science education
cover_image: educational-programming-languages.jpg
discuss:
  devto: educational-programming-language-2155
---

Let's talk about programming languages which were designed specifically for education.
This is an overview, not a deep dive - I will talk about some aspects briefly and, maybe, will write more in separate posts.

<!--more-->

## Logo, 1967

[The Logo, a dialect of Lisp, was designed as a tool for learning.  Seymour Papert et al. created the first version of Logo in 1967](http://el.media.mit.edu/logo-foundation/what_is_logo/history.html). The logo is one of the first works in direction of constructionism.

*Side note*: ConstructioNism is educational theory invented by Papert, it is the development of Jean Piaget idea called ConstructiVism. Papert worked with Piaget in Geneva. There are similar ideas: Piaget Constructivism, Vygotsky Social Constructivism. I will give a hand-wavy explanation here, not necessarily the fully correct one.

Key Idea is that knowledge is constructed by each learner, and it happens when learner actively interacts with some subject and explore it thyself. So all teacher attempts to pass knowledge by explaining or by forcing to learn some definitions by-heart are ineffective. Learning is happening when pupil willing to learn and teachers task is to create an environment which allows the pupil to experiment, interact with the subject and build their own knowledge.

![](https://thepracticaldev.s3.amazonaws.com/i/g349114cjuduxqig6btn.png)

The most popular Logo environments have involved the Turtle, which learner can control, by providing a series of instructions, aka algorithm. This way learner can experiment and see how Turtle response to different algorithms.

Logo provides clear error messages, which additionally lowers barrier for the learner.

The Logo will do:

```
fowad
I don't know how to fowad
```

Where LISP would do something like this (depends on dialect):

```lisp
(fowad)
fowad: undefined;
cannot reference an identifier before its definition
```

The learner can execute commands one by one in REPL, they don't need to write all program at once.

The Logo uses dynamic type system with implicit coercions,  for example, strings can be automatically converted to numbers, which lowers barrier for kids, but as we know it can bite you back, if used a lot in big languages, like JavaSctipt or PHP.

The Logo uses a small number of special symbols, so its text looks like natural language, which also supposes to lower barrier.

**Key features**: interactivity (inherited from LISP), friendly error messages, designed specifically with lower entrance barrier
**Key paradigms**: imperative (learner gives direct orders), procedural, dynamically typed with coercion
**Age**: Preschool, School

### Further development

In '90s Logo idea was extended with physical devices. The project was called [Lego-Logo](https://web.archive.org/web/20160802205923/http://ucls.uchicago.edu/students/projects/1994-95/Lego-Logo/ProjectDescription.html). It was possible to control real-world "robo"-turtle with Logo instructions.

### Scratch, 2002

{{< youtube tEWFDJSmWcw >}}

In '2010s Papert's idea got new life - programming language Scratch was invented. It utilizes the same ideas as Logo with some additions.

It uses **visual blocks** instead of text to represent code instructions, which lowers barrier, even more, there is no way to do syntax error - wrong blocks will not fit together.

It uses **event-driven** paradigm, to handle interactivity. I guess, this feature already existed in Lego-Logo. Using events pupils can create games, quizzes or make robots respond to actions.

Lego-Logo project seems to die, but there is a modern alternative - [Scratch + Arduino](http://s4a.cat/).

See also: [Scratch 3.0 by MIT](https://beta.scratch.mit.edu/), [Introductory computing curriculum using Scratch by Harvard](http://scratched.gse.harvard.edu/guide/)

A potentially interesting idea is to be able to switch between block representation and textual representation, similar to what they do in [Luna-Lang](https://www.luna-lang.org/).

## Pascal, 1970

In 1970 N. Wirth published Pascal language, it was a variation of Algol X, basically, it contained all Wirth's ideas which wasn't accepted for Algol.

*Side note*: Wirth was on the committee of Algol 68 along with Edsger Dijkstra, Tony Hoare, Peter Landin, John McCarthy, and others.

In 1976 N. Wirth wrote a book "Algorithms + Data Structures = Programs", which covered: Fundamental Data Structures, Sorting,  Recursive Algorithms, Dynamic Information Structures, Language Structures and Compilers. In the last part, he showed how to implement mini Pascal-like language compiler in  400 lines of code.

It is the only one language in this article with the static type system. Static type system seems to create a higher entry barrier - you need to declare the type of objects, you can mix objects of different types, you need to introduce sets to reason about types etc. Pascal on the other side has very straightforward and to some extent limited type system, for what it was criticized by Kernighan.

**Key paradigms**: imperative, structured, procedural, static type system.
**Age**: School, College

### Further development

Here is a small genealogical tree of Pascal:

```ascii
Pascal → Modula → Modula-2 → Modula-3
   |               ↳ Oberon → Oberon-2
   ↳ Objective Pascal → Delphi
```

As far as I know, Pascal not widely used in education nowadays.

In some sense Go can be considered as the successor of Pascal.

> Go is mostly in the C family (basic syntax), with **significant input from the Pascal/Modula/Oberon family** (declarations, packages), plus some ideas from languages inspired by Tony Hoare's CSP, such as Newsqueak and Limbo (concurrency).
> — [Go FAQ](https://golang.org/doc/faq)

It has a simple static system and receives similar to Kernighan critiques. Pascal was criticized because it didn't support varied length strings, Go criticized for the absence of the polymorphism.

## Scheme, 1975

[Scheme is a dialect of Lisp created by Gerald Jay Sussman, Guy L. Steele Jr in the '70s](https://web.archive.org/web/20060615225746/http://www.brics.dk/~hosc/local/HOSC-11-4-pp399-404.pdf).

They basically "rediscovered" Lambda calculus - when in 1958 McCarthy created LISP, he heard about Lambda calculus, but haven't studied it. But Sussman and Steele saw the potential of Lambda and made changes to the language required to make it work, this way they opened the door from theory to practice.

*Side note*: Seymour Papert was Doctoral Advisor of Sussman.
*Side note 2*: one of the research subjects for which they developed Scheme was [the Actor Model developed by Carl Hewitt](https://www.youtube.com/watch?v=7erJ1DV_Tlo) inspired by the idea of cells from SmallTalk.

In 1985 Harold Abelson, Gerald Jay Sussman, Julie Sussman published a book "Structure and Interpretation of Computer Programs", which is basically a curriculum MIT 6.001.

Here is 1 lecture of MIT 6.001 and my favorite quote from it:

{% youtube 2Op3QLzMgSY %}

> Computer science is a terrible name for this business. First of all, it’s not a science. It might be engineering or it might be art, but we’ll actually see that computer so-called science actually has a lot in common with magic… So it’s not a science. It’s also not really very much about computers. And it’s not about computers in the same sense that physics is not really about particle accelerators, and biology is not really about microscopes and petri dishes. And it’s not about computers in the same sense that geometry is not really about using surveying instruments.
>
> — Hal Abelson

**Key features**: interactivity (again LISP), a minimal core which allows building more complex concepts from scratch (that is why there are so much DSLs in Lisp)
**Key paradigms**: mainly functional, but the imperative style is possible, dynamically typed
**Age**: College. I guess with some improvements barrier can be lowered.

### Further development

Scheme (and other Lisp dialects) are still widely used in industry (for example, Clojure) and education (for example, Racket), but legendary 6.001 was deprecated in favor of 6.00 (Python), 6.01, and 6.02 in the new curriculum.

> Sussman pointed out that engineers now routinely write code for complicated hardware that they don’t fully understand (and often can’t understand because of trade secrecy.) The same is true at the software level, since programming environments consist of gigantic libraries with enormous functionality. According to Sussman, his students spend most of their time reading manuals for these libraries to figure out how to stitch them together to get a job done. He said that programming today is “More like science. You grab this piece of library and you poke at it. You write programs that poke it and see what it does. And you say, ‘Can I tweak it to do the thing I want?'”. The “analysis-by-synthesis” view of SICP — where you build a larger system out of smaller, simple parts — became irrelevant. Nowadays, we do programming by poking.
> — [Why MIT stopped teaching SICP](https://web.archive.org/web/20160504164044/http://www.posteriorscience.net/?p=206)

## SmallTalk, 1980

SmallTalk was publicly released in 1980, but it's development started much earlier.

In 1968 Alan Kay heard the speech of Marvin Minsky about modern education and ideas of Piaget and Papert. Also, Kay had been in the Papert/Minsky lab and saw Logo language in action.

In 1972 Alan Kay published the paper ["A personal computer for children of all ages"](https://www.mprove.de/diplom/gui/Kay72a.pdf) (aka Dynabook). Some sources say that he had this idea as early as 1968, but in this case, I want to remind that one of the first prototypes of tablet computers was shown in "2001: A Space Odyssey" (1968).

Kay wanted to create a language so simple that children can work with it. This language supposes to accompany Dynabook. In the same year, he wrote the first prototype of SmallTalk (SmallTalk-72), which took ideas from Simula, LOGO, LISP, FLEX and his previous work.

They made some experiments with children and untrained adults. The experiment showed that people easily accomplished simple tasks but got stuck on more complicated tasks, and was not able to unstack even after they saw the solution.

They thought maybe inheritance can be used for simplification - experts would write solution for complex problems and users can reuse it through inheritance. But it turns out this is also confusing concept.

While the initial purpose was to develop a programming language for children, in the process Alan Kay and his lab invented the concept of "pure" OOP.  Alan Kay coined term Object-Oriented Programming and 6 basic principles of OOP style like everything is an object and objects communicate via messages (this was inspired by biological cells and computers in the network).

*Side note*: there are some controversial opinions on who invented OOP and what OOP is about. Some think that Simula is the first OOP language, but it was a more procedural language with objects and the closest ancestor is C++, which is supposed to be better C. I believe there are two distinctive "schools" of OOP, but this subject is for a separate article. Kay's OOP is closer to the actor model (which it inspired).

They were able to construct working prototypes of the personal computer and effective language for it, but they seem to lose the initial idea of language for education. Kay tried to "reset" it back in 1976.

In 1979 Jobs saw what they did and was pretty impressed, but in 1980 Xerox decided to close the research. And researchers decided to release SmallTalk to the public.

Even SmallTalk was intended for children it seems never accomplished the initial purpose. This text is my interpretation of [original Alan Kay's article](http://worrydream.com/EarlyHistoryOfSmalltalk), don't take my word on it - read the original.

**Key paradigms**: OOP, dynamic type system

### Further development

Because of the complex licensing, SmallTalk didn't hit the mainstream (at least not that much as C, C++, Java). Later open implementation appeared, like Squeak and Pharo. As far as I know, the most popular ancestor (at least by spirit) is Ruby. It is used for education a bit, for example [Hello Ruby](https://www.helloruby.com/meetruby) and [Hackety Hack](https://web.archive.org/web/20160902010851/http://www.hackety.com:80/).

Later, in 2005, Alan Kay and Seymour Papert resurrected the idea of Dynabook and took part in project **One Laptop per Child (OLPC)** - it is a low-end device, for poor countries where most people don't have access to computers.

## Afterwords

If you want to know more about key people in CS education you can read [Outstanding Contribution to Computer Science Education](https://sigcse.org/sigcse/programs/awards/outstanding). Niklaus Wirth, Harold (Hal) Abelson and Alan Kay are in the list.

I would also mention Bret Victor, who is a big inspiration for a lot of developers. Amongst other ideas, he also has some for education, like [learnable programming](http://worrydream.com/#!/LearnableProgramming) and [Inventing on Principle](https://jamesclear.com/great-speeches/inventing-on-principle-by-bret-victor).

I believe that computer literacy should be taught the same way as we teach kids to read, write and to do the math. And those kids can become programmers if they want, to fulfill ["next blue collar job"](https://dev.to/stereobooster/developer-is-the-next-blue-collar-job-269b) demand.

It is nice to say that original Papert and Kay ideas are here. Latest OLPC is a tablet with a touchscreen and sun battery and it can run Scratch. But there are still a lot of unsolved questions, for example, Scratch teaches imperative programming and as soon as a child will start to learn the functional paradigm, the teacher will say that old schemas are bad, like assignments, mutations, for loops etc. And this is wrong as if they would teach you to prose for the first three years and later introduced poetry and explained that prose sucks. Instead, we should teach what is computation and that computation can be done in different ways and you need to choose an approach depending on the task.

The last note: I'm talking about programming languages designed for education, this is not the same as languages designed or used for research. Python widely used for research, specifically in data science. Haskell and ML-family languages widely used for CS research.


