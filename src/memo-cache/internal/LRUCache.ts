import { LinkedMapCache } from "./LinkedMapCache";

export interface LRUCacheOptions {
  readonly maxSize: number;
}

export class LRUCache<TKey, TValue> extends LinkedMapCache<TKey, TValue> {
  protected readonly options: LRUCacheOptions;

  public constructor(options: LRUCacheOptions) {
    super();

    this.options = options;
  }

  public get(key: TKey): TValue | undefined {
    const node = this.map.get(key);

    if (!node) {
      return undefined;
    }

    this.prime(key, node.value);

    return node.value;
  }

  private removeLatterlyUsed(): void {
    const { maxSize } = this.options;
    const itemsToRemove = this.map.size - maxSize + 1;

    if (itemsToRemove > 0) {
      const entries = this.map.entries();

      for (let i = 0; i < itemsToRemove; i++) {
        const {
          value: [key],
        } = entries.next();

        this.clear(key);
      }
    }
  }

  public prime(key: TKey, value: TValue): this {
    if (!this.map.has(key)) {
      this.removeLatterlyUsed();
    }

    return super.prime(key, value);
  }
}
