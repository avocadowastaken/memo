import { AbstractMemoCache } from "../AbstractMemoCache";

export class MapCache<TKey, TValue> extends AbstractMemoCache<TKey, TValue> {
  protected map = new Map<TKey, TValue>();

  public get(key: TKey): TValue | undefined {
    return this.map.get(key);
  }

  public prime(key: TKey, value: TValue): this {
    this.map.set(key, value);

    return this;
  }

  public clear(key: TKey): this {
    this.map.delete(key);

    return this;
  }

  public clearAll(): this {
    this.map.clear();

    return this;
  }
}
