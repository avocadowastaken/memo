export interface MapLike<TKey, TValue> {
  get: (key: TKey) => TValue | undefined;
  prime: (key: TKey, value: TValue) => this;
  clear: (key: TKey) => this;
  clearAll: () => this;
}
