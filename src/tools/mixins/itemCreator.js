import Rectangle from '../../graphic/shape/Rectangle';
import { createItem } from '../graphic/ItemFactory';

export default function itemCreator(style) {

  return {
    _style: {},
    set style(value) {
      this._style = value;
    },

    get style() {
      return this._style;
    },

    onMouseDown(event) {
      this.currentShape = createItem(this.type, this.style);
    },

    onMouseDrag({ point }) {
      this.dragRect.endPoint = point;
    },

    onMouseUp() {
      this.dragRect.remove();
    }
  }
}
