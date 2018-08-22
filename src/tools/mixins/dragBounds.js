
import Rectangle from '../../graphic/shape/Rectangle';

const defaultStyle = {
  strokeStyle: '#aaa',
  lineWidth: 1,
  dashArray: [5, 2],
}

export default function dragBounds(style) {
  style = Object.assign({}, defaultStyle, style);

  return {
    _dragRect: new Rectangle({ style }),

    get dragRect(){
      return this._dragRect;
    },

    onMouseDown: function ({ point }) {
      this.dragRect.startPoint = this.dragRect.endPoint = point;
      this.layer.items.add(this.dragRect);
      console.log('--dragbound');
    },

    onMouseDrag: function ({ point }) {
      this.dragRect.endPoint = point;
    },

    onMouseUp: function () {
      this.dragRect.remove();
    }
  }
}
