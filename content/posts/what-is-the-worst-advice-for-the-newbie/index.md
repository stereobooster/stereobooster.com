---
title: "What is the worst advice for the newbie?"
date: 2019-08-01T00:32:11+02:00
draft: false
tags: [beginners, discuss, career, webdev]
discuss:
  devto: what-is-the-worst-advice-for-the-newbie-4bg2
---

Today I was at the meetup for the newbies. (Again. After the previous time, I wrote [Advice for the Newbie](https://stereobooster.com/posts/advice-for-the-newbie/).) And this meetup inspired me to write this article.

## Use TextEdit

I talked to one person who got the following advice: to learn CSS and HTML use [TextEdit](https://support.apple.com/en-za/guide/textedit/welcome/mac) (or another plain text editor). Supposedly you will learn syntax this way faster. Adviser thinks that using modern code editor (like code or sublime) will make learning slower.

What awful advice. It is so hard to write code without highlighting, without editor which can highlight matching brackets, which automatically indent cursor when you go to the next line. It would be such a waste of time for a newbie. Even more modern editor often has syntax checker built it in, so instead of writing something, saving the file, reload the browser you would see errors right in the editor.

Why would you spend time on something that machines can do and can do much faster? Machines can check syntax, fix formatting automatically.

You **need to understand syntax to write programs**, but there is no reason to refuse help from the machine.

## Learn Python (to learn JS)

One person asked what is the **best way to learn JavaScript**. And the advice was to learn Python. Wait, what? So the reasoning is following, JS is very confusing (I agree), and Python less confusing, so if you learn basics in Python you can switch to JS.

The intention is nice, but the advice is awful. A newbie will spend time learning Python, and then will switch to JS and will find it even more confusing than before learning Python, because eloquent Python is a bit different from eloquent JS. In JS you have an event loop, and async/await and awful coercion rules, which you should avoid as plague.

The better advice would be: learn JS but learn the best parts of it e.g. avoid coercions with triple equality, use `let`/`const` to avoid problems with scoping (`var`), use arrow functions to avoid problems with `this`, etc.

Maybe there is ESLint config with good practices, like [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app), but not React specific.

Don't get me wrong **Python as a language is ok**, if you want to learn Python please do, but recommend to learn Python to understand JS...

## Learn webpack

The person asked how to **get started with modern web development**. And the advice was: sit down and write web pack config from scratch, so you would understand who bundler works and then you can write website.

Webpack is nice, but it is a very complex tool. It has so much accidental complexity exposed to end-user. Error messages are confusing. Version migrations are hard. Documentation sometimes missing. It would be so hard to learn for the newbie. I think the person will give up before they accomplish something.

Why would you do this as the first step? You can use Parcel, which doesn't require configuration - there is nothing to learn (almost nothing). Or you can use create-react-app, which hides webpack.

**Webpack as the software is ok**, but it is very hard for the newbie and not needed, because you can start with other tools and learn webpack later.

## What is the worst advice for the newbie?

Share your examples of bad advice (at dev.to or twitter).
