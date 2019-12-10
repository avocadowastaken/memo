export function assertFn(fn: unknown): asserts fn is Function {
  if (typeof fn !== 'function') {
    throw new TypeError("Memo: 'fn' expected to be a 'function'.");
  }
}
