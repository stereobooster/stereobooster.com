---
title: "Distributing executable binaries in npm package"
date: 2023-10-01T11:28:23+02:00
draft: false
tags: [webdev, npm]
---

Let's say you need to distribute binary in npm. I'm not talking about node extensions (node-gyp, napi, etc.). I'm talking about standalone executables, like CLI applications.

We have options. **How to distribute binary**:

1. host executables on some server, for example, GitHub releases, and download appropriate (e.g. for given OS and architecture) binary on installation
2. put all executables (for all OSs and architectures) in one npm package
3. create sub-packages with binary for each OS and architecture and one "root" npm package which would list all sub-packages as optional dependencies

**How to run the binary**:

1. Use JS wrapper which would call actual executable with `exec`, `spawn`, etc.
2. On installation figure out where Node puts binaries and overwrite it with your binary from the package
3. Use JS script to call node binding (`*.node`) or WASM

**Tools and blog posts**:

| name                                                                                                                                              | distribution | execution        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------- |
| [binary-install](https://github.com/EverlastingBugstopper/binary-install)                                                                         | 1            | 1 (`spawnSync`)  |
| [binwrap](https://github.com/avh4/binwrap)                                                                                                        | 1            | 1 (`spawn`)      |
| [bin-wrapper](https://github.com/mole-inc/bin-wrapper)                                                                                            | 1            | 1 (`spawn`, ...) |
| [prebuild-install](https://github.com/prebuild/prebuild-install)                                                                                  | 1            | 3                |
| [blog.xendit.enginee](https://blog.xendit.engineer/how-we-repurposed-npm-to-publish-and-distribute-our-go-binaries-for-internal-cli-23981b80911b) | 2            | 2                |
| [hspak.dev](https://hspak.dev/post/publish-npm/)                                                                                                  | 2            | 2                |
| [prebuildify](https://github.com/prebuild/prebuildify)                                                                                            | 2            | 3                |
| [blog.orhun.dev](https://blog.orhun.dev/packaging-rust-for-npm/)                                                                                  | 3            | 1 (`spawnSync`)  |
| [napi-rs](https://github.com/napi-rs/package-template)                                                                                            | 3            | 3                |

**Example projects**:

| name                                                                  | distribution | execution          |
| --------------------------------------------------------------------- | ------------ | ------------------ |
| [@astrojs/compiler](https://github.com/withastro/compiler)            | 2 (WASM)     | 3                  |
| [esbuild](https://github.com/evanw/esbuild)                           | 3            | 1 (`execFileSync`) |
| [biome](https://github.com/biomejs/biome)                             | 3            | 1 (`spawnSync`)    |
| [Turborepo](https://github.com/vercel/turbo/tree/main/packages/turbo) | 3            | 1 (`execFileSync`) |
| [lightningcss](https://github.com/parcel-bundler/lightningcss)        | 3            | 3                  |
