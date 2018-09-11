/**
 * ItemCollection Embedded-Array 版本
 */

import { mixin } from '../decorators/mixin.ts';
import Item from '../graphic/Item.ts';

const _items = Symbol('_items');
const _buffered = Symbol('_buffered');
const arrMethods = {};
const arr = Array.prototype;

//Inject Array methods into ItemCollection.
['splice', 'push', 'unshift', 'sort', 'map', 'forEach', 'find', 'reduce', 'reduceRight', 'filter', 'includes'].forEach(
  method =>
    (arrMethods[method] = function() {
      return arr[method].apply(this[_items], arguments);
    })
);

/**
 * path collection of canvas.
 * Behavior like an array.
 */
@mixin(arrMethods)
class ItemCollection {
  [_items] = [];
  [_buffered] = [];

  /**
   * Compare 2 ItemCollection by id
   *
   * @param {ItemCollection} left
   * @param {ItemCollection} right
   */
  static diff(left, right) {
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
  constructor(layer, items) {
    if (items) this[_items] = items;

    this.layer = layer;
  }

  /**
   * Get length of items.
   */
  get length() {
    return this[_items].length;
  }

  /**
   * Internal getter, visit item-array directly
   */
  get array() {
    return this[_items];
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
    this[_items] = Array.from(new Set(this[_items]));
  }

  /*
  * Implements iterator.
  **/
  *[Symbol.iterator]() {
    for (let i = 0, len = this[_items].length; i < len; i++) {
      yield this[_items][i];
    }
  }

  /**
   * Compare with other ItemCollection.
   * @param {ItemCollection} other
   */
  diff(other) {
    return ItemCollection.diff(this, other);
  }

  /**
   * Get item via index, equal to this[index]
   * @param {Number} index
   */
  get(index) {
    return this[_items][index];
  }

  /**
   * Set item at specified position,
   * @param {Number} index, specified position
   * @param {Item} item, whiteboard item to be add.
   */
  set(item, index) {
    if (this[_items][index] === item) return false;

    if (typeof index === 'undefined') {
      //add same item only once.
      if (this.includes(item)) return false;
      return this.add(item);
    }

    item.layer = this.layer;
    this[_items][index] = item;

    if (process.env.NODE_ENV === 'development') {
      this[index] = item;
    }

    this.changed();
    return true;
  }

  /**
   * Add whiteboard item.
   * @param {Item} item
   */
  add(item) {
    if (!(item instanceof Item)) throw new TypeError('Only Item can add to Collection!');

    item.layer = this.layer;
    this[_items].push(item);

    if (process.env.NODE_ENV === 'development') {
      let index = this[_items].length - 1;
      this[index] = item;
    }

    this.changed();
    return this;
  }

  buffer(item) {
    if (!(item instanceof Item)) throw new TypeError('Only Item can add to Collection!');

    item.layer = this.layer;
    this[_buffered].push(item);
    this.changed();
    return this;
  }

  flush() {
    this[_items].push(...this[_buffered]);
    this[_buffered] = [];
  }

  /**
   * Clear items.
   */
  clear() {
    this[_items] = [];
    this[_buffered] = [];
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
   * @param {Item} item1
   */
  remove(item1) {
    return this.delete(item2 => item2 === item1);
  }

  /**
   * Remove item at specified index.
   * @param {Item} item1
   */
  removeAt(index) {
    let item = this[_items][index];
    this.remove(item);
    return item;
  }

  /**
   * Delete items of current collection.
   * It will trigger layer-refresh;
   * @param {Function} fn, filter determine which item should be removed.
   */
  delete(fn) {
    let deleted = new ItemCollection();

    this[_items] = this[_items].filter(item => {
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
    return this.delete(item => item.selected);
  }

  /**
   * Delete items by ids.
   * @param {Array} ids
   */
  deleteById(ids = []) {
    return this.delete(item => ids.includes(item.id));
  }

  /**
   * Return the JSON-format information of current collection.
   */
  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default ItemCollection;
