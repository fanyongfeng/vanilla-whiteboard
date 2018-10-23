/**
 * ItemCollection Embedded-Array 版本
 */

import { mixin } from '../decorators/mixin';
import Item from '../graphic/Item';
import Layer from './Layer';

// type MethodKey = 'splice'|'push'|'unshift'|'sort'|'map'|'forEach'|'find'|'reduce'|'reduceRight'|'filter'|'includes'

// type ArrayProto<T = any> = {
//   [key in MethodKey]: Array<T>[key]
// }


interface ItemCollection {
  forEach(callbackfn: (value: Item) => void, thisArg?: any): void;
  map(callbackfn: (value: Item, index: number) => any, thisArg?: any): Item[];
  includes(value: Item, Index?: number): boolean;
  filter(callbackfn: (value: Item, index: number) => boolean , thisArg?: any): Item[];
  find(callbackfn: (value: Item, index: number) => boolean, thisArg?: any): Item;
}

const arrMethods = {
};
const arr = Array.prototype;

//Inject Array methods into ItemCollection.
['splice', 'push', 'unshift', 'sort', 'map', 'forEach', 'find', 'reduce', 'reduceRight', 'filter', 'includes'].forEach(
  method =>
    (arrMethods[method] = function () {
      return arr[method].apply(this['items'], arguments);
    })
);


/**
 * path collection of canvas.
 * Behavior like an array.
 */
@mixin(arrMethods)
class ItemCollection {
  public layer: Layer
  private items: Item[] = [];
  private buffered: Item[] = [];

  // private includes: () => Array<Item>;

  /**
   * Compare 2 ItemCollection by id
   *
   * @param left
   * @param right
   */
  static diff(left: ItemCollection, right: ItemCollection) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  /**
   *
   * @param {Array} items
   * @param {Layer} layer
   */
  constructor(layer?, items?) {
    if (items) this.items = items;

    this.layer = layer;
  }

  /**
   * Get length of items.
   */
  get length() {
    return this.items.length;
  }

  /**
   * Internal getter, visit item-array directly
   */
  get array() {
    return this.items;
  }

  /**
   * All items-collection change ,will trigger whiteboard re-draw.
   */
  changed() {
    this.layer && this.layer.markAsDirty();
  }

  /**
   * filter duplicated items
   */
  distinct() {
    this.items = Array.from(new Set(this.items));
  }

  /*
  * Implements iterator.
  **/
  *[Symbol.iterator]() {
    for (let i = 0, len = this.items.length; i < len; i++) {
      yield this.items[i];
    }
  }

  /**
   * Compare with other ItemCollection.
   * @param other
   */
  diff(other: ItemCollection) {
    return ItemCollection.diff(this, other);
  }

  /**
   * Get item via index, equal to this[index]
   * @param index
   */
  get(index: number) {
    return this.items[index];
  }

  /**
   * Set item at specified position,
   * @param index, specified position
   * @param item, whiteboard item to be add.
   */
  set(item: Item, index: number) {
    if (this.items[index] === item) return false;

    if (typeof index === 'undefined') {
      //add same item only once.
      if (this.includes(item)) return false;
      return this.add(item);
    }

    item.layer = this.layer;
    this.items[index] = item;
    //@ts-ignore
    if (!IS_PRODUCTION) {
      this[index] = item;
    }

    this.changed();
    return true;
  }

  /**
   * Add whiteboard item.
   * @param item
   */
  add(item: Item) {
    // if (!(item instanceof Item)) throw new TypeError('Only Item can add to Collection!');

    item.layer = this.layer;
    this.items.push(item);
    //@ts-ignore
    if (!IS_PRODUCTION) {
      let index = this.items.length - 1;
      this[index] = item;
    }

    this.changed();
    return this;
  }

  buffer(item: Item) {
    if (!(item instanceof Item)) throw new TypeError('Only Item can add to Collection!');

    item.layer = this.layer;
    this.buffered.push(item);
    this.changed();
    return this;
  }

  flush() {
    this.items.push(...this.buffered);
    this.buffered = [];
  }

  /**
   * Clear items.
   */
  clear() {
    this.items = [];
    this.buffered = [];
    this.changed();
    return this;
  }

  /**
   * Select All items, support keyboard event Ctrl+A.
   */
  selectAll() {
    this.forEach(item => (item.selected = true));
  }

  /**
   * anti-select current collection.
   */
  antiSelect() {
    this.forEach(item => (item.selected = !item.selected));
  }

  /**
   * unselect all items.
   */
  unselect() {
    this.forEach(item => (item.selected = false));
  }

  /**
   * Remove specified item from list.
   * @param item1
   */
  remove(targetItem: Item) {
    return this.delete(item => item === targetItem);
  }

  /**
   * Remove item at specified index.
   * @param index
   */
  removeAt(index: number) {
    let item = this.items[index];
    this.remove(item);
    return item;
  }

  /**
   * Delete items of current collection.
   * It will trigger layer-refresh;
   * @param fn, filter determine which item should be removed.
   */
  delete(fn: (item: Item) => boolean) {
    let deleted = new ItemCollection();

    this.items = this.items.filter(item => {
      if (!fn(item)) return true;
      deleted.add(item);
      return false;
    });

    this.changed();
    return deleted;
  }

  /**
   *
   * Delete selected items of current collection.
   */
  deleteSelected() {
    const deleted = this.delete(item => item.selected);
    this.layer.globalCtx.emit('items:delete', deleted.map(item => item.id));
    return deleted;
  }

  /**
   * Delete items by ids.
   * @param {Array} ids
   */
  deleteById(ids: number[] = []) {
    return this.delete(item => !~ids.lastIndexOf(item.id));
  }

  /**
   * Return the JSON-format information of current collection.
   */
  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default ItemCollection;
