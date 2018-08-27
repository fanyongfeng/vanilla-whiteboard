import Rectangle from '../../graphic/shape/Rectangle';
import { createItem } from '../../graphic/ItemFactory';

/**
 * Enable tool add item on mouse event triggered!
 * @param {*} style
 */
export default function itemCreator(style) {

  return {
    _style: {},
    set style(value) {
      this._style = value;
    },

    get style() {
      return this._style;
    },

    onBeforeMouseDown(event) {
      this.currentShape = createItem(this.type, this.style);
      this.items.add(this.currentShape);
    }
  }
}
