import { LinkedMap } from "./LinkedMap";

export interface LRUCacheOptions {
  readonly maxSize: number;
}

export class LRUMap<TKey, TValue> extends LinkedMap<TKey, TValue> {
  protected readonly options: LRUCacheOptions;

  constructor(options: LRUCacheOptions) {
    super();

    this.options = options;
  }

  get(key: TKey): TValue | undefined {
    const node = this.map.get(key);

    if (!node) {
      return undefined;
    }

    this.prime(key, node.value);

    return node.value;
  }

  private removeLatterlyUsed(): void {
    const { maxSize } = this.options;
    let itemsToRemove = this.map.size - maxSize + 1;

    if (itemsToRemove > 0) {
      for (const key of this.map.keys()) {
        if (itemsToRemove-- > 0) {
          this.clear(key);
        } else {
          break;
        }
      }
    }
  }

  prime(key: TKey, value: TValue): this {
    if (!this.map.has(key)) {
      this.removeLatterlyUsed();
    }

    return super.prime(key, value);
  }
}
