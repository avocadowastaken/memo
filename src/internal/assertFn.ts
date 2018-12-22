export function assertFn(fn: unknown): void {
  if (typeof fn !== "function") {
    throw new TypeError("Memo: 'fn' expected to be a 'function'.");
  }
}
