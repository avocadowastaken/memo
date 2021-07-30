import { PromiseMemoCache } from "../PromiseMemoCache";

it("primes values as promise", async () => {
  const cache = new PromiseMemoCache<string, string>();

  expect(await cache.get("foo")).toBeUndefined();
  expect(await cache.get("bar")).toBeUndefined();

  expect(cache.prime("foo", "bar")).toBe(cache);
  expect(cache.prime("bar", Promise.resolve("baz"))).toBe(cache);

  await expect(cache.get("foo")).resolves.toBe("bar");
  await expect(cache.get("bar")).resolves.toBe("baz");
});

it("removes rejected values", async () => {
  const cache = new PromiseMemoCache<string, string>();

  expect(cache.prime("foo", Promise.reject(new Error("Rejected")))).toBe(cache);

  expect(cache.get("foo")).toBeInstanceOf(Promise);

  await expect(cache.get("foo")).rejects.toThrow("Rejected");

  expect(cache.get("foo")).toBeUndefined();
});
