/**
 * ItemCollection Embedded-Array 版本
 */

import { mixin } from '../decorators/mixin';
import Item from '../graphic/Item';


const _items = Symbol('_items');
const arrMethods = {};
const arr = Array.prototype;

['splice', 'push', 'unshift', 'sort', 'map', 'forEach', 'find', 'reduce', 'reduceRight']
  .forEach(method => arrMethods[method] = function () {
    return arr[method].apply(this[_items], arguments);
  });

/**
 * path collection of canvas.
 * Behavior like an array.
 */
@mixin(arrMethods)
class ItemCollection {

  [_items] = [];

  static diff(left, right) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  static includes() {
    return !!ids.find(i => i === id);
  }


  constructor(items = null, layer) {
    if (items) this[_items] = items;

    ['forEach', 'find', 'reduce', 'map']
      .forEach(method =>
        this[method] = function () {
          return arr[method].apply(this[_items], arguments);
        });
  }

  get length() { return this[_items].length; }

  /**
   * All items-collection change ,will trigger whiteboard re-draw.
   */
  changed() {
    this.layer && this.layer.refresh();
  }

  filter() {
    return new ItemCollection(arr[method].apply(this[_items], arguments), this.layer);
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this[_items].length; i < len; i++) {
      yield this[_items][i];
    }
  }

  /**
   * If contains item.
   * @param {Item} item
   */
  contains(item1) {
    return !!this[_items].find(item => item === item1);
  }


  /**
   * Compare with other ItemCollection.
   * @param {ItemCollection} other
   */
  diff(other) {
    ItemCollection.diff(this, other);
  }

  /**
   * Get item via index, equal to this[index]
   * @param {Number} index
   */
  get(index) {
    return this[_items][index];
  }

  /**
   * Add whiteboard item.
   * @param {Item} item
   */
  add(item) {
    if (!item instanceof Item)
      throw new Error('Only Item can add to Collection!');

    item.layer = this.layer;
    this[_items].push(item);
    // let index = this[_items].length - 1;
    // this[index] = item;

    this.changed();
    return this;
  }

  /**
   * Clear items.
   */
  clear() {
    this[_items] = [];
    this.changed();
    return this;
  }

  /**
   * Select All items, support keyboard event Ctrl+A.
   */
  selectAll() {
    this.forEach(item => item.selected = true);
  }

  /**
   * anti-select current collection.
   */
  antiSelect() {
    this.forEach(item => item.selected = !item.selected);
  }

  /**
   * unselect all items.
   */
  unselect() {
    this.forEach(item => item.selected = false);
  }

  /**
   * Delete items of current collection.
   * It will trigger layer-refresh;
   * @param {Function} fn, filter determine which item should be removed.
   */
  delete(fn) {
    let deleted = new ItemCollection;

    this[_items] = this[_items].filter(item => {
      if (fn(item)) return true;
      deleted.add(item.hash);
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
    return this.delete((item) => item.selected);
  }

  /**
   * Delete items by ids.
   * @param {Array} ids
   */
  deleteById(ids) {
    return this.delete((item) => ItemCollection.includes(ids, item.id));
  }

  /**
   * Return the JSON-format information of current collection.
   */
  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default ItemCollection;


