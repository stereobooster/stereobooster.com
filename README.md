# My personal blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e0eb121-52b3-4f50-8a2a-6c75e96ff3ae/deploy-status)](https://app.netlify.com/sites/stereobooster/deploys)

## congo TODO

- Disclaimer block
- add pagination to the index page
- add related links to post
- in search results there are empty blocks
- check: `kbd`
- check: wide code blocks
- code line numbers
  - exclude from selection: `.highlight .ln { user-select: none; }`
  - exclude from copy
- check a11y
  - can focus hidden header icons
- `<meta name="theme-color" content="rgb(255,255,255)" />`, `black-translucent`
- cover images in posts
  - rename `cover_image` to `cover`?
- add license for the content https://creativecommons.org/licenses/by-nc-sa/4.0/
- links about me - npm
- https://blowfish.page/docs/shortcodes/
- https://jpanther.github.io/congo/docs/partials/
- Do I need quicklink?
- test locally (including mobile)
  - https://gohugo.io/commands/hugo_server/
  - https://gohugo.io/commands/hugo_server_trust/
  - https://gist.github.com/willurd/5720255
- Check Privacy policy, Disclaimer
- img maybe add lqip
- check performance, SEO
- check [RSS](http://localhost:1313/index.xml)
  - `render-image.rss.xml` ?
  - `render-code.rss.xml` ?
- add links to subdomains
  - on top with hamburger menu?
- icons can be better

```
{{ $ageDays := div (sub now.Unix .Lastmod.Unix) 86400 }}
{{ if gt $ageDays 180 }}
<aside class="old_content_disclaimer">
  <a href="/disclaimer/"><b>Disclaimer</b>: This article is older than 180 days. The author may not hold that opinion anymore.</a>
</aside>
{{ end }}
```

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
