---
title: "Runtime type validators"
date: 2023-09-22T06:49:17+02:00
draft: false
tags: ["typescript", "type-system", "listicle"]
---

## Where can be used

- validate http request from client (at server side)
- validate http response from server (at client side)
- validate data from untyped storage, for example localStorage, JSON columns in DB, etc.
- validate env variables
- validate CLI arguments
- validate configuration files
  - Bonus: one can generate JSON Schema from validator and use it for autocomplete in IDE. For example, [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
- validate data from URL (query params)
- validate user input (forms)
- generate fake data (complex shape)

## Features

- Basic validation - can validate static types at runtime (can be restricted to JSON type)
- Serialisation / deserialisation - for example, TS/JS supports `Date`, but JSON doesn't. So you need to do conversion in order to support it
- Compatibility with other schemas - there are tools which can convert from- or to- another schemas, for example JSONSchema, OpenAPI etc
- Strict or permissive mode - would object be accepted if it contains extra fields
- Helpful error messages - if in case of failed validation it points what exactly went wrong or simply dismisses the input
- AOT (ahead of time) - can it use type information in order to produce validation libraries or faster serialiser, deserialiser
- Custom types - can user create custom types, for example type for email, instead of string

## Libraries

Not a full list, but rather a high level overview

### Fast

- [typia](https://github.com/samchon/typia)
  - Doesn't need extra schema definition. Uses AOT to generate validators, serialisers and deserialisers directly from TypeScript types
  - Supports protocol buffers
- [typebox](https://github.com/sinclairzx81/typebox)
  - Supports all JSON, JS, JSONSchema, but for TS discriminated unions you need to use [typebox-validators](https://github.com/jtlapp/typebox-validators)
  - Can use JIT (and AOT?)
- [ts-runtime-checks](https://github.com/GoogleFeud/ts-runtime-checks)
  - Uses AOT

See: [Runtype Benchmarks](https://moltar.github.io/typescript-runtime-type-benchmarks/)

### Popular

- [zod](https://github.com/colinhacks/zod). For example, integrates with [Astro](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod), [Drizzle](https://orm.drizzle.team/docs/zod), [trpc](https://trpc.io/docs/server/validators#with-zod)
  - [ecosystem](https://zod.dev/ecosystem)
- [yup](https://github.com/jquense/yup)
- [ajv](https://github.com/ajv-validator/ajv)

### Small

- [valibot](https://valibot.dev/guides/comparison/)

### Fake data

- zod: [Zocker](https://zocker.sigrist.dev/) and [others](https://npm-compare.com/@anatine/zod-mock,zocker,zod-fixture,zod-schema-faker)
- yup: [yup-schema-faker](https://github.com/soc221b/yup-schema-faker), [yup-faker](https://github.com/mauricedb/yup-faker)

### Other

- [typeschema](https://typeschema.com/)
- [standard-schema](https://github.com/standard-schema/standard-schema)
- [arktype](https://github.com/arktypeio/arktype)
- [sury](https://github.com/DZakh/sury)
- [adonisjs/validator](https://github.com/adonisjs/validator)
- [io-ts](https://github.com/gcanti/io-ts) and [newtype-ts](https://github.com/gcanti/newtype-ts)
- [deepkit runtime types](https://docs.deepkit.io/english/runtime-types.html)
- [runtypes](https://github.com/pelotom/runtypes)
- [superstruct](https://github.com/ianstormtaylor/superstruct)
- [safen](https://github.com/denostack/safen)
- [rescript-struct](https://github.com/DZakh/rescript-struct)
- [ts-json-validator](https://github.com/ostrowr/ts-json-validator)
- [valita](https://github.com/badrap/valita)
- [to-typed](https://github.com/jsoldi/to-typed)
- [fastest-validator](https://github.com/icebob/fastest-validator)
- [runtypes](https://github.com/sant123/runtypes)
- [computed_types](https://github.com/neuledge/computed-types)
- [subshape](https://github.com/paritytech/subshape)
- [effect-ts/schema](https://github.com/effect-ts/schema)
- [TypeRunner](https://github.com/marcj/TypeRunner)
- [jointz](https://github.com/moodysalem/jointz)
- [ts-auto-guard](https://github.com/rhys-vdw/ts-auto-guard)
- [tserial](https://github.com/lukeautry/tserial)
- [ts-runtime](https://github.com/fabiandev/ts-runtime)

## Related

- [type-o-rama](https://github.com/stereobooster/type-o-rama)
