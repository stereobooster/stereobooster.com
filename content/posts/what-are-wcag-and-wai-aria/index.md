---
title: "What are WCAG and WAI-ARIA?"
date: 2021-06-28T01:10:16+02:00
draft: false
tags: [a11y, til]
---

## WCAG

Initially I was confused by WCAG, WAI-ARIA and other standards. I took time to figure out things.

<!--more-->

[WAI](https://www.w3.org/WAI/) (Web accessibility initiative) produces several standards (recommendations, guides). WCAG (Web Content Accessibility Guidelines) is the "main" one.

WCAG 2.0 is also an ISO standard. WCAG 2.x serves as the basis for a lot of [laws, regulations, etc.](https://www.w3.org/WAI/policies/?q=wcag-20&q=wcag-20-derivative) - requiring AA compliance.

WCAG has several versions. [2.1](https://www.w3.org/TR/WCAG21/) is most recent one. 2.2 is working draft.

## WCAG 2

WCAG 2.x consists of the main document (standard) and 3 supplemental documents:

- How to Meet WCAG 2 (Quick Reference)
- Understanding WCAG 2
- Techniques for WCAG 2

Standard intentionally written without technical details, so it can be applied to different technologies (HTML, JS, CSS, Flash, Silverlight, PDF, etc.). Technical details are listed in "Techniques for WCAG 2".

Be aware that some of those techniques can be outdated, for example:

- it recommends to use `padding`, `margin` over image spacers and avoid tables for layouts - I thought people stopped doing that in 2010. I also would recommend to use `gap` instead of `margin`
- it recommends to provide title for each page with the help of HTML `title` tag, which obviously would not help screen reader users in context SPA. There is no page reload, so screen reader would not read out new title. Modern solution for this recommendation would be [this](https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/).

Standard doesn't specify which kind of disabilities are covered by which recommendation, so it is not always obvious how to test and what to take into account. Some of explanations are given in "Understanding WCAG 2". But not all of them list disabilities.

To be fair some of recommendations are not targeted for people with special needs, but rather general [UX advice](https://www.nngroup.com/articles/ten-usability-heuristics/), for example:

- provide clear description of buttons and links
- same looking elements should not have different actions

Which doesn't make them worse - just an interesting observation.

["How to Meet WCAG 2 (Quick Reference)"](https://www.w3.org/WAI/WCAG21/quickref/) is a checklist for WCAG 2, it essentially the same contet, but suppose to be mroe compact. It suppose to be, but I find it hard to work with (maybe because of strange website structure).

There are other checklists, for example:

- https://www.a11yproject.com/checklist/
- https://webaim.org/standards/wcag/checklist
- https://www.wuhcag.com/wcag-checklist/
- https://www.w3.org/TR/2006/WD-WCAG20-20060427/appendixB.html

> Following WCAG will make content more accessible to a wider range of people with disabilities, including accommodations for blindness and low vision, deafness and hearing loss, limited movement, speech disabilities, photosensitivity, and combinations of these, and some accommodation for learning disabilities and cognitive limitations.

But WCAG addresses learning and cognitive disabilities to lesser extent

> Significant challenges were encountered in defining additional criteria to address cognitive, language, and learning disabilities, including a short timeline for development as well as challenges in reaching consensus on testability, implementability, and international considerations of proposals.

For those disabilities they made a separate document ["Making Content Usable for People with Cognitive and Learning Disabilities"](https://www.w3.org/TR/coga-usable/#testing-each-pattern).

## WAI-ARIA

[Accessible Rich Internet Application (WAI-ARIA 1.1)](https://www.w3.org/TR/wai-aria-1.1/) is additional standard. It meant to specify how interactive component would work in the context of assistive technologies.

It is relatively new compared to WCAG (it was released in 2014). Not all features supported by all assistive technologies.

HTML5 elements come with predefined assistive roles, so if you can use HTML5 tags use them instead of ARIA attributes.

ARIA components built with keyboard accessibility in mind, but not necessarily it will accommodate all assistive technologies, for example applying `gridcell` role to `td`, will break standard navigation for tables in VoiceOver. So blindly following standard doesn't guarantee best experience - testing with real device required.

WAI-ARIA mentioned as one of techniques in "Techniques for WCAG 2" - so to some extent it is supplemental document for WCAG 2.

There is main document (standard) and supplemental one: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#read_me_first)

There is a working draft of WAI-ARIA v1.2.

## WCAG 3

[WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) is the next major release planed for 2022.

WCAG 3 will addresses some issues of WCAG 2. It will focus more on user testing and will change scoring system.

## Conclusions

Use WCAG 2.1 (also using 2.2 is pretty safe, because it will be approved in June this year). Strive for AA. WCAG is more focused on over all experience, not all criteria applicable in context of separate components, for example rule about page title.

WAI-ARIA 1.1 can serve as supplemental material, but prefer HTML5 whenever possible and don't forget to test with real devices. WAI-ARIA focused on separate components, which seems to be more relevant for design system.

## Learning resources

- [Digital Accessibility Foundations Free Online Course](https://www.w3.org/WAI/fundamentals/foundations-course/)
- [Web Accessibility for Developers](https://pressbooks.library.ryerson.ca/wafd/)
- [MDN on Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WHO's International Classification of Impairments, Disabilities, and Handicaps](https://apps.who.int/iris/bitstream/handle/10665/41003/9241541261_eng.pdf;jsessionid=D0EF385A92059FF9BF3F3C4EEE159BAD?sequence=1)
- [Cognitive Accessibility User Research](https://w3c.github.io/coga/user-research/)
- [Zero to accessibility expert](https://github.com/mfairchild365/zero-to-a11y-expert)
- ["Making Content Usable for People with Cognitive and Learning Disabilities"](https://www.w3.org/TR/coga-usable/)
