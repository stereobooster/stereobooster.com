---
title: "Bad, Bad Code!"
date: 2019-08-15T23:53:16+02:00
draft: false
tags: [healthydebate, discuss, programming]
description: "Five reasons why I don't like the idea of bad code."
---

I don't like the concept of "bad code". I thought: ["Let's ask people what they consider to be bad code"](https://dev.to/stereobooster/what-is-bad-code-ndj). I got some responses. (It's hard to say this is a representative sample of opinions, but better than nothing.)

Talking to people in comments of the first post helped me to crystallize my thoughts on what is bothering me in this idea.

<!--more-->

## What is wrong with "bad code" notion?

"Bad code" notion:

- is ambiguous. People have different opinions on what that suppose to mean
- is "blamatory". I guess this is not a word, but you get the idea - when you blame somebody
- is confusing (not descriptive). When somebody says: "This is a bad code", the immediate reaction is: "Can you explain why?"
- is negative. It feels like bad code is taboo and you shall never write it even though there can be valid reasons to do so
- is relative. Most often answer to the question (what is bad code?) was lack of readability. Readability depends on the reader e.g. it is relative

Let's discuss case by case.

## Ambiguous

> [ambiguous](https://www.merriam-webster.com/dictionary/ambiguous) - capable of being understood in two or more possible senses or ways

First of there is no single definition of what is bad code. Every time you mention "bad code" you must provide the definition, otherwise, people can have a different idea of what you are talking.

Ambiguous terms are hard to use in conversations. You need to spend some time to remove confusion.

For example, people considered following to be the definition of bad code:

- Not following specification
- Hard to read, hard to modify, hard to delete
- Poor performance
- Hard to test

## Blamatory

> [Blamatory](https://www.urbandictionary.com/define.php?term=Blamatory) - to be in the act of blaming somebody.

When you declare that code is a bad person who wrote it will feel bad. This is not a way to have a constructive conversation.

There can be reasons why the code is not satisfactory:

- there was pressure, like lack of time, or pressure from management
- the person was new to the subject (and maybe not anymore)
- the person was stressed (maybe not work-related issues)

A better approach would be: "Hey, I have troubles working with this code. Can you explain why this is done this way?" or "Do you want to work together to improve this code?" or "Can we create a ticket for tech debt and describe how we can improve this ticket?".

## Confusing

> [Сonfusing](https://www.merriam-webster.com/dictionary/confusing) - to fail to differentiate from an often similar or related other.

When you declare that code is bad, the author would ask why. And the answer can be because it is hard to read or it is hard to change etc. Why wouldn't you say in the first place?

Instead of "code is bad" you can say "I have troubles reading the code". The second phrase feels different than the first one. First is blaming, second is asking for help. And helping people is in our nature (this is a mechanism created by evolution, to help societies survive. Read about "prisoners dilemma" if you want to know more). Asking for help works much more effective than blaming.

When the request is more precise like "I have troubles reading the code", it can remove confusion. For example, in this case, we can assume two cases, the code is written the way it is hard to read for the whole team and we need to change it, or reader sees this pattern for the first time than we need to educate the reader.

## Negative

> [Negative](https://www.merriam-webster.com/dictionary/negative) - lacking positive qualities.

It is negative and it feels like it lacks all positive quality. In many companies, the IT department is busy with the main business and other departments lack IT attention, for example, tech. support or marketing or BI. As a result, they end up writing software for their need themselves. They simply struggle to do their work and to make it easier they want to automate it. Imagine they wrote something in some arcane language or Excel.

Now some IT person shows up to check what they did. Would this IT person dare to call this code bad? I mean it will be probably not what developer expect, and probably not version controlled. But it helps people do their job, and you (developer) wasn't there to help.

I wouldn't dare to call it bad. If I want to improve the situation I would teach them some basic code hygiene, like version control, writing readme, making reproducible build.

The negativity in the words creates taboo like in some religions you must feel bad about some things. The same way you must feel bad about writing bad code.

You don't have to. Hereby I grant you right to write the bad code, but be aware of the consequences. With great power comes great responsibility.

Examples of valid reasons to write "bad code":

- You write some prototype. You use code to test some hypothesis, for example about UX. Hypothesis check may fail and you can throw out all the code
- You want to trade quality for time. Obviously, you will get tech debt (which can kill a project), but maybe you need to show something quickly to get financial support and you will get time later to pay the tech debt
- you don't know how to write good code and you spent quite some time trying to improve the existing one. In this case, I write down what I don't like about the code and commit it as is. Later (in a day or a week or a month) I come up with the idea and change code pretty fast. Sometimes you need to give time to your brain

## Relative

> [Relative](https://www.merriam-webster.com/dictionary/relative) - not absolute or independent.

Most mentioned definition of bad code was poor readability. Readability depends on the reader, which makes this notion relative.

For example, there is a team of OOP developers, and person which prefers FP joins the team, and write new code FP style. For the rest of the team, it will be hard to read FP code, because they used to OOP-style, for them this is "bad code". But this doesn't make it universally bad code in FP team that code could be perceived as good code.

In this sense notion of bad code is relative, it can change from team to team. It can depend on time - maybe this code worked well previously, but now hardware changed or requirements changed.

## Good code

I'm opposed to the notion of "bad code", because of it's negativeness and poor communication properties, but I'm not opposed to the idea of "good practices" (I prefer good over best), like readability, testability, etc. I guess this is subject for the next article.

## PS

This article is food for thought. I'm not saying you all should follow this as a mantra, just an alternative opinion for you.
