/**
 * path collection of canvas.
 * Behavior like an array. (without push, pop)
 */
const _items = Symbol('_items');
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

  get length() { return this[_items].length; }

  constructor(owner){
    this.owner = owner;

    ['forEach', 'map', 'find', 'reduce', 'filter']
      .forEach(method => this[method] = Array.prototype[method].bind(this[_items]));
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this[_items].length; i < len; i++) {
      yield this[_items][i];
    }
  }

  add(item) {
    this[_items].push(item);
  }

  selectAll() {
    this.forEach(item => item.selected = true);
  }

  antiSelectAll() {
    this.forEach(item => item.selected = !item.selected);
  }

  deSelectAll() {
    this.forEach(item => item.selected = false);
  }

  deleteSelect(){
    let deletedItems = new NodeCollection;
    this[_items] = this.filter(item => {
      if (item.selected !== true) return true;

      deletedItems.push(item.hash);
      item.remove();
      return false;
    });
    return deletedItems;
  }

  delete(ids) {
    if (!Array.isArray(ids)) ids = [ids];

    this[_items] = this.filter(item => {
      if (!includes(ids, item.id)) return true;
      item.remove();
      return false;
    });
  }
}

export default PathCollection;
export function createInstance(){
  return new PathCollection();
}
