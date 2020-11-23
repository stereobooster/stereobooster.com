---
title: "Dev.to posts quality"
date: 2020-11-22T19:35:40+01:00
draft: false
---

In response to:

- [I feel like the quality of posts in Dev is deteriorating](https://dev.to/xyn/i-think-the-quality-of-posts-in-dev-is-deteriorating-2of0)
- [Improving the way DEV elevates the good stuff ](https://dev.to/devteam/improving-the-way-dev-elevates-the-good-stuff-39an)

This is quite an interesting case for study. 

On one hand, we have websites that optimize for popularity (engagement) of posts, like hacker news and reddit. Users can upvote and downvote content. Those sites tend to be toxic and elitist. It is hard to get on top, but if the author gets on top they will get a lot of views and comments.

On the other hand, we have dev.to which the main goal is to keep it as beginner-friendly as possible. Commitment to CoC makes it non-toxic. But the average quality of content tends to be low (personal opinion). Because of a big number of posts and no "real" rating, good authors lose motivation to write - the good article will be buried in a flood of bad ones.

Is there a way out? What are the alternatives?

- Is the reputation (or karma) system tends to make community elitist? [In my opinion, the absence of CoC makes the community toxic (not a downvoting function)](https://dev.to/swyx/moderating-a-220k-developer-community-3doj).
- What if we would allow downvoting, but will show counter only to the author (so there is no public shaming)? The same way as dev.to doesn't show the number of followers. And as soon as the post passes some positive number of likes it would get some badge (50 likes = 🦄, for example).

Beginner friendliness is a nice goal, but some authors didn't bother even to put in some content and send this post to feed of thousands of users. How is that different from spam? There should be some reasonable line between beginner friendliness and respect to the other users, right?

## Quality

I also feel like the quality of the average article on dev.to is quite low.

> **Important**: I'm criticizing it because I write for dev.to myself. So the critics can be applied to me as well. ([Only a ginger can call another ginger](https://www.youtube.com/watch?v=KVN_0qvuhhw)).

But there is a trick to it. How would you define the quality of a post? If you read the comments of the first post you would see that there are different opinions.

So let's discuss options - what we can consider as poor quality. **Options are arguable - not a final judgment**.

### Violation of CoC

Not arguably bad.

### Spam

> spam - unsolicited usually commercial messages (such as e-mails, text messages, or Internet postings) sent to a large number of recipients or posted in a large number of places
>
> -- [Merriam-Webster](https://www.merriam-webster.com/dictionary/spam)

I guess everybody would agree that spam is bad.

**Ways to fight**: restrict a number of posts for new accounts, restrict a number of outgoing links for new accounts, spam detection algorithms (like, akismet or similar), moderation, spam reporting system.

In general, this is a well-known problem for ages on the Internet, and there are well-established ways to fight it.

**Note**: it feels like it is easier to post spam on dev.to than report it. To post you don't need to pass CAPTCHA, but to report spam you need to prove you are not a bot 🤷‍♀️.

### Plagiarism or copy-paste

> plagiarize - to steal and pass off (the ideas or words of another) as one's own: use (another's production) without crediting the source
>
> [Merriam-Webster](https://www.merriam-webster.com/dictionary/plagiarizing)

Not arguably bad.

**Note**: do not confuse with cross-posting.

### Lack of content

Posts without any sense, like unreadable text or only title with "test" or similar.

**Ways to fight**: give caution to the author "you about to post an empty article, while you can do it, we recommend to do at least some text"

### Factually wrong

Posts that do false claims about facts. The same way as Twitter and Facebook tries to fight misinformation, we can add a small disclaimer to the post, like an official source on the subject ...

### Misuse of terminology

Sometimes happens that terminology in software development is misused.

### Opinion presented as fact

A lot of things that can't be proved with facts are presented as if they are facts, for example, "how to become a better developer by avoiding else statements".

### Poor text quality

Posts with (big number of) grammatical errors, [poor style](https://archive.org/details/writingwithstyle00trim).

Highly arguable, because there are a lot of non-native speakers. Maybe we can allow moderators to help fix grammar 🤷‍♀️.

### Poor formatting quality

Posts with poor text formatting, for example, code without fences or fences without language specified, lack of text structure e.g without headers.

**Ways to fight**: gamified introduction to the markdown editor

### Shallow content or poor retelling

For example, "Array methods in JavaScript", where 5 random methods were selected and showed, but no value was added compared to reading an "official" manual, like [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Value in such articles could be an attempt to explain array methods with real-world analogies, for example.

Arguable: those articles are fine if they presented in the vein of "today I learned".

### List-articles

Everybody likes lists, but reading "top \<Number> of \<Things> for \<Subject> in \<Year>" again and again is kind of counterproductive.

The problem with those articles is that they lack any kind of research - you can find the same list or even bigger one in ["awesome repositories"](https://github.com/sindresorhus/awesome) or with a simple Internet search.

List-article would make sense if it is exhaustive or contains some kind of comparison or this is unique content.

### Tisers

Posts with partial content with a link to the original article.

Arguable, but I don't understand the reasoning behind this tactic. dev.to has canonical links, so SEO should be okay. What is the sense to make users click one more time?

### Offtopic

> Something that has absolutely nothing to do with the subject at hand...
>
> [urbandictionary](https://www.urbandictionary.com/define.php?term=Off%20Topic)

Arguable. There is even a tag for it [#watercooler](https://dev.to/t/watercooler)
