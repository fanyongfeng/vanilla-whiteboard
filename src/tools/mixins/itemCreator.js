import { createItem } from '../../graphic/ItemFactory';

/**
 * Enable tool add item on mouse event triggered!
 * @param {*} style
 */
export default function itemCreator(style) {
  return {
    _style: {},

    /**
     * Set style of tool. It will apply to the created item.
     */
    set style(value) {
      this._style = value;
    },

    /**
     * Set style of tool
     */
    get style() {
      return this._style;
    },

    /**
     * Create item and add to item-collection before mouse down.
     * @param {MouseEvent} event
     */
    onBeforeMouseDown(event) {
      this.currentShape = createItem(this.type, this.style);
      this.items.add(this.currentShape);
    },
  };
}
