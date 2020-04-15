import { MemoCache } from './MemoCache';

export class PromiseMemoCache<TKey, TValue> extends MemoCache<
  TKey,
  Promise<TValue>
> {
  prime(key: TKey, value: TValue | Promise<TValue>): this {
    return super.prime(
      key,
      Promise.resolve(value).catch((error) => {
        this.clear(key);

        return Promise.reject(error);
      }),
    );
  }
}
