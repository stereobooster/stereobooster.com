---
title: "JavaScript key-value store"
date: 2024-01-02T14:00:00
tags: [js, data-structure, webdev]
---

Unsorted notes about key-value stores in JavaScript.

- Basic
  - `Object.create(null)`, `Map`, `WeakMap`
- Can be persisted to the disc
  - [keyv](https://github.com/jaredwray/keyv)
  - [Level](https://github.com/Level/awesome/#stores)
  - alternative runtimes (Deno, BUN)
    - SQLite: [great.db](https://www.npmjs.com/package/great.db)
  - compression
    - [snappy](https://github.com/Brooooooklyn/snappy)
    - [zstd](https://github.com/OneIdentity/zstd-js)
- LRU
  - small
    - [flru](https://github.com/lukeed/flru)
  - fast
    - [lru-native2](https://www.npmjs.com/package/lru-native2)
    - benchmark
      - [bench-lru](https://github.com/dominictarr/bench-lru#results) (Outdated)
  - data structure
    - [mnemonist/lru-map](https://yomguithereal.github.io/mnemonist/lru-map)
    - [javascript-algorithms/lru-cache](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/lru-cache)
    - related
      - [js-sdsl](https://js-sdsl.org/)
      - [scl.js](https://samvv.github.io/scl.js/)
- hashing algorithm
  - fast
    - [@node-rs/xxhash](https://www.npmjs.com/package/@node-rs/xxhash)
    - [xxhash-wasm](https://www.npmjs.com/package/xxhash-wasm)
  - small
    - [cyrb53](https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js)
