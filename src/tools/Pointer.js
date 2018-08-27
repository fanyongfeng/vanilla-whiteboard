import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin'

/**
 * 指挥棒工具，有如下feature:
 * 1) 当拖拽时生成“拖拽框”，默认时红色
 * 2) 在鼠标移动时生成一个“指挥棒”，并实时发送“指挥棒”位置数据
 * 3）需要能够在接收端看到“拖拽框”
 */
@deepMixin(dragBounds({
  strokeStyle: '#aaa',
  lineWidth: 2,
}, true))
@deepMixin(cursor("https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png"))
export default class Pointer extends Tool {

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown({ point }){
    this.selectAreaRect.startPoint = point;
    this.layer.items.add(this.selectAreaRect);
  }
}
