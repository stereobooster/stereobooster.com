# My personal blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e0eb121-52b3-4f50-8a2a-6c75e96ff3ae/deploy-status)](https://app.netlify.com/sites/stereobooster/deploys)

## congo TODO

- in search results there are empty blocks
  - https://github.com/jpanther/congo/issues/642
- cover images in posts
  - rename `cover_image` to `cover`?
- check: `kbd`
  - themes/congo/tailwind.config.js
  - https://github.com/tailwindlabs/tailwindcss-typography/pull/317
  - https://daisyui.com/components/kbd/
- blockquote remove quotes
  - themes/congo/tailwind.config.js
  - https://discourse.gohugo.io/t/blockquote-with-render-hook/40701
- img maybe add lqip
- check [RSS](http://localhost:1313/index.xml)
  - `render-image.rss.xml` ?
  - `render-code.rss.xml` ?
- icons can be better
- check a11y
  - header links
    - https://github.com/valeriangalliat/markdown-it-anchor/issues/82
    - https://www.leereamsnyder.com/blog/making-headings-with-links-show-up-in-safari-reader
    - https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
  - `outline: auto` is strange
- check full width image?
  - https://github.com/jpanther/congo/discussions/498
- code line numbers
  - exclude from selection: `.highlight .ln { user-select: none; }`
  - exclude from copy
  - support sticky position (for horizontal scroll)
- track scroll in sidebar?
- Do I need quicklink?
- improve related links to post

```js
module.exports = {
  theme: {
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none'},
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
```

- https://blowfish.page/docs/shortcodes/
- https://jpanther.github.io/congo/docs/partials/

## TODO

- [Crosspost to other platforms](https://dev.to/maxkatz/where-to-publish-content-53ao)
  - https://github.com/Hashnode/user-feedback/issues/2
- [Automate crosspost](https://dev.to/maxime1992/manage-your-dev-to-blog-posts-from-a-git-repo-and-use-continuous-deployment-to-auto-publish-update-them-143j)
  - [The State of dev.to API](https://dev.to/alfredosalzillo/the-state-of-devto-v0-api-1o2)
- Create "about me" page (https://github.com/stereobooster/readme)
- Create "projects" page
- is it possible to skip generation of line numbers for code-blocks in RSS?
- wide code blocks, wide tables, wide images?

## License

Content is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).

Code is licensed under [MIT](https://opensource.org/licenses/MIT).
