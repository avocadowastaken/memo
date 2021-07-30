import { MapLike } from "../MapLike";

const MAX_SIZE = 5;

export function runBaseCacheTests(
  factory: () => MapLike<number, number>
): void {
  it("primes value", () => {
    const cache = factory();

    for (let i = 0; i < MAX_SIZE; i++) {
      expect(cache.get(i)).toBeUndefined();
      expect(cache.prime(i, i + 1)).toBe(cache);
      expect(cache.get(i)).toBe(i + 1);
    }
  });

  it("clears value", () => {
    const cache = factory();

    for (let i = 0; i < MAX_SIZE; i++) {
      expect(
        cache

          .prime(i, i + 1)
          .clear(i)
          .get(i)
      ).toBeUndefined();
    }
  });

  it("not throws on clear if value not exist", () => {
    expect(() => factory().clear(1)).not.toThrow();
  });

  it("clears all values", () => {
    const cache = factory();

    for (let i = 0; i < MAX_SIZE; i++) {
      cache.prime(i, i + 1);
    }

    cache.clearAll();

    for (let i = 0; i < MAX_SIZE; i++) {
      expect(cache.get(i)).toBeUndefined();
    }
  });
}

export function runSizedCacheTests(
  factory: (maxSize: number) => MapLike<number, number>
): void {
  runBaseCacheTests(() => factory(MAX_SIZE));

  it("removes outdated values", () => {
    const cache = factory(MAX_SIZE);

    for (let i = 1; i <= MAX_SIZE; i++) {
      cache.prime(i, i + 1);
    }

    for (let i = 1; i <= MAX_SIZE; i++) {
      expect(cache.get(i)).toBe(i + 1);
    }

    for (let i = MAX_SIZE + 1; i <= MAX_SIZE * 2; i++) {
      cache.prime(i, i + 1);
    }

    for (let i = 1; i <= MAX_SIZE; i++) {
      expect(cache.get(i)).toBeUndefined();
    }

    for (let i = MAX_SIZE + 1; i <= MAX_SIZE * 2; i++) {
      expect(cache.get(i)).toBe(i + 1);
    }
  });
}
