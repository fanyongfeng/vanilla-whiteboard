import Item from '../graphic/Item';



const _items = Symbol('_items');
class ItemCollection {
  [_items] = new Set;

  /**
   *
   * @param {Array} items
   * @param {Layer} layer
   */
  constructor(items = null, layer) {
    if (items) this[_items] = new Set(items);

    this.layer = layer;
  }

  get length() { return this[_items].length; }

  /**
   * Add whiteboard item.
   * @param {Item} item
   */
  add(item) {
    if (!item instanceof Item)
      throw new Error('Only Item can add to Collection!');

    item.layer = this.layer;
    this[_items].add(item);

    if(process.env.NODE_ENV === "development") {
      let index = this[_items].length - 1;
      this[index] = item;
    }

    this.changed();
    return this;
  }

}

export default ItemCollection;
