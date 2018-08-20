import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';

export default class Pointer extends Tool {
  //光标
  cursor = null;

  constructor() {
    super();

    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png");

    this.selectionRect = new Rectangle();
    this.selectionRect.style.strokeStyle = '#ccc';
    this.selectionRect.style.lineWidth = 1;
    this.selectionRect.style.dashArray = [5, 2];
  }

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown({ point }){
    this.selectionRect.startPoint = point;
    items.add(this.selectionRect);
  }

  onMouseMove({ point, delta }) {
    this.layer.setCursor(this.cursor);
    if(this.cursor.loaded) {
      this.cursor.position = point;
    }
  }

  onMouseDrag({ point }) {
    this.selectionRect.endPoint = point;
    this.selectionRect.buildPath();
  }

  onMouseUp(){

  }
}
