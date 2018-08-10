import {mixin} from '../decorators/mixin';
/**
 * path collection of canvas.
 * Behavior like an array. (without push, pop, slice, splice)
 */

const arrMethods = {};
['splice', 'push', 'sort', 'map','forEach', 'find', 'reduce', 'reduceRight']
  .forEach(method=>arrMethods[method] = Array.prototype[method]);

@mixin(arrMethods)
class PathCollection {

  length = 0;

  static diff(left, right) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  static includes(collection, item) {
    return !!collection.find(i => i === item);
  }

  changed(){
    this.layer.refresh();
  }

  filter(){
    return new PathCollection(Array.prototype.filter.apply(this, arguments));
  }

  constructor(items) {
    if (items) items.forEach(item=> this.add(item));
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this.length; i < len; i++) {
      yield this[i];
    }
  }

  diff(other) {
    PathCollection.diff(this, other);
  }

  get(index) {
    return this[index];
  }

  add(item) {
    return this.push(item);
  }

  clear(){
    return this.splice(0, this.length);
  }

  selectAll() {
    this.forEach(item => item.selected = true);
  }

  antiSelect() {
    this.forEach(item => item.selected = !item.selected);
  }

  deSelect() {
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

  deleteSelected() {
    return this.delete((item)=>item.selected);
  }

  deleteById(ids) {
    return this.delete((item)=>PathCollection.includes(ids, item.id));
  }

  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default PathCollection;
