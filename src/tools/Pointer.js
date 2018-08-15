import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';

export default class Pointer extends Tool {
  //光标
  cursor = null;

  constructor() {
    super();

    this.cursor = new Image();
    this.cursor.src = "https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png";
    this.selection = new Rectangle();
  }

  onMouseMove({ point }) {
    this.layer.items.add(this.cursor);
    this.cursor.position = point;
  }

  onMouseDrag() {

  }

  onMouseUp(){

  }
}
