---
title: "React hook to select multiple items with a shift"
date: 2021-06-22T23:16:31+02:00
draft: false
tags: [react, ux, typescript, javascript, hook]
---

Imagine you have a list (or a table) with checkboxes, for example, to do list, mail inbox, or "back-office" page. Checkboxes are used to select items for batch actions, for example, delete or archive, etc.



Code can look like this:

```tsx
const { selected, change } = useSelected([] as Array<Item>);

return (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <label>
          <input
            type="checkbox"
            id={item.id}
            checked={selected.includes(item)}
            onChange={(event) => change(event.target.checked, [item])}
          />
          {item.name}
        </label>
      </li>
    ))}
  </ul>
);
```

## Selecting with shift

It is a nice UX trick to allow to select multiple items with shift:

- user clicks on checkbox "A"
- user clicks on checkbox "Z" while holding down Shift key
- all checkboxes between "A" and "Z" get checked

Small thing, but can save a lot of time if user needs to select a lot of items. For example, you can test this feature in Gmail.

## The hook

Here is a hook I implemented to support this:

```ts
export const useShiftSelected = <P>(
  initialState: Array<P>,
  change: (addOrRemove: boolean, items: Array<P>) => void
) => {
  const [previousSelected, setPreviousSelected] = useState<P | null>(null);
  const [previousChecked, setPreviousChecked] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<P | null>(null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, item: P) => {
      // @ts-ignore shiftKey is defined for click events
      if (event.nativeEvent.shiftKey) {
        const current = initialState.findIndex((x) => x === item);
        const previous = initialState.findIndex((x) => x === previousSelected);
        const previousCurrent = initialState.findIndex(
          (x) => x === currentSelected
        );
        const start = Math.min(current, previous);
        const end = Math.max(current, previous);
        if (start > -1 && end > -1) {
          change(previousChecked, initialState.slice(start, end + 1));
          if (previousCurrent > end) {
            change(
              !previousChecked,
              initialState.slice(end + 1, previousCurrent + 1)
            );
          }
          if (previousCurrent < start) {
            change(
              !previousChecked,
              initialState.slice(previousCurrent, start)
            );
          }
          setCurrentSelected(item);
          return;
        }
      } else {
        setPreviousSelected(item);
        setCurrentSelected(null);
        setPreviousChecked(event.target.checked);
      }
      change(event.target.checked, [item]);
    },
    [
      change,
      initialState,
      previousSelected,
      setPreviousSelected,
      previousChecked,
      setPreviousChecked,
      currentSelected,
      setCurrentSelected,
    ]
  );

  return onChange;
};
```

Not necessary the best code, but demonstrates the idea.

Source code:

- [useSelected.ts](https://github.com/stereobooster/useful-react-snippets/blob/main/useShiftSelected/useSelected.ts)
- [useShiftSelected.ts](https://github.com/stereobooster/useful-react-snippets/blob/main/useShiftSelected/useShiftSelected.ts)

## Code with a hook

What I like about it, is that I don't need to change a lot of original code:

```diff
const { selected, change } = useSelected([] as Array<Item>);
+ const onChange = useShiftSelected(items, change)
...
- onChange={(event) => change(event.target.checked, [item])}
+ onChange={(event) => onChange(event, item)}
```
