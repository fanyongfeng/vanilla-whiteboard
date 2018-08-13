import {mixin} from '../decorators/mixin';

const arrMethods = {};
['splice', 'push', 'sort', 'map','forEach', 'find', 'reduce', 'reduceRight']
  .forEach(method=>arrMethods[method] = Array.prototype[method]);

/**
 * path collection of canvas.
 * Behavior like an array.
 *
 */
@mixin(arrMethods)
class PathCollection {

  length = 0;

  /**
   * Compare 2 PathCollection by id
   *
   * @param {PathCollection} left
   * @param {PathCollection} right
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
    if (items) items.forEach(item=> this.add(item));
    this.layer = layer;
  }

  /**
   * All items-collection change ,will trigger whiteboard re-draw.
   */
  changed(){
    this.layer.refresh();
    this.layer.isDirty = true;
  }

  /**
   * return filtered PathCollection
   */
  filter(){
    return new PathCollection(Array.prototype.filter.apply(this, arguments));
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
   * Compare with other PathCollection.
   * @param {PathCollection} other
   */
  diff(other) {
    PathCollection.diff(this, other);
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
    return this.push(item);
  }

  /**
   * Clear whiteboard item.
   */
  clear(){
    return this.splice(0, this.length);
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
   * It will trigger canvas-redraw;
   * @param {Function} fn, filter determine which item should be removed.
   */
  delete(fn){
    let deleted = new PathCollection;

    for(let i=0, len = this.length; i<len; i++) {
      let item = this.get(i);
      if(fn(item)) {
        this.splice(i--, 1); // delete one item and re-assign current index
        len--; //re-assign collection length
        deleted.push(item);
      }
    }
    return deleted;
  }

  /**
   *
   * Delete selected items of current collection.
   */
  deleteSelected() {
    return this.delete((item)=>item.selected);
  }

  /**
   * Delete items by ids.
   * @param {Array} ids
   */
  deleteById(ids) {
    return this.delete((item)=>PathCollection.includes(ids, item.id));
  }

  /**
   * Return the JSON-format information of current collection.
   */
  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default PathCollection;
