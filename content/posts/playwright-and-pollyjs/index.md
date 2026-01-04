---
title: "Playwright and PollyJS"
date: 2026-01-04T15:39:53+01:00
description: "Integration of Playwright and PollyJS"
tags: [playwright, testing]
---

Integration of Playwright and PollyJS.

**Idea**: Ability to create snapshots for network the same way as Playwright provides snapshots and screenshots. By default it will capture snapshot once on the initial run and replay after.

Later one would need to use special command to update snapshots:

```
npx playwright test --update-snapshots
```

Key code to aproximate this behavious is:

```ts
const info = test.info();

let mode: MODE;
let recordIfMissing = true;
switch (info.config.updateSnapshots) {
  case 'all':
  case 'changed':
    mode = 'record';
    break;
  case 'missing':
    mode = 'replay';
    break;
  case 'none':
  default:
    mode = 'replay';
    recordIfMissing = false;
    break;
}

const polly = new Polly(info.title, {
  recordIfMissing,
  mode,
  //...
```

## Issues

### Limited way to filter requests

I had to do following:

```ts
routesToIntercept: (url: URL) => {
  if (url.href.match(/\.json$/)) return true;
  if (url.href.startsWith("http://localhost")) return false;
  if (url.href.match(/\.[^\/\.:\?]+$/)) return false;
  return true;
},
```

I would instead prefer to filter by response `Content-Type === application/json`. In order to not catch `html`, `js` etc.

### No way to mask/modify response

For example, if one has endpoint which private data, like `/me.json`, `/aws_session.json` etc.

Or if one endpoint changes response everytime, for example, it has date time field.

## Final code

```ts
export { expect } from "@playwright/test";
import { test as base } from "@playwright/test";

import { join, resolve } from "node:path";
import { MODE, Polly } from "@pollyjs/core";
import { PlaywrightAdapter } from "polly-adapter-playwright";
import FSPersister from "@pollyjs/persister-fs";

Polly.register(PlaywrightAdapter);
Polly.register(FSPersister);

export const test = base.extend<{
  polly: void;
}>({
  polly: [
    async ({ page }, use) => {
      const info = test.info();

      let mode: MODE;
      let recordIfMissing = true;
      switch (info.config.updateSnapshots) {
        case "all":
        case "changed":
          mode = "record";
          break;
        case "missing":
          mode = "replay";
          break;
        case "none":
        default:
          mode = "replay";
          recordIfMissing = false;
          break;
      }

      const polly = new Polly(info.title, {
        recordIfMissing,
        mode,
        adapters: ["playwright"],
        adapterOptions: {
          playwright: {
            context: page,
            routesToIntercept: (url: URL) => {
              if (url.href.match(/\.json$/)) return true;
              if (url.href.startsWith("http://localhost")) return false;
              if (url.href.match(/\.[^\/\.:\?]+$/)) return false;
              return true;
            },
          },
        },
        flushRequestsOnStop: true,
        logLevel: "SILENT", // 'INFO',
        recordFailedRequests: false,
        persister: "fs",
        persisterOptions: {
          keepUnusedRequests: false,
          disableSortingHarEntries: false,
          fs: {
            recordingsDir: join(
              info.config.rootDir,
              "__recordings__",
              info.titlePath[0]
            ),
          },
        },
        matchRequestsBy: {
          method: true,
          headers: false,
          body: true,
          order: false,
        },
      });

      await use();

      await polly.stop();
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});
```
