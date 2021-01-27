# My personal blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e0eb121-52b3-4f50-8a2a-6c75e96ff3ae/deploy-status)](https://app.netlify.com/sites/stereobooster/deploys)

## tools

### development

- [Hugo](http://gohugo.io/) - A general-purpose website framework—written in Go—that generates static webpages.
- [Parcel](https://parceljs.org/) - A "blazing" fast, zero configuration web application bundler.
- PostCSS
- fork of [hugo-pipes-parcel](https://github.com/budparr/hugo-pipes-parcel)
- see package.json (ganalytics, lazysizes, quicklink)

## TODO

- [Crosspost to other platforms](https://dev.to/maxkatz/where-to-publish-content-53ao)
  - https://github.com/Hashnode/user-feedback/issues/2
- [Automate crosspost](https://dev.to/maxime1992/manage-your-dev-to-blog-posts-from-a-git-repo-and-use-continuous-deployment-to-auto-publish-update-them-143j)
  - [The State of dev.to API](https://dev.to/alfredosalzillo/the-state-of-devto-v0-api-1o2)
- [Dark theme](https://dev.to/alexandersandberg/creating-a-website-theme-switcher-with-css-only-4kp2)
- Create "about me" page (https://github.com/stereobooster/readme)
- Improve 404 page
  - maybe add Glitch effect?
- is it possible to skip generation of line numbers for code-blocks in RSS?
- is it possible to skip generation of anchor for headers in RSS?
  - Why render-image.rss.xml doesn't work?
    - https://discourse.gohugo.io/t/how-does-render-image-rss-xml-work/29935
    - https://github.com/gohugoio/hugo/issues/8176
- wide code blocks, wide tables, wide images?
- move logic from image shortcode (img.html) to image template (render-image.html)
  - https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
  - https://matthiasott.com/notes/aspect-ratio-in-css

## License

Content is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).

Code is licensed under [MIT](https://opensource.org/licenses/MIT).
