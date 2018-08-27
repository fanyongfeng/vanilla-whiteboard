
import Rectangle from '../../graphic/shape/Rectangle';

const defaultStyle = {
  strokeStyle: '#aaa',
  lineWidth: 1,
  dashArray: [5, 2],
}
/**
 * enable tool has drag behavior.
 * 使工具在拖拽时，生成一个虚线辅助框, 该辅助框在开始拖拽时生成，
 */
export default function dragBounds(style, removeOnNextDrag = false) {
  style = Object.assign({}, defaultStyle, style);

  return {
    _dragRect: new Rectangle({ style }),

    get dragRect(){
      return this._dragRect;
    },

    /**
     * Add drag rectangle when mousemove.
     * @param {*} param0
     */
    onMouseDown({ point }) {
      if(removeOnNextDrag)
        this.dragRect.remove();
      this.dragRect.startPoint = this.dragRect.endPoint = point;
      this.layer.items.add(this.dragRect);
    },

    /**
     * Set size of drag rectangle.
     * @param {*} param0
     */
    onMouseDrag({ point }) {
      this.dragRect.endPoint = point;
    },

    /**
     * Remove drag rect when mouse-up.
     * @param {*} param0
     */
    onMouseUp() {
      if(!removeOnNextDrag)
        this.dragRect.remove();
    }
  }
}
