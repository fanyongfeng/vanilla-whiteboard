import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import selectable from './mixins/selectable';
import { deepMixin } from '../decorators/mixin';
/**
 * Eraser
 * decorator 作用与class越近越早生效
 */
@deepMixin(selectable())
@deepMixin(dragBounds())
@deepMixin(cursor("https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png"))
export default class Eraser extends Tool {
  onMouseUp() {
    this.items.deleteSelected();
  }
}
