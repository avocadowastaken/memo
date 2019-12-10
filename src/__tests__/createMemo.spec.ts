import { createMemo } from '../createMemo';
import { MemoCache } from '../MemoCache';

it("validates 'fn'", () => {
  expect(() => createMemo(null as any)).toThrowErrorMatchingInlineSnapshot(
    `"Memo: 'fn' expected to be a 'function'."`,
  );
});

it('exposes cache', () => {
  const memo = createMemo(() => null);

  expect(memo.cache).toBeInstanceOf(MemoCache);
});

it("evaluates 'fn'", () => {
  const fn = jest.fn(value => value + 1);
  const memo = createMemo(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  expect(memo(1)).toBe(2);
  expect(memo(1)).toBe(2);
  expect(memo(1)).toBe(2);

  expect(fn).toHaveBeenCalledTimes(1);
});
