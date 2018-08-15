import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';

export default class Pointer {
  //
  constructor() {
    this.pointer = new Image();
    this.pointer.src = "https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png";

    this.selection = new Rectangle();
  }

  onMouseMove({ point }) {
    this.pointer.position = point;
  }

  onMouseDrag() {

  }

  onMouseUp(){

  }
}
