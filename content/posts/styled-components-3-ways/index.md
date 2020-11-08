---
title: "Styled-components 3 ways"
date: 2020-11-08T12:43:52+01:00
draft: false
tags: [javascript, react, styled-components]
---

## Style Objects

```jsx
const Button = styled.button((props) => ({
  color: props.color,
  border: `2px solid ${props.border}`,
  background: props.background,
}));
```

> styled-components optionally supports writing CSS as JavaScript objects instead of strings. This is particularly useful when you have existing style objects and want to gradually move to styled-components.

## Tagged Template Literals

```jsx
const Button = styled.button`
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.border};
  background: ${(props) => props.background};
`;
```

> Tagged Template Literals are a new feature in ES6. They let you define custom string interpolation rules, which is how we're able to create styled components.
>
> If you want to learn more about tagged template literals, check out Max Stoiber's article: [The magic behind 💅🏾 styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/)

## And the third one...

But apparently, there is a third way which is not documented:

```jsx
const Button = styled.button((props) => `
  color: ${props.color};
  border: 2px solid ${props.border};
  background: ${props.background};
`);
```

When I saw it the first time, I thought this was an error and it would not work. Actually, it does. From my POV it's more readable than "Tagged Template Literals".

**I wonder why it's not listed in the official documentation.**
