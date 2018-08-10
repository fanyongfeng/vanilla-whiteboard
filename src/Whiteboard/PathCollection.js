/**
 * path collection of canvas.
 * Behavior like an array. (without push, pop, slice, splice)
 */
const _items = Symbol('_items');

const arr = Array.prototype;

class PathCollection {
  [_items] = [];

  static diff(left, right) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  static includes() {

  }

  changed(){
    this.layer.refresh();
  }

  // get length() { return this[_items].length; }

  constructor(items) {

    if (items) this[_items] = items;

    ['forEach', 'find', 'reduce']
      .forEach(method =>
        this[method] = function() {
        return arr[method].apply(this[_items], arguments);
      });


    ['map', 'filter']
      .forEach(method =>
        this[method] = function () {
          return new PathCollection(arr[method].apply(this[_items], arguments));
        });
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this[_items].length; i < len; i++) {
      yield this[_items][i];
    }
  }

  get length(){
    return this[_items].length;
  }

  diff(other) {
    PathCollection.diff(this, other);
  }

  get(index) {
    return this[_items][index];
  }

  add(item) {
    this[_items].push(item);
  }

  clear(){
    this[_items] = [];
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

  deleteSelected() {
    let deletedItems = new PathCollection;
    this[_items] = this[_items].filter(item => {
      if (item.selected !== true) return true;

      deletedItems.add(item.hash);
      return false;
    });
    return deletedItems;
  }

  delete(ids) {

    if (!Array.isArray(ids)) ids = [ids];

    this[_items] = this[_items].filter(item => {
      if (!includes(ids, item.id)) return true;
      item.remove();
      return false;
    });
  }

  toJSON() {
    return this.map(item => item.toJSON());
  }
}

export default PathCollection;
