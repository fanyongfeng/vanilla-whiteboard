import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin';
import Rectangle from '../graphic/shape/Rectangle';
import { CustomizeMouseEvent } from '../Whiteboard/EventType';
import Point from '../graphic/types/Point';

interface Pointer {
  dragRect: Rectangle
}

/**
 * Pointer of whiteboard.
 *
 * Inject following behaviors for tool 'Pointer'
 * 1) 当拖拽时生成“拖拽框”，默认时红色
 * 2) 在鼠标移动时生成一个“指挥棒”，并实时发送“指挥棒”位置数据
 * 3）需要能够在接收端看到“拖拽框”
 */
@deepMixin(
  dragBounds(
    {
      strokeStyle: '#f00',
      lineWidth: 2,
    },
    true
  )
)
@deepMixin(
  cursor('https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png', {
    x: 11,
    y: -12,
  })
)
class Pointer extends Tool {

  private _move!: (point: Point) => void;
  private onMouseEnter!: () => void;

  onMouseDrag(event: CustomizeMouseEvent) {
    const { point } = event;
    this.globalCtx.emit('pointer:move', ['m', [point.x, point.y]]); // TODO: delete
  }
  onMouseMove(event: CustomizeMouseEvent) {
    const { point } = event;
    this.globalCtx.emit('pointer:move', ['m', [point.x, point.y]]);
  }
  onMouseUp() {
    this.globalCtx.emit('pointer:draw', ['d', this.dragRect.toJSON()]);
  }

  /**
  * draw rect by json
  */
  moveByJSON(json: any) {
    if (json[0] === 'm') {
      this.onMouseEnter();
      this._move(new Point(json[1][0], json[1][1]))
    } else if (json[0] === 'd') {
      const [sp, ep] = json[1][2];
      this.dragRect.remove();
      this.dragRect.startPoint = new Point(sp[0], sp[1]);
      this.dragRect.endPoint = new Point(ep[0], ep[1]);
      this.layer.items.add(this.dragRect);
    }
  }
}

export default Pointer;
