// Polyfill Web Crypto API for Jest running on Node.js 18.x
// Node exposes it as `require('crypto').webcrypto` but does not set
// the global `crypto` binding that Jest's test environment expects.
if (!globalThis.crypto) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { webcrypto } = require("crypto");
  globalThis.crypto = webcrypto;
}
