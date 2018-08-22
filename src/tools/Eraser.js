import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
@dragBounds()
@cursor() // 作用与class，decorator越近越早生效
export default class Eraser extends Tool {
  //
  constructor() {
    super();
    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png");
  }

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown(){
    console.log('--Eraser--');
  }

  onMouseMove({ point, delta }) {
    this.layer.setCursor(this.cursor);
    if(this.cursor.loaded) {
      this.cursor.position = point;
    }
  }

  onMouseUp(){
    this.items.deleteSelected();
  }
}
