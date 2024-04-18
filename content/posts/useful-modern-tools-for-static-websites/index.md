---
title: "Useful modern tools for static websites"
date: 2023-09-26T17:50:02+02:00
draft: false
tags: ["hugo", "blog", "webdev"]
---

This list is about tools beyond [static hosting](https://www.staticwebsitehosting.org/) and [static website generators](https://jamstack.org/generators/). There are already enough list about that.

## Analytics

In old times there was basically one default choice: Google analytics. What is bad about GA:

- JS size (about 49kb). There alternative clients though, like this [one](https://github.com/lukeed/ganalytics)
- Blocked by default by some browsers and adblockers
- no GDPR compliance (e.g. you always need to provide cookies banner)

But there are a lot of better alternatives (just to name few):

- [tinyanalytics](https://tinyanalytics.io/) - 1 site for free
- [umami](https://umami.is/) - 3 sites for free
- [cabin](https://withcabin.com/pricing) - 1 site for free
- [swetrix](https://swetrix.com/) - open source, starts from $5/month

See more alternatives here:

- [European web analytics services](https://european-alternatives.eu/category/web-analytics-services)
- [19 Google Analytics Alternatives](https://tinyanalytics.io/google-analytics-alternatives)
- [goatcounter](https://www.goatcounter.com/)
- [beampipe](https://beampipe.io/)
- [thesemetrics](https://thesemetrics.org/pricing)

Also some "static hostings" provide analytics, for example:

- [Cloudflare Pages](https://www.cloudflare.com/web-analytics/) there is a free tier
- [Netlify](https://www.netlify.com/products/analytics/) $9/month

## Search

In old times people would use "Google custom search engine" (I can't find it anymore, I guess, they discounted it). There is as well Algolia. But who needs third party paid solution, when you can do it for free.

Recent trend is to generate search index during site generation and then use client side library to do the search. It will probably won't scale for a huge website, but for personal blog more than enough.

Some options (not a full list):

- [pagefind](https://github.com/cloudcannon/pagefind)
- [fuse](https://github.com/krisk/fuse)
- [minisearch](https://github.com/lucaong/minisearch)
- [tinysearch](https://github.com/tinysearch/tinysearch)
- [orama](https://github.com/oramasearch/orama)

Honorable mentions:

- [typesense](https://github.com/typesense/typesense) - open-source, but needs server
- [docsearch](https://docsearch.algolia.com/) - free Algolia search for developer docs

Or you can do something crazy, like hosting [SQLite database over HTTP](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/).

## Comments

In old times people would use Disqus. But again, it is not GDPR compliant out of the box and there is huge JS payload (at least it was, when I used it last time).

One of potential solution for developers is to reuse github comments or discussions as comments for your website. Most developers have github account anyway (I know there are people, who are strongly opposed to Github and prefer Gitlab or self-hosted solutions, but this is discussion for another time). For example:

- [giscus](https://giscus.app/)
- [utterances](https://utteranc.es/)
- [gitalk](https://gitalk.github.io/)
- [vssue](https://vssue.js.org/demo/)
  - also supports: Bitbucket, Gitea, Gitee, GitLab

Other option is not to host comments directly on your website, but put a link to a place where people can discuss (especially if you crosspost), for example: hacker news, dev.to, reddit, twitter etc.
