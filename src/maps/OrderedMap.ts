import { MapLike } from "../MapLike";

export class OrderedMap<TKey, TValue> implements MapLike<TKey, TValue> {
  protected map = new Map<TKey, TValue>();

  get(key: TKey): TValue | undefined {
    return this.map.get(key);
  }

  prime(key: TKey, value: TValue): this {
    this.map.set(key, value);

    return this;
  }

  clear(key: TKey): this {
    this.map.delete(key);

    return this;
  }

  clearAll(): this {
    this.map.clear();

    return this;
  }
}
