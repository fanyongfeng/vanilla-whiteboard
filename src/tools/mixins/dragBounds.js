
import Rectangle from '../../graphic/shape/Rectangle';

const combineFunc = function combineFunc(origin, fn) {
  if(!origin) return fn;
  return function(){
    origin.apply(this, arguments);
    fn.apply(this, arguments);
  }
}


const defaultStyle = {
  strokeStyle: '#aaa',
  lineWidth: 1,
  dashArray: [5, 2],
}

export default function dragBounds(style) {
  style = Object.assign({}, defaultStyle, style);
  return function (target) {

    target.prototype.dragRect = new Rectangle({ style });

    /**
     * attach handler for specified event.
     *
     * @param {String} name Name of Event.
     * @param {Function} fn Handler of Event.
     */
    target.prototype.onMouseDown = combineFunc(target.prototype.onMouseDown, function ({ point }){
      this.dragRect.startPoint = point;
      this.layer.items.add(this.dragRect);

      console.log('--dragbound');
    });

    target.prototype.onMouseDrag = function({ point }) {
      this.dragRect.endPoint = point;
    }

    target.prototype.onMouseUp= function(){
      this.dragRect.remove();
    }
  }
}
