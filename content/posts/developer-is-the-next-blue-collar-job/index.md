---
date: 2018-10-21T00:00:00+02:00
title: Developer is the next blue collar job
published: true
description: People who generally do not have a college education, and go straight into a physical, or modest working-class job after high school.
tags: [career, discuss]
cover: blue-collar.jpg
discuss:
  devto: developer-is-the-next-blue-collar-job-269b
---

> **Blue collar** - people who generally do not have a college education, and go straight into a physical, or modest working-class job after high school.
>
> [urban dictionary](https://www.urbandictionary.com/define.php?term=blue%20collar)

Blue collars sometimes defined as low skill job, often a manual labor. I would define it a bit another way - it is job which requires low training (at least up front), so people who can not afford university go to this job, or people who get into complicated situation or lost their previous job, basically when you tight on the budget and you need money right now, and you need to start now or ASAP and you don't have time, or better say privilege, to spent 5 years in university.

_Side note_: there is [an article with similar title](https://www.wired.com/2017/02/programming-is-the-new-blue-collar-job/) by Wired, I found it after I started to write mine.

## Demand

Everybody needs a website today or do some basic business intelligence (even if it is done with Excel) or do some email delivery to the clients. There are, for sure, PaaS solutions, but sometimes it is not enough and companies hire tech-savvy people to manage all those things, which may not even appear as a programming in first place.

A number of tech companies are growing, there are tech companies whose clients other tech companies - that is how big the market is. From what I can see the demand for developers (also QAs, designers, UX experts) is growing every day.

Same time other professions are on the way to extinction, especially monotonic manual labor which is being slowly replaced by robots, drones, and automation.

It would be nice to open development for a wider audience, but to do this we need to change some practices in the industry.

## Education

Does the software developer need a university degree? It depends. If developers are responsible for some critical system, then yes they need to study some math and formal methods, because the price of the bug can be [a life](http://users.csc.calpoly.edu/~jdalbey/SWE/Papers/THERAC25.html), [a very expensive rocket](http://www-users.math.umn.edu/~arnold/disasters/ariane.html), [a lot of money](https://dealbook.nytimes.com/2012/08/02/knight-capital-says-trading-mishap-cost-it-440-million/) etc.

But if a developer needs to do Wordpress theme, I don't think they need to spend 5 years in university, 1/2 year in coding bootcamp will be enough (10 times less). Don't get me wrong it doesn't mean that Wordpress theme isn't a "real programming" (it is), or it is not cool (it can be). It just needs a bit different skill set, visual design will be more useful than mathematical statistics. And you can start with less knowledge upfront and learn while you are working.

Don't take this argument as if consider education bad or redundant - if you have time and money and ability, go ahead and learn all the things. Knowledge is a virtue.

It would be nice to have programming as school discipline, the same way as reading, writing, and arithmetics.

On the other side, you can learn at university some combinatorial math and other computer sciences. Then you graduate, try to find a job and it appears that companies are looking for PHP or Rails or React developers or other technology that didn't even exist when you studied. They didn't teach me web a11y, or graphical design basics, which would be useful for my web developer career.

For sure there are companies which are looking for theoretical knowledge (like computer science) rather than practical skills (like React), but I guess there are less of them and it is harder to get in.

## Interviews

Interviews are a mess.

They ask computer science questions, like build LRU cache or what is the `O(N)`, but hire for frontend developer position to move pixels on the screen (no disrespect, I'm front-end developer myself).

They ask to solve some puzzles on the Interview, but you end up working with requirements, which is not about puzzle solving, but rather about a patience, and communication.

So many times I was hired for one position, but end up doing something different, for example, I was hired as backend Ruby developer, but later switched to frontend as React developer.

I "like" when position lists all technologies ever used by company, and it is expected that you would know every one of it, like frontend position, but it lists as a "nice to have": kubernetes, java spring boot, Kafka, MongoDB, Angular 1 and obviously you need to know all React RFCs which Dan Abramov showed yesterday in a conference.

## Gatekeepers

Gatekeeping is wrong on so many levels, I even not sure where to start.

In some countries, developers are getting 10-100 times more than any other profession. For those people, developer position is a ticket for a new life. They can feed the whole family for one salary.

Should they be stopped by the fact, that "if you do not feel like you are painting when coding you are not a real developer"? No. Do your thing, don't pay attention to gatekeepers.

The software developer is one of the professions which allows working remotely. This can be so helpful for single parents or people who need to take care of someone with a disability.

Nobody should take away this opportunity from people. Shaming people because "they use 1000s of npm modules to deliver simple website" is inappropriate. This is not their guilt, this is a problem of the platform, of the tools. Give people better tools, give people accessible education (without the steep curve).

## Ergonomics

We can not do tools the old way anymore. (By tools I mean programming languages, platforms, libraries, frameworks etc.) We need to start thinking about ergonomics upfront.

Before programming was a profession for some, now it includes hundreds of thousands of people. Each "hiccup" in the flow will cost 1000s of work-hours (even if it is 5 min per person).

- Error messages should be clear, like in Elm
- Frameworks and languages should provide [codemods](https://github.com/facebook/codemod) and upgrade path, like Ember.js
- Languages should come with package and version manager, like rbenv and bundler
- Choose convention over configuration, like Rails and Create React App
- Languages should come with formatter, like gofmt or prettier
- Languages should not include footguns, for example, prefer GC over manual memory management
- Languages with footguns should include linters to warn against tricky parts of the language
- Languages  should come with static analyzers to prevent bugs at runtime, like advanced type systems or borrow checkers
- All tools, like test runner, static analyzer, compiler or transpiler should have watch mode
- All tools should have a short time to re-run, like OCaml and go compilers
- There should be official starter projects and easy way to set up a development environment, maybe with [docker](https://github.com/JanitorTechnology/dockerfiles) or with one simple command

_Side note_: if you about to argue that it is not possible to write real-time programs in GCed languages, it is not true with the latest research, for example, Pony have non-stop garbage collector it combines actor model (like Erlang) and borrow-checker (similar to Rust).

Platforms should be designed without a steep learning curve, it should be easy to start and possibly learn on the go. Everything should be sandboxed and secure by default. It supposes to be hard to do the wrong thing.

## Unions

A number of workers in the industry grow every day. More and more people with different backgrounds, more and more vulnerable people - people with a desperate need for money or people from minorities. Those people not always have powers to stand against companies, to get their rights protected. They need protection - unions.

Unions could help to fight against [unethical](https://www.nytimes.com/2018/08/01/technology/china-google-censored-search-engine.html) [decisions](https://www.nytimes.com/2018/04/04/technology/google-letter-ceo-pentagon-project.html) of companies.

By looking on those arguments at twitter about frameworks or where to put semicolon I hardly can imagine programmers joining unions, but who knows.

> Photo by Randy Fath on Unsplash
