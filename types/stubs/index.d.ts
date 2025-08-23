declare module 'node:test' {
  const test: any;
  export default test;
  export const mock: any;
}

declare module 'node:assert' {
  const assert: any;
  export = assert;
}

declare module 'three';
declare module 'cannon-es';
declare module 'socket.io-client';
declare module 'semver';
declare module 'stats.js';
declare module 'webxr';
