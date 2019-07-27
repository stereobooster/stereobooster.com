---
title: "Advice for the Newbie"
date: 2019-07-25T23:17:47+02:00
draft: false
tags: [beginners, explainlikeimfive, webdev]
discuss:
  devto: advice-for-the-newbie-11oj
---

All advice applies to the beginners in software development if you already seasoned developer I guess you can find your way.

<!--more-->

## Preface

Recently I was at the meetup for the beginners. As introduction round people say their name and what they want to learn today.

Examples of what people want to learn:

- I want to learn something about class diagrams to understand how to do Django backend
- I want to learn Svelte because it's fast
- I'm building my first React application with Next.js

And I was like (internally):

{{< simg src="Jackie-Chan-WTF.jpg" width="500" height="375" alt="Meme with Jackie Chan whos facial expression says WTF">}}

People choose based on hype. People choose based on inexistent problems. People choose overcomplicated solutions. Instead of learning the essential technologies required for solving the task in front of them, they start to learn "best practices" which suppose to solve problems which they don't have.

## What is modern software development?

Let's pause a bit and ask the question: what is modern software development about. I would say that the main task of a developer is to **manage [complexity](/posts/complexity/)**. You take some logic (business rules or some algorithm) and you encode it as a program. To do this you need to understand all aspects of the behavior of the system because the machine can execute only precise commands, so you can't handwavy explain to the computer what you want, you need to be precise.

When you take some handwavy explanation and turn it into precise instructions for a computer you will see that you need more (much more) precise instructions to describe it to a computer than you would use to explain it handwavy.

The bigger the number of instructions, the bigger complexity. As well some rules (requirements) will change over time and you will need to change instructions and make sure that those changes agree with previous instructions.

When we create software we want it to have some unique complex behavior (functionality).

But complexity in software development can easily get out of hand, which would mean that it would be harder and harder to develop software. At some point, it can get so hard that you would be forced to throw away what you have and start from scratch.

Complexity in software is like a salt, you add it a bit and food tastes better, you add a bit more - even better, but then at some point, you will notice that salt start to taste bitter. You need balance here, not too much of it, but no complexity only have programs which do nothing.

So your main task as a developer is to manage complexity. Control that it is not killing your project.

How would you do it? For example, divide and conquer - separate complexity in small buckets, so in case you need it you can throw away the whole bucket without need to rewrite the whole project.

Or, for example, you can remove all non-essential complexity - you need to ask: do we need this tool in our project, do we need this library, do we need this functionality. (Does it spark joy?) If not, then this is not essential complexity, it can be removed without loss.

## Always choose simplicity

Advice is pretty straightforward: always choose simplicity over hype, over performance issue (which you don't have), over advice people who seem to be cool and super smart and use a lot of jargon words.

**Make it work, make it right, make it fast.** In that order.

Complexity always grows over time, so you will have a chance to fight with your monster. Always start with simple solution.

## Focus on essentials

Always choose beginner-friendly tools to learn first, before you will dive in some in advanced stuff.

Look for the following keywords: zero-configuration, convention over configuration, [developer experience (DX)](/posts/evaluating-dx-of-a-programming-language). Don't pay attention to: blazing fast, small bundle size, other hype words.

Choose older more stabile programing language, library, framework, because it would be more polished, more robust, more documented.

When you start to learn you need to learn a lot of things at once, so you want to remove non-essential knowledge from your way, to get to the confidence level where you feel, as you can accomplish something.

For example, to learn web development you need to understand HTML and some CSS, how communication between browser and server works, a bit of JS, git, maybe GitHub, how to do a deployment, some basics of the browser, how to debug (web tools), how to use IDE. It's already a lot. You don't need design patterns, you don't need class diagrams, you don't need GraphQL, you don't need hardcore functional programming. You may want to use framework instead of raw JS/DOM because those APIs are overcomplicated in **my opinion**, and frameworks can hide it to some extent.

## Be aware of accidental complexity in tools

Not all technologies are created equal. Some technologies are created with beginners in mind, with all non-essential (accidental) complexity removed, with small clean APIs, with consistent conventions easy to learn, with good tutorials. And some rather focus on performance or the new hard problem or something else.

Sometimes there is accidental complexity in tools because the tool was first in the field it had some wrong decisions about its API, but now it's too late to change.

**All APIs are created by humans, all humans do mistakes**. So if you find something hard or confusing, there is a chance you face accidental complexity of the tool.

For example, [C.A.R Hoare calls his idea of null reference a billion-dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

## Don't follow mantras

There is a bunch of "best" practices, programming mantras, design patterns, paradigms, principles, etc.

Never follow them blindly. Always ask the question: will this practice make my life easier or not. By adding some practice or tool you most likely will increase complexity, so you need to make sure you get something useful in return.

For example, TDD mantra: you should write tests first. And people who don't do it feel bad. But remember that tests are not essential for your software, the only purpose of tests is to make it easier to do rapid changes to the software. If writing tests is super hard, for example, you don't have stable public API, or you don't have clear specs or specs changes overnight, there is no benefit of tests. You will spend more time writing tests then your code. But if you feel like you need manually test the same thing again and again, it's probably would make sense to spend some time on tests, if you are not alone on the project tests can be useful as well.

Or Don't Repeat Yourself (DRY) mantra. People try to write more dense code, but they introduce some hard to understand entities, or functions, or classes, to remove all repetition. Does it make their life easier? Not at all, they have confusing code. A bit of copy-paste won't kill your code. If you feel like I copy pasting same code 3 or more times, and you have a good name then maybe extract it. Apply DRY in moderation.

## Don't listen to smarties

Don't be fulled by overconfident tone. People under [Dunning-Kruger effect](https://ed.ted.com/lessons/why-incompetent-people-think-they-re-amazing-david-dunning) may sound very confident. If somebody advocates technology and names only pros, but not cons it means that they haven't used it long enough stumble upon tradeoffs. There are always tradeoffs (I haven't seen anything ideal).

Don't be impressed with jargon words and terminology. People who want to help you and know what they talk about would use as less as possible terminology and would be able to explain the terminology they use. If they can't explain they don't know what they talk about. Or they want to feel better than you because they know "smart" words. Either way, don't waste your time here.

## Don't get distracted

You can get distracted by unimportant things, for example, which IDE to choose, or which plugins use, or which font. Who cares? Chose something that works and learn what you want to learn. Tooling is important, but if you spent 4 hours configuring ideal IDE and 1 on actually learning -  something is wrong here.

## Don't pay attention to gatekeepers

There will be people who will say that for example, technology A is shit and you should not use it ever, or that you should follow some mantra, or that that CSS is not programming language (implying that you are not real programmer because you use it). Don't listen to them.

Gatekeepers don't want good for you. They aren't here to spread the truth or ultimate knowledge. They do it only for the sake of gatekeeping itself.
