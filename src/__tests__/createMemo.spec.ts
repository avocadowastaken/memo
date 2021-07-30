import { createMemo } from "../createMemo";
import { MemoCache } from "../MemoCache";

it("exposes cache", () => {
  const memo = createMemo(() => null);

  expect(memo.cache).toBeInstanceOf(MemoCache);
});

it("evaluates 'fn'", () => {
  const fn = jest.fn((value: number) => value + 1);
  const memo = createMemo(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  expect(memo(1)).toBe(2);
  expect(memo(1)).toBe(2);
  expect(memo(1)).toBe(2);

  expect(fn).toHaveBeenCalledTimes(1);
});
