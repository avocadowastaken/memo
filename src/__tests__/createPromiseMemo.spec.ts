import { createPromiseMemo } from '../createPromiseMemo';
import { PromiseMemoCache } from '../PromiseMemoCache';

it("validates 'fn'", () => {
  expect(() =>
    createPromiseMemo(null as any),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Memo: 'fn' expected to be a 'function'."`,
  );
});

it('exposes cache', () => {
  const memo = createPromiseMemo(() => Promise.resolve());

  expect(memo.cache).toBeInstanceOf(PromiseMemoCache);
});

it("evaluates 'fn'", async () => {
  const fn = jest.fn(value => value + 1);
  const memo = createPromiseMemo(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  expect(memo(0)).toBeInstanceOf(Promise);
  expect(memo(0)).toBeInstanceOf(Promise);
  expect(memo(0)).toBeInstanceOf(Promise);
  await expect(memo(0)).resolves.toBe(1);

  expect(fn).toHaveBeenCalledTimes(1);
});
