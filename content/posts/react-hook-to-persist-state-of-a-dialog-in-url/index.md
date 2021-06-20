---
title: "React hook to persist state of a dialog in URL"
date: 2021-06-20T13:28:57+02:00
draft: false
tags: [react, ux, typescript, javascript, hook]
---

Inspired by [Braid Dialog](https://seek-oss.github.io/braid-design-system/components/Dialog#development-considerations):

> It’s recommended that you connect the Dialog’s open state to your router so that it can be closed via the browser’s back button.

<!--more-->

When I saw this sentence - I thought what a cool idea. It was tricky to implement hook to capture all use-cases.

Basic example:

```tsx
const [showModal, setShowModal] = useState(false)

<Button onClick={() => setShowModal(true)}>Open dialog</Button>

<Dialog
  title="Dialog Title"
  description={<Text tone="secondary">Optional description</Text>}
  open={showModal}
  onClose={() => setShowModal(false)}
>
  <Placeholder height={100} width="100%" />
</Dialog>
```

## Now let's see what we can do

When **dialog is opened** we need to push to history new item, let's say `?dialog=true`. Using query param instead of path is easy, because we don't need to configure router for it, but we also need to preserve other parameters in URL.

When **user navigates back**, we need to listen to history change and update state (e.g. `showModal`).

When **dialog is closed** we need to pop one item from the history. Alternatively we can push one more item or replace current item, but all this will pollute browser's history.

When **user navigates directly** to the dialog link (e.g. `https://example.com/some-path?dialog=true`), hook needs to set starting value of `showModal` to true.

When **user closes dialog** after visiting direct link we need to use push instead of pop, otherwise browser will show blank page.

**Dialog may have precondition** when it can be showed, for example, we have a list of items with checkboxes, user suppose to select some items in order to delete them and after confirmation dialog will be shown. So we can't show dialog if there are no items selected.

When **user navigates directly** to the dialog link and precondition is `false`, hook suppose to use history replace in order to remove flag from the URL and do not create new history items.

When **user opens dialog**, then navigates back, then navigates forward but precondition is `false`, hook suppose to redirect user back - pop one item from the history.

## Whew

Good UX needs attention. Hook looks like this:

```tsx
const [showModal, setShowModal] = useUrlToggle(
  "dialog",
  false
  /*, precondition is optional thied param */
);
```

I implemented prototype of this hook [here](https://github.com/stereobooster/useful-react-snippets/blob/main/useUrlToggle/useUrlToggle.ts). Maybe not the best code, but my goal was to make proof of concept to see if it is possible.
