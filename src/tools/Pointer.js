import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';
import dragBounds from './mixins/dragBounds';

export default class Pointer extends Tool {
  //光标
  cursor = null;

  constructor() {
    super();

    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png");

    this.selectAreaRect = new Rectangle();
    this.selectAreaRect.style.strokeStyle = '#ccc';
    this.selectAreaRect.style.lineWidth = 1;
    this.selectAreaRect.style.dashArray = [5, 2];
  }

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown({ point }){
    this.selectAreaRect.startPoint = point;
    this.layer.items.add(this.selectAreaRect);
  }

  onMouseMove({ point, delta }) {
    this.layer.setCursor(this.cursor);
    if(this.cursor.loaded) {
      this.cursor.position = point;
      //this.emit('pointer', [point.x, point.y])
    }
  }

  onMouseDrag({ point }) {
    this.selectAreaRect.endPoint = point;
  }

  onMouseUp(){

  }
}
