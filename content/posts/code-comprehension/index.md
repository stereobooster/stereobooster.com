---
title: "Code comprehension"
date: 2020-11-01T23:39:47+01:00
draft: false
series: "Code Comprehension"
tags: [computerscience, codereadability, readability, programming]
---

I have thought that the following characteristics are important for code quality (ordered by priority):

- readability
- correctness
- performance

Note: Yes readability is more important because it would be easy to fix readable, code but it would be harder to change unreadable code.

Recently I realized that code readability is a too narrow term here - code comprehensibility is the better one. Reading is only one of the activities required for understanding the code. Code comprehension includes: reading, navigating in code, debugging, experimenting with code, etc.

If we would think more about code comprehension, we could write more understandable code and build tools for better code comprehension.

Typical questions (which drive the need for code comprehension) are:

- What this code does?
- Why this code doesn't work as expected?
- Where is the code responsible for this behavior or visual appearance?

There are scientific researches on the subject. A lot of them are focused on cognitive processes and use techniques, like MRI and eye-tracking, for example:

[Software Comprehension – A Review & Research Direction; Michael P. O’Brien](https://www.st.cs.uni-saarland.de/edu/empirical-se/2006/PDFs/brien03.pdf):

> Comprehending computer programs is one of the core software engineering activities. Software comprehension is required when a programmer maintains, reuses, migrates, reengineers, or enhances software systems. Due to this, a large amount of research has been carried out, in an attempt to guide and support software engineers in this process.

[Program Comprehension: Past, Present, and Future; Janet Siegmund](https://www.infosun.fim.uni-passau.de/publications/docs/FoSE16.pdf)

> Abstract—Program comprehension is the main activity of software developers. Although there has been substantial research to support the programmer, the high amount of time developers need to understand source code remained constant over thirty years

[brains-on-code](https://brains-on-code.github.io/)

> We conduct behavioral studies and also basic research on program comprehension, including eye-tracking and fMRI studies.

I want to write a series of articles on code comprehension and corresponding tools.
