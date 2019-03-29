import { CacheLike } from "../CacheLike";

interface LinkedMapNode<TKey, TValue> {
  key: TKey;
  value: TValue;
  prev?: LinkedMapNode<TKey, TValue>;
  next?: LinkedMapNode<TKey, TValue>;
}

export class LinkedMapCache<TKey, TValue> implements CacheLike<TKey, TValue> {
  protected head?: LinkedMapNode<TKey, TValue>;

  protected tail?: LinkedMapNode<TKey, TValue>;

  protected map = new Map<TKey, LinkedMapNode<TKey, TValue>>();

  public get(key: TKey): TValue | undefined {
    const node = this.map.get(key);

    return node ? node.value : undefined;
  }

  protected unlinkNode(acc: LinkedMapNode<TKey, TValue>): void {
    if (acc.prev) {
      acc.prev.next = acc.next;
    } else {
      this.head = acc.next;
    }

    if (acc.next) {
      acc.next.prev = acc.prev;
    } else {
      this.tail = acc.prev;
    }
  }

  protected insert(key: TKey, value: TValue): LinkedMapNode<TKey, TValue> {
    let node: LinkedMapNode<TKey, TValue> | undefined = this.map.get(key);

    if (node) {
      node.value = value;

      this.unlinkNode(node);
    } else {
      node = { key, value };

      this.map.set(key, node);
    }

    return node;
  }

  public prime(key: TKey, value: TValue): this {
    const node = this.insert(key, value);

    node.next = this.head;
    node.prev = undefined;

    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  public clear(key: TKey): this {
    const node = this.map.get(key);

    if (node) {
      this.map.delete(key);
      this.unlinkNode(node);
    }

    return this;
  }

  public clearAll(): this {
    this.map.clear();
    this.head = undefined;
    this.tail = undefined;

    return this;
  }
}
