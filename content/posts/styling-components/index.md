---
title: "Styling components"
date: 2023-09-04T14:24:49+02:00
draft: false
tags: [webdev, css, react]
---

## `style` prop

<!--more-->

```tsx
<div style={{ color: "red" }} />
```

`style` prop it the most basic CSS-in-JS solution. But it doesn't support:

- [mediaqueries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features)
- [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
- [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
- global styles
  - `@font-face`
  - `@keyframes`
  - `* { box-sizing: border-box; }`
- [vendor-prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)
- theming
  - but you can still do it with [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## `styled` function

```tsx
const Box = styled.div`
  color: red;
`;
<Box />;
```

or

```tsx
const Box = styled('div', {
 color: "red"
})
<Box />
```

There are a lot of implementation. Some examples:

- [styled-components](https://styled-components.com/)
- [emotion](https://emotion.sh/docs/introduction)
- [styletron](https://styletron.org/)
- [stitches](https://stitches.dev/docs/api#styled)
- [linaria](https://linaria.dev/)
- [compiledcssinjs](https://compiledcssinjs.com/)

## Styles-as-props

**aka**: Style Props. Styles are exposed as props:

```tsx
<Box display="flex" position="absolute" top={0} />
```

There are a lot of implementation. Some examples:

- [react-native-web](https://necolas.github.io/react-native-web/docs/styling/#short-form-properties)
- [tamagui](https://tamagui.dev/docs/intro/props)
- [kuma-ui](https://www.kuma-ui.com/docs/Components/Box)
- [ui-box](https://github.com/segmentio/ui-box)

Often combined with polymorphic `as` (`is`, `component`) prop and `data` prop.

```tsx
<Box as="span" data={{ testid: "customIdentifier" }} />
```

## Responsive styles-as-props

Variation of styles-as-props to support size media-queries:

```tsx
<Box padding={{ mobile: "small", tablet: "medium" }} />
```

There are a lot of implementation. Some examples:

- [atomic-layout](https://redd.gitbook.io/atomic-layout/fundamentals/responsive-props)
- [palette](https://palette.artsy.net/guides/responsive/)
- [braid](https://seek-oss.github.io/braid-design-system/components/Box)

## `sx` prop

**aka**: css-prop. Can be considered as a variation of `style` prop:

```tsx
<Box sx={{ border: 1 }} />
```

But it resolves issues (depending on implementation) with:

- mediaqueries
- pseudo-classes
- pseudo-elements
- theming

```jsx
<Box
  sx={[
    // theme prop
	color: 'primary.main',
	// or
    (theme) => ({ color: theme.palette.primary.main }),
    // responsive prop
    width: { xs: 100, sm: 200 },
    // or
    width: [100, 200, 300],
    // pseudo-classes
    '&:hover': { color: 'red' }
  ]}
/>
```

There are a lot of implementation. Some examples:

- [mui](https://mui.com/system/getting-started/the-sx-prop/)
- [theme-ui](https://theme-ui.com/sx-prop)
- [dripsy](https://www.dripsy.xyz/usage/overview#sx-factory)
- [style-gluestack](https://style.gluestack.io/docs/overview/api)
- [stitches css-prop](https://stitches.dev/docs/overriding-styles#the-css-prop)
- [emotion css-prop](https://emotion.sh/docs/css-prop#use-the-css-prop)
- [radipan](https://github.com/yumin-chen/radipan)

## Variants

**aka**: recipes. I call it "variants" for the lack of better name. Maybe "design system driven props"? It can look, for example, like this:

```tsx
const Button = styled("button", {
  defaultVariants: {
    color: "accent",
    size: "medium",
  },
  variants: {
    color: {
      neutral: { background: "whitesmoke" },
      brand: { background: "blueviolet" },
      accent: { background: "slateblue" },
    },
    size: {
      small: { padding: 12 },
      medium: { padding: 16 },
      large: { padding: 24 },
    },
  },
});
```

There are a lot of implementation. Some examples:

- [stitches](https://stitches.dev/)
- [cva](https://cva.style/docs/getting-started/variants)
- [macaron](https://github.com/macaron-css/macaron)
- [clb](https://github.com/crswll/clb)
- [aestheticsuite](https://aestheticsuite.dev/)
- [panda recipes](https://panda-css.com/docs/concepts/recipes)
- vanilla-extract: [recipes](https://vanilla-extract.style/documentation/packages/recipes/) + [sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) + [dessert-box](https://github.com/TheMightyPenguin/dessert-box)

Variants are often go hand in hand with theme (or design tokens):

```tsx
export const { styled, css } = createStitches({
  theme: {
    colors: {
      gray500: "hsl(206,10%,76%)",
      blue500: "hsl(206,100%,50%)",
      purple500: "hsl(252,78%,60%)",
      green500: "hsl(148,60%,60%)",
      red500: "hsl(352,100%,62%)",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
  },
});
```

You can define aliases for tokens (to use semantic names):

```tsx
colors: {
  background: "$gray500";
}
```

You can define a different theme, for example to support dark mode.

Tokens can be "smartly" mapped, e.g. system knows where (in which section of the theme) to lookup token depending on the property:

```tsx
const Button = styled("button", {
  color: "$purple500",
});
```

You can define aliases for styles-as-props:

```tsx
export const { styled, css } = createStitches({
  utils: {
    // Abbreviated margin properties
    m: (value) => ({
      margin: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
  },
});
```

See:

- [stitches tokens](https://stitches.dev/docs/tokens)
- [styled-system theme specification](https://github.com/styled-system/styled-system/blob/master/docs/theme-specification.md)
- [theme-ui theme specification](https://theme-ui.com/theme-spec)
- [system-ui theme specification](https://github.com/system-ui/theme-specification)
- [udt](https://udt.design/)
- [tailwind theme](https://tailwindcss.com/docs/theme)

## Bonus: comparison to Tailwind

### background

**styles-as-props**:

```tsx
// with theme
<Box backGround={(theme) => theme.colors.slate100} />
// with smart mapping
<Box backGround="$slate100" />
// with alias and smart mapping
<Box bg="$slate100" />
// with dark mode mediaqueries
<Box bg={{ light: "$slate100", dark: "$slate600" }} />
```

And dark mode can be implemented at theme level.

**`sx` prop**:

```tsx
<Box sx={(theme) => ({ backGround: theme.colors.slate100 })} />
```

**Tailwind**:

```tsx
<Box className="bg-slate-100 dark:bg-slate-800" />
```

### padding

**styles-as-props**:

```tsx
<Box p={{ sm: 8, md: 0 }} />
```

**`sx` prop**:

```tsx
<Box sx={{ padding: { sm: 8, md: 0 } }} />
```

**Tailwind**:

```tsx
<Box className="p-8 md:p-0" />
```

### flex

**styles-as-props**:

```tsx
<Box flex={{ md: true }} />
```

**`sx` prop**:

```tsx
<Box sx={{ flex: { md: true } }} />
```

**Tailwind**:

```tsx
<Box className="md:flex" />
```

### Summary

To me they look the same, except that Tailwind doesn't require runtime and works with server components `¯\_(ツ)_/¯`. Only **variants** look different.

## CSSModules-vibe

- [react-native-web](https://necolas.github.io/react-native-web/docs/style-sheet/)
- [stilr](https://github.com/kodyl/stilr)

```tsx
const styles = StyleSheet.create({ root: { flex: 1, opacity: 0 } });
const Component = () => <View style={styles.root} />;
```

- [styled-jsx](https://github.com/vercel/styled-jsx)

```tsx
export default () => (
  <div>
    <p>only this paragraph will get the style :)</p>
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
);
```

- [jss](https://cssinjs.org/react-jss?v=v10.10.0#basic)

```tsx
const useStyles = createUseStyles({
  myButton: {
    color: "green",
  },
  myLabel: {
    fontStyle: "italic",
  },
});

const Button = () => {
  const classes = useStyles();
  return (
    <button className={classes.myButton}>
      <span className={classes.myLabel}></span>
    </button>
  );
};
```
