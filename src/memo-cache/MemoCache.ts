import { AbstractMemoCache } from "./AbstractMemoCache";
import { LRUCache } from "./internal/LRUCache";
import { MapCache } from "./internal/MapCache";

export type MemoCacheKeyType<TKey> = TKey | string | number;

export type MemoCacheKeyFn<TKey> = (key: TKey) => MemoCacheKeyType<TKey>;

export interface MemoCacheOptions<TKey> {
  readonly maxSize?: number;
  readonly cacheKeyFn?: MemoCacheKeyFn<TKey>;

  readonly expireAfterWrite?: number;
  readonly expireAfterAccess?: number;
}

interface MemoCacheNode<TValue> {
  value: TValue;
  expiresAt: number;
}

export class MemoCache<TKey, TValue> extends AbstractMemoCache<TKey, TValue> {
  protected readonly cache: AbstractMemoCache<
    MemoCacheKeyType<TKey>,
    MemoCacheNode<TValue>
  >;

  protected readonly cacheKeyFn: MemoCacheKeyFn<TKey>;

  protected readonly expireAfterWrite: number;

  protected readonly expireAfterAccess: number;

  public constructor({
    maxSize,

    expireAfterWrite = 0,
    expireAfterAccess = 0,
    cacheKeyFn = (key: TKey) => key,
  }: MemoCacheOptions<TKey> = {}) {
    super();

    this.cacheKeyFn = cacheKeyFn;
    this.expireAfterWrite = expireAfterWrite;
    this.expireAfterAccess = expireAfterAccess;

    this.cache = !maxSize ? new MapCache() : new LRUCache({ maxSize });
  }

  public get(key: TKey): TValue | undefined {
    const node = this.cache.get(this.cacheKeyFn(key));

    if (node) {
      if (node.expiresAt > Date.now()) {
        if (this.expireAfterAccess) {
          node.expiresAt = Math.max(
            node.expiresAt,
            Date.now() + this.expireAfterAccess,
          );
        }

        return node.value;
      }

      this.clear(key);
    }
  }

  public prime(key: TKey, value: TValue): this {
    const expiresAfter = Math.max(
      this.expireAfterWrite || 0,
      this.expireAfterAccess || 0,
    );

    const node = {
      value,
      expiresAt: expiresAfter === 0 ? Infinity : expiresAfter + Date.now(),
    };

    this.cache.prime(this.cacheKeyFn(key), node);

    return this;
  }

  public clear(key: TKey): this {
    this.cache.clear(this.cacheKeyFn(key));

    return this;
  }

  public clearAll(): this {
    this.cache.clearAll();

    return this;
  }
}
