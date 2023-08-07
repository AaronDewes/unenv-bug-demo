# Bug in unenv

This tries to reproduce a bug in unenv.

To build:

`pnpm run build`

To run:

`cd .output && deno run -A server/index.ts`

This fails with `webcrypto.randomUUID is not a function`.

If you look at the generated code, you can see

```JavaScript
const CryptoKey = globalThis.CryptoKey;
const webcrypto = {
  CryptoKey,
  ...globalThis.crypto
};
```

However, with Deno, `...globalThis.crypto` is not working, because Deno has special measures to prevent any globalThis.crypto function from being passed anywhere else.

Deno prevents this, which works fine in Node:

```JavaScript
> const func = globalThis.crypto.randomUUID
undefined
> func()
Uncaught TypeError: Illegal invocation
    at Module.assertBranded (ext:deno_webidl/00_webidl.js:1013:11)
    at randomUUID (ext:deno_crypto/00_crypto.js:4729:12)
    at <anonymous>:2:1
> 
```
