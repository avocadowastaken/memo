import { MemoCache } from '../MemoCache';
import { runSizedCacheTests } from '../__testutils__/runCacheTests';

runSizedCacheTests((maxSize) => new MemoCache({ maxSize }));

it('allows to convert complex keys', () => {
  const cache = new MemoCache<{ id: number }, number>({
    cacheKeyFn: (key) => key.id,
  });

  for (let i = 0; i < 5; i++) {
    cache.prime({ id: i }, i + 1);
    expect(cache.get({ id: i })).toBe(i + 1);
    cache.clear({ id: i });
    expect(cache.get({ id: i })).toBeUndefined();
  }
});

it('expires values after write', () => {
  let time = 0;
  const cache = new MemoCache({ expireAfterWrite: 10 });
  const spy = jest.spyOn(Date, 'now').mockImplementation(() => time);

  for (let i = 0; i < 5; i++) {
    cache.prime(i, 1);
  }

  time = 5;

  for (let i = 0; i < 5; i++) {
    expect(cache.get(i)).toBe(1);
  }

  time = 10;

  for (let i = 0; i < 5; i++) {
    expect(cache.get(i)).toBeUndefined();
  }

  spy.mockRestore();
});

it('expires values after access', () => {
  let time = 0;
  const cache = new MemoCache({ expireAfterAccess: 10 });
  const spy = jest.spyOn(Date, 'now').mockImplementation(() => time);

  for (let i = 0; i < 5; i++) {
    cache.prime(i, 1);
  }

  time = 5;

  for (let i = 0; i < 5; i++) {
    expect(cache.get(i)).toBe(1);
  }

  time = 10;

  for (let i = 0; i < 5; i++) {
    expect(cache.get(i)).toBe(1);
  }

  time = 20;

  for (let i = 0; i < 5; i++) {
    expect(cache.get(i)).toBeUndefined();
  }

  spy.mockRestore();
});
