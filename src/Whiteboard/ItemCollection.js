import { mixin } from '../decorators/mixin';
import Item from '../graphic/Item';

const arrMethods = {};
const arr = Array.prototype;
['splice', 'push', 'sort', 'map', 'forEach', 'find', 'reduce', 'reduceRight']
  .forEach(method => arrMethods[method] = arr[method]);

/**
 * path collection of canvas.
 * Behavior like an array.
 *
 */
@mixin(arrMethods)
class ItemCollection {

  length = 0;

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
   * @param {*} collection
   * @param {*} item
   */
  static includes(ids, id) {
    return !!ids.find(i => i === id);
  }

  constructor(items, layer) {
    if (items) items.forEach(item => this.add(item));
    this.layer = layer;
  }

  /**
   * All items-collection change ,will trigger whiteboard re-draw.
   */
  changed() {
    this.layer && this.layer.markAsDirty();
  }

  /**
   * Append Items to a canvas layer.
   * @param {Layer} layer
   */
  appendTo(layer) {
    this.layer = layer;
    this.forEach(item => layer.items.add(item));
  }

  /**
   * return filtered ItemCollection
   */
  filter() {
    return new ItemCollection(arr.filter.apply(this, arguments));
  }

  /**
   * support iterator
   */
  *[Symbol.iterator]() {
    for (let i = 0, len = this.length; i < len; i++) {
      yield this[i];
    }
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
    return this[index];
  }

  /**
   * Add whiteboard item.
   * @param {*} item
   */
  add(item) {
    if (!item instanceof Item)
      throw new Error('Only Item can add to Collection!');

    item.layer = this.layer;
    this.push(item);
    this.changed();
    return this;
  }

  /**
   * Clear whiteboard item.
   */
  clear() {
    this.splice(0, this.length);
    this.changed();
    return this;
  }

  /**
   * Select All items, support keyboard event Ctrl+A.
   */
  selectAll() {
    this.forEach(item => item.selected = true);
    this.changed();
    return this;
  }

  /**
   * anti-select current collection.
   */
  antiSelect() {
    this.forEach(item => item.selected = !item.selected);
    this.changed();
    return this;
  }

  /**
   * unselect all items.
   */
  unselect() {
    this.forEach(item => item.selected = false);
    this.changed();
    return this;
  }

  /**
   * Remove specified item from list.
   * @param {Item} item1
   */
  remove(item1) {
    this.delete(item2 => item2 === item1);
  }

  /**
   * Delete items of current collection.
   * It will trigger layer-refresh;
   * @param {Function} fn, filter determine which item should be removed.
   */
  delete(fn) {
    let deleted = new ItemCollection;

    for (let i = 0, len = this.length; i < len; i++) {
      let item = this.get(i);
      if (fn(item)) {
        this.splice(i--, 1); // delete one item and re-assign current index
        len--; //re-assign collection length
        deleted.push(item);
      }
    }

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
