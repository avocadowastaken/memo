import { AbstractMemoCache } from "../AbstractMemoCache";

class LinkedMapNode<K, V> {
  public prev: LinkedMapNode<K, V> | null;

  public next: LinkedMapNode<K, V> | null;

  public constructor(public key: K, public value: V) {
    this.key = key;
    this.value = value;

    this.prev = null;
    this.next = null;
  }
}

export class LinkedMapCache<TKey, TValue> extends AbstractMemoCache<
  TKey,
  TValue
> {
  protected head: null | LinkedMapNode<TKey, TValue> = null;

  protected tail: null | LinkedMapNode<TKey, TValue> = null;

  protected map = new Map<TKey, LinkedMapNode<TKey, TValue>>();

  public get(key: TKey): TValue | undefined {
    const node = this.map.get(key);

    return node ? node.value : undefined;
  }

  protected unlinkNode(acc: LinkedMapNode<TKey, TValue>) {
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

  protected insert(key: TKey, value: TValue) {
    let node: LinkedMapNode<TKey, TValue> | undefined = this.map.get(key);

    if (node) {
      node.value = value;

      this.unlinkNode(node);
    } else {
      node = new LinkedMapNode<TKey, TValue>(key, value);

      this.map.set(key, node);
    }

    return node;
  }

  public prime(key: TKey, value: TValue): this {
    const node = this.insert(key, value);

    node.next = this.head;
    node.prev = null;

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
    this.head = null;
    this.tail = null;

    return this;
  }
}
