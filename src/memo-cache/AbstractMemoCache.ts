export abstract class AbstractMemoCache<TKey, TValue> {
  public abstract get(key: TKey): TValue | undefined;

  public abstract prime(key: TKey, value: TValue): this;

  public abstract clear(key: TKey): this;

  public abstract clearAll(): this;
}
