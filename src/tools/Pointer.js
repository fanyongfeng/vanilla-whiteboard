import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin'


@deepMixin(dragBounds())
@deepMixin(cursor("https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png"))
export default class Pointer extends Tool {

  constructor() {
    super();
  }

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown({ point }){
    this.selectAreaRect.startPoint = point;
    this.layer.items.add(this.selectAreaRect);
  }
  
}
