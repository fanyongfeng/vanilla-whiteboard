/**
 * path collection of canvas.
 */
const _item = Symbol('_item');
class PathCollection extends Array {
  [_item] = [];

  static diff(left, right) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  static includes() {

  }

  constructor(owner){
    super(arguments)
    this.owner = owner;
    ['forEach', 'map', 'find', 'reduce', 'filter'].forEach(method => this[method] = () => Array.prototype[forEach].bind(this[_item]))
  }

  add(item) {
    this.push(item);
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
    this[_item] = this[_item].filter(item => {
      if (item.selected !== true) return true;

      deletedItems.push(item.hash);
      item.remove();
      return false;
    });
    return deletedItems;
  }

  delete(ids) {
    if (!Array.isArray(ids)) ids = [ids];

    this[_item] = this[_item].filter(item => {
      if (!includes(ids, item.id)) return true;
      item.remove();
      return false;
    });
  }
}

export default items;
export function createInstance(){
  return new PathCollection();
}
