---
title: "Hugo ideal image"
date: 2023-10-11T01:14:33+02:00
draft: false
tags: [hugo, webdev, image]
---

I created image components a couple of times before:

- [Responsive images for Hugo](https://dev.to/stereobooster/responsive-images-for-hugo-dn9)
- [react-ideal-image](https://github.com/stereobooster/react-ideal-image)

But browsers keep improving - now almost all modern browsers support:

- [loading=lazy](https://caniuse.com/loading-lazy-attr)
- [srcset](https://caniuse.com/srcset)
- [picture](https://caniuse.com/picture)
- [webp](https://caniuse.com/webp)

I checked existing solutions - they either don't do what I want or are complicated (for my taste):

- [Hugo Images Module](https://hugomods.com/en/docs/images/)
- [lazyimg](https://github.com/hugo-mods/lazyimg)
- [DFD Hugo image handling module](https://github.com/danielfdickinson/image-handling-mod-hugo-dfd)

## Features

What I expect from an "ideal" image:

- Responsiveness
- Lazy-loading
- [Modern LQIP](https://github.com/transitive-bullshit/lqip-modern)
- [Portable markdown links](https://stereobooster.com/posts/portable-markdown-links/)
- Dark mode

## Implementation

There are different ways to implement image components in Hugo:

- [partial](https://gohugo.io/templates/partials/)
- [render hook](https://gohugo.io/templates/render-hooks/)
- [shortcodes](https://gohugo.io/templates/shortcode-templates/)

I think the most pragmatic way would be to implement it as "partial" which accepts an image as a resource. This way it can be reused in render hooks and shortcodes, and the resolution of the image would be the responsibility of the caller.

It can look something like this:

```
{{ partial "picture.html" (dict "img" $img "alt" $.Text) }}
```

Partial `picture.html` would be responsible for: detecting width and height, resizing the image, and rendering HTML. There are no special requirements for HTML or CSS so it would be a pretty portable solution (copy one file).

### Responsiveness

Component would be responsible for resizing image and rendering `srcset` attribute. Basic code:

```
srcset="
  {{- (.Resize "330x").RelPermalink }} 330w,
  {{- (.Resize "660x").RelPermalink }} 660w,
  {{- (.Resize "1024x").RelPermalink }} 1024w,
  {{- (.Resize "1320x").RelPermalink }} 2x"
src="{{ (.Resize "660x").RelPermalink }}"
```

**But**:

- it suppose to resize only raster images (not SVG)
- it should not upscale image

Additionally we can provide webp version of the image. Basic code:

```
<picture>
  <source
    srcset="
      {{- (.Resize "330x webp").RelPermalink }} 330w,
      {{- (.Resize "660x webp").RelPermalink }} 660w,
      {{- (.Resize "1024x webp").RelPermalink }} 1024w,
      {{- (.Resize "1320x webp").RelPermalink }} 2x"
    src="{{ (.Resize "660x webp").RelPermalink }}"
  />
  <img ... />
</picture>
```

Component only responsible for HTML part. You probably would need to add some CSS, for example:

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Lazy-loading

In order to use lazy-load it is enough to add:

```html
loading="lazy"
```

and optionaly:

```html
decoding="async"
```

**But**:

- it is important to set width and height of the image, to prevent reflow - browser would know ratio of the image upfront and will reserve space for it without downloading it

Which is pretty easy to do with Hugo

```html
width="{{ .Width }}" height="{{ .Height }}"
```

**But**:

- it works only for raster images

For SVG we need to do something like this:

```
{{ if (eq .MediaType.SubType "svg") }}
  {{ $width := ""}}
  {{ $height := ""}}
  {{ $svgContent := .Content }}
  {{ range (findRESubmatch `<svg[^>]*width=["']([.0-9]*)["'a-zA-Z]` $svgContent 1) }}
    {{ $width = index . 1 }}
  {{ end }}
  {{ range (findRESubmatch `<svg[^>]*height=["']([.0-9]*)["'a-zA-Z]` $svgContent 1) }}
    {{ $height = index . 1 }}
  {{ end }}
  {{ if (eq "" $width $height) }}
    {{ range (findRESubmatch `<svg[^>]*viewBox=["']?([.0-9]*) ([.0-9]*) ([.0-9]*) ([.0-9]*)` $svgContent 1) }}
      {{ $width = index . 3 }}
      {{ $height = index . 4 }}
    {{ end }}
  {{ end }}
  {{ if (eq "" $width $height) }}
    {{ warnf "Can't detect width and height for SVG %s" .RelPermalink }}
    {{/* do not use lazy without dimensions */}}
    {{ $lazy = false }}
  {{ end }}
{{ end }}
```

This code reads SVG as text and uses regular expression in order to match `width`, `height`, and `viewBox`. **Important**: it should not match values with `%`, because they are useless in this case. On the other hand - any absolute units can be matched, like `px`.

### LQIP

There are many LQIP approaches. I like, so called, modern LQIP, which uses 20px, 20% quality webp image as base64.

```
<picture
  {{ if $lqip }}
    {{ $bg := (.Resize "20x webp q20").Content | base64Encode }}
    style="background-image:url(data:image/webp;base64,{{ $bg }});background-size:cover"
  {{ end }}>
```

I already introduced `picture` in the markup, so I will reuse it as "holder" for LQIP.

**But**:

- for transparent images (png, webp) LQIP may be problematic, so there suppose to be a way to disable it
- I don't want to generate LQIP for SVG, because I would need to rasterize SVG first, which is too much trouble

Additionaly you may want to add CSS in order to make picture of the same size as image, for example:

```css
picture {
  display: block;
}
```

To improve appearance it is recomended to add blur:

```css
picture > img {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
```

Image is on "top" of picture. While it is loading it will be transparent. So we can use it add blur to the background. **Important**: this trick doesn't work in Firefox, see [Bug 1556156](https://bugzilla.mozilla.org/show_bug.cgi?id=1556156).

### Portable markdown links

This one is easy. Partial take resource rather than path. So it is responsibility of caller to resolve path.

### Dark mode

I'm not sure yet how to implement "dark mode" for images. From an HTML point of view it is trivial to implement:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="..." />
  <source media="(prefers-color-scheme: light)" srcset="..." />
  <img src="..." />
</picture>
```

But how to do it from Markdown's point of view? Some options are:

- **convention**. If there is an image `img.png` and `img_dark.png`, the system can automatically find the second image and use it for dark mode
- **shortcode**. Will work, but this is not a markdown solution
- Use some kind of **marker in the url** to distinguis dark-/light-mode images. For example, `#gh-dark-mode-only` or `#gh-light-mode-only`. See [Specifying the theme an image is shown to](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#specifying-the-theme-an-image-is-shown-to)
- SVGs don't need a special solution, they can handle it internally. See [Creating SVG that appears black in light mode and light in dark mode](https://stackoverflow.com/questions/67187091/creating-svg-that-appears-black-in-light-mode-and-light-in-dark-mode)
- for black and white images [`filter: invert(1)`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert) would do the trick

### Other

I want to keep number of params minimal. Currently it supports only:

- `img` - image as resource
- `alt` - string, alternative text
- `class` - string, for styling
- `lazy` - boolean, whether it should use lazy loading or not
- `webp` - boolean, whether it should generate webp version or not
- `lqip` - boolean, whether it should generate LQIP or not

## Source code

My current implementation is here:

- [picture partial](https://github.com/stereobooster/hugo-ideal-image/blob/main/layouts/partials/picture.html)
- [render hook for image](https://github.com/stereobooster/hugo-ideal-image/blob/main/layouts/_default/_markup/render-image.html)
