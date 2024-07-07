---
title: "Ruby tooling"
date: 2024-07-07T13:47:02+02:00
tags: [dx, ruby]
---

## Speed up Ruby

### yjit

[asdf](https://asdf-vm.com/) is "The Multiple Runtime Version Manager". Instead of `rbenv`, `rvm`, `nvm` etc.

```
asdf plugin-add rust
asdf install rust latest
asdf global rust latest
RUBY_CONFIGURE_OPTS=--enable-yjit asdf install ruby 3.3.0
```

Alternative is [mise](https://mise.jdx.dev).

### jemalloc

`jemalloc` is an alternative memory allocator. To install lib in Linux

```
apt-get install -y --no-install-recommends libjemalloc-dev libjemalloc2
```

or in MacOS:

```
brew install jemalloc
```

Then install ruby with jemalloc:

```
RUBY_CONFIGURE_OPTS=--with-jemalloc asdf install ruby 3.3.0
```

### Bootsnap

Bootsnap is a library that plugs into Ruby, with optional support for YAML and JSON, to optimize and cache expensive computations. See [How Does This Work](https://github.com/Shopify/bootsnap#how-does-this-work).

For installation see [official guide](https://github.com/Shopify/bootsnap#usage).

> Note: Bootsnap and [Spring](https://github.com/rails/spring) are orthogonal tools. While Bootsnap speeds up the loading of individual source files, Spring keeps a copy of a pre-booted Rails process on hand to completely skip parts of the boot process the next time it's needed. The two tools work well together.

### Use binstubs

[binstubs](https://bundler.io/v1.14/man/bundle-binstubs.1.html) are faster than `bundle exec`

### Note about re-installation

If you had previously installed gems and you re-installed ruby with `yjit` or `jemalloc` you may need to reinstall your gems: `bundle install --redownload`.

## IDE and co

### VScode

[VScode](https://code.visualstudio.com/) is my preferred IDE (at least for now). There is also [VSCodium](https://vscodium.com/) without telemetry/tracking. There are many options for IDE, I do not see point arguing which is better.

I want to try one of GPU accelerated editors:

- [Zed](https://zed.dev/)
- [Lapce](https://lapce.dev/)

### Ruby LSP

[Ruby LSP](https://github.com/Shopify/ruby-lsp) seems to be the most advanced language server for now. Because it is implemented as LSP it works with any editor that supports protocol, which includes VSCode, Zed, Neovim etc.

Before I was using [Solargraph](https://solargraph.org/). Some people suggest to use both. I don't see the point.

If you're using VScode there is [an extension](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) for it. Note: you don't need separate [extension for Rubocop](https://marketplace.visualstudio.com/items?itemName=rubocop.vscode-rubocop).

### Other VScode extensions

TODO

<!--
https://marketplace.visualstudio.com/items?itemName=KoichiSasada.vscode-rdbg
hjleochen.rails-nav
https://marketplace.visualstudio.com/items?itemName=aliariff.vscode-erb-beautify
https://marketplace.visualstudio.com/items?itemName=elia.erb-formatter
-->

## Linters

### Rubocop

Rubocop is default choice for linter. There are a lot of good extensions, like [rubocop-rails](https://github.com/rubocop/rubocop-rails), [rubocop-rspec](https://github.com/rubocop/rubocop-rspec), [rubocop-performance](https://github.com/rubocop/rubocop-performance).

Tip: [server mode](https://docs.rubocop.org/rubocop/usage/server.html) `rubocop --server` may improve speed of Rubocop.

### Standard

[Standard](https://github.com/standardrb/standard) is a linter & formatter built on [RuboCop](https://github.com/rubocop/rubocop) and provides an **unconfigurable configuration** to all of RuboCop's built-in rules as well as those included in [rubocop-performance](https://github.com/rubocop/rubocop-performance). It also supports plugins built with [lint_roller](https://github.com/standardrb/lint_roller), like [standard-rails](https://github.com/standardrb/standard-rails) and [standard-sorbet](https://github.com/standardrb/standard-sorbet).

It integrates with Ruby LSP, Guard, Spring.

## Formatters

Do not confuse linters (which exist to prevent footgun bugs) and formatters (which can automatically change formatting of code). Good formatter would always produce consistent result. See [A prettier printer](https://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf). But Rubocop and Standard can do formatting as well...

### rubyfmt

[rubyfmt](https://github.com/fables-tales/rubyfmt) is interesting because it is wirtten in Rust.

### Prettier for Ruby

[@prettier/plugin-ruby](https://github.com/prettier/plugin-ruby) is a prettier plugin for the Ruby programming language and its ecosystem. I know prettier from JS world and I know this is consistent and fast tool

### Others

- [Rufo](https://github.com/ruby-formatter/rufo)

TODO: formatters for ERB

## Type checker

### RBS

Ruby trying to add gradual typings, like in TypeScript or Mypy, starting from v3. So far they have [rbs](https://github.com/ruby/rbs) (type signature for Ruby) and an experimental type-level Ruby interpreter [typeprof](https://github.com/ruby/typeprof/) ([VScode extension](https://github.com/ruby/vscode-typeprof)).

For now there is not much progress from core team, so there are opensource alternatives.

### Sorbet

[Sorbet](https://sorbet.org/) is the most widely used static type checker for Ruby today. RBS is not trying to deprecate Sorbet and its type signature format RBI. Matz and the Ruby committer team are working closely with the Sorbet team. It's not clear though how they would merge both. [VScode extension](https://sorbet.org/docs/vscode).

### Steep

[Steep](https://github.com/soutaro/steep) - gradual typing for Ruby. [VScode extension](https://github.com/soutaro/steep-vscode).

### Other

[Sord](https://github.com/AaronC81/sord) can automatically type signature files by looking at the types specified in YARD documentation comments. Claim to support all type signature formats: Sorbet's RBI, Ruby 3/Steep's RBS format.

## Packwerk

[Packwerk](https://github.com/Shopify/packwerk) is a Ruby gem used to enforce boundaries and modularize Rails applications. But before adopting it read [A Packwerk Retrospective (2024)](https://shopify.engineering/a-packwerk-retrospective).

[packs](https://github.com/alexevanczuk/packs) is a 100% Rust implementation of packwerk, a gradual modularization platform for Ruby.

## Terminal

### GPU accelerated termnials

Except GPU accelerated editors, there are as well GPU accelerated termnials:

- [alacritty](https://github.com/alacritty/alacritty)
- [wezterm](https://github.com/wez/wezterm)
- [kitty](https://sw.kovidgoyal.net/kitty/)

### Utils

If you are using terminal a lot you may as well check some modern alternatives to old favourite tools. See [A list of new(ish) command line tools](https://jvns.ca/blog/2022/04/12/a-list-of-new-ish--command-line-tools/).

## Other

- [14 tools and gems every Ruby developer would love](https://blog.testdouble.com/posts/2024-03-26-ruby-toolbox/)
- [Ruby Toolbox](https://www.ruby-toolbox.com/)
