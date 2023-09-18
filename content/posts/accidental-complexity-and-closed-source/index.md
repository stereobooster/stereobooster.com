---
title: "Accidental complexity and closed source"
date: 2021-01-27T06:21:57+01:00
draft: false
tags: [aws, opensource, watercooler, ruby, rails, complexity]
# series: "Accidental complexity: why do we do it to ourselves?"
---

## Accidental complexity

> All software construction involves essential tasks, the fashioning of the complex conceptual structures that compose the abstract software entity, and accidental tasks, the representation of these abstract entities in programming languages and the mapping of these onto machine languages within space and speed constraints. Most of the big past gains in software productivity have come from removing artificial barriers that have made the accidental tasks inordinately hard, such as severe hardware constraints, awkward programming languages, lack of machine time.
>
> -- [No Silver Bullet — Essence and Accident in Software Engineering](http://faculty.salisbury.edu/~xswang/Research/Papers/SERelated/no-silver-bullet.pdf), Frederick P. Brooks, Jr

Accidental complexity is non-essential tasks, but other tasks we are forced to solve to start solving what we meant to do in the first place.

Brooks continues:

> How much of what software engineers now do is still devoted to the accidental, as opposed to the essential? **Unless it is more than 9/10 of all effort, shrinking all the accidental activities to zero time will not give an order of magnitude improvement**.
> Therefore it appears that the time has come to address the essential parts of the software task, those concerned with fashioning abstract conceptual structures of great complexity. I suggest:
>
> - Exploiting the mass market to avoid constructing what can be bought.
> - Using rapid prototyping as part of a planned iteration in establishing software requirements.
> - Growing software organically, adding more and more function to systems as they are run, used, and tested.
> - Identifying and developing the great conceptual designers of the rising generation.

In 1987 Brooks considered that most of the accidental complexity was resolved and we need to address essential complexity. But is this the case now?

At the same time (in 1980) Hal Abelson and Gerald Jay Sussman started a course at MIT ([6.001](/content/posts/legendary-mit-6.001/index.md)). Later, in 1985, based on this course they wrote a book - Structure and Interpretation of Computer Programs aka SICP aka wizard book.

In 1997 the course was discontinued and here is what Sussman said about it:

> Sussman said that in the 80s and 90s, **engineers built complex systems by combining simple and well-understood parts**. The goal of SICP was to provide the abstraction language for reasoning about such systems.
> Today, this is no longer the case.
> — [Why MIT stopped teaching SICP](https://web.archive.org/web/20160504164044/http://www.posteriorscience.net/?p=206)

So what happened in the period from 1980 to 1997 that changed the picture?

> Sussman pointed out that engineers now routinely write code for complicated hardware that they don’t fully understand (and often can’t understand because of **trade secrecy**.) The same is true at the software level, since programming environments consist of gigantic libraries with enormous functionality. According to Sussman, his students spend most of their time reading manuals for these libraries to figure out how to stitch them together to get a job done. He said that programming today is "More like science. You grab this piece of library and you poke at it. You write programs that poke it and see what it does. And you say, 'Can I tweak it to do the thing I want?'". The "analysis-by-synthesis" view of SICP — where you build a larger system out of smaller, simple parts — became irrelevant. Nowadays, we do programming by poking.

I see two problems:

- we started to solve more complex problems that require more complex software and hardware (essential complexity)
- we need to work with software and hardware for which we don't have source code, so we can rely on documentation (which can be incomplete and imprecise) or on reverse engineering closed systems, what Sussman called "poking". (accidental complexity)

And I want to focus on the second part. We constantly have to deal with closed source systems today, even though we have more open-source software (and hardware) than they had in the 80s.

## My story - AWS API Gateway

This is just a small story - to illustrate what I'm talking about.

Fast forward to the 2020s. Let's say I need to implement an endpoint to download the CSV file. If I would use Rails for it, I can easily finish the task in half of a day.

I searched internet on how to stream CSV file, here are key points:

- `headers["Content-Disposition"] = "attachment; filename=...`,
  `headers["X-Accel-Buffering"] = "no"`, `headers.delete("Content-Length")`
- use `Enumerator` and `self.response_body = ...`
- use `find_each`, which will perform queries to the database in batches

And the task is done. An endpoint can stream big CSV files. **But...**

I also need to deploy this endpoint behind AWS API Gateway:

- It means that I need to provide authorization with "Authenticating Requests (AWS Signature Version 4)". Ok. But if I will provide Authorisation through header it means that I can't use the link directly (`<a href="...">`) I need to use JS to provide headers.
  - Or maybe I can use query params? I found official documentation which says [it is possible to pass params through query params](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html), but this article is about S3 not about API Gateway
- It also means that I need to configure AWS API Gateway to pass through CSV response. Most of the documentation of Gateway talks about JSON (and XML). CSV never mentioned. Can I do it? I have no idea. The only documentation which seems to be related is [this one](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-content-encodings-examples-image-lambda.html). And it doesn't explain much I need to experiment to see if it works.

AWS documentation is bad, but this is because documentations of any big system is bad. The problem here is that if it would be opensource I could at least read the source code.

### The Irony

Recently ElasticSearch changed its license in an attempt to pushback against AWS ([read here](https://www.elastic.co/blog/why-license-change-AWS)).

In response, AWS decided to fork ElasticSearch. And the title of the article where they said it is ["Stepping up for a truly open source Elasticsearch"](https://aws.amazon.com/blogs/opensource/stepping-up-for-a-truly-open-source-elasticsearch/).

AWS, while you at it, maybe you will opensource API Gateway as well? So I could read the source code instead of poking. So I could run it locally instead of waiting for deployments for 15 minutes.

## PS

This is just one story. I'm sure you have a lot of the same stories. Why do we do it to ourselves? Sigh.
