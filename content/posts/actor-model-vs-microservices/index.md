---
title: "Actor model vs Microservices"
date: 2019-10-12T13:29:32+02:00
draft: false
tags: [discuss, programming]
---

This idea happened recently to me: what if microservice is a reinvention of the wheel? What if microservices try to accomplish the same thing as actor model?



### I'm not the first one who asked this question

There is [a similar question on StackExchange](https://softwareengineering.stackexchange.com/questions/338847/what-is-the-difference-between-actor-model-and-microservices). I'm not convinced by given answers.

> Actor model - is a mathematical model for concurrent computations, and microservices - an implementation of service-oriented architecture.

And? There are a lot of things that can be used for computations, for example, [Lambda calculus (formal system in a **logic**), billiard balls, quantum, live cells, Game of life](/content/posts/what-is-computer/index.md). The fact that they are in different categories doesn't prevent to use all of them for computations.

> Again, microservices could be stateful too, but it goes against the design principles of microservices.

Right, but you need to store the information somewhere (accounts, records, users)? If you don't count the database as service itself, the same logic can be applied to the actors.

### What if?

For microservices, you need to use some kind of protocol for communication, like REST, Protocol Buffer, GraphQL, and many more examples. In actor model it is not harder than a function call.

When you deploy microservices it assumes that each microservice is isolated in its machine (virtual machine, jail, docker, etc.), because of this you end up with big number of machines, it is hard and expensive to deploy a lot of machines instead you can deploy virtual machines and to do this you need to use Kubernetes or similar. Where is in actor model you deploy actors to cluster and they can be spread automatically.

When you work with microservices you need to use distributed tracing to debug issues. In actor model you can use "stack trace" (which can be a feature of the programming language itself).

When you develop microservices you start to put everything in separate repositories, but then it's hard to do changes across multiple services, so you put everything in monorepo. It feels like we are walking in circles.

The big difference is that you in microservices you can use different programming languages, but in actor model you need to use one (not counting external interfaces and shell calls).

> Once a programmer becomes used to a complex solution to a problem, simple solutions to the same problem feel incomplete and uncomfortable.
>
> — [Doug Hoyte](https://letoverlambda.com/index.cl/guest/chap2.html)

**Disclaimer**. I'm not referring to any specific implementation of actor model, it's a more idealistic version of actor model. I hope that [pony](https://www.ponylang.io) can come close to what I imagine, but I haven't played with it yet.
