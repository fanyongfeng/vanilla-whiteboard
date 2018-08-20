import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';

export default class Eraser extends Tool {
  //
  constructor() {
    super();
    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png");

    this.selectionRect = new Rectangle();
    this.selectionRect.style.strokeStyle = '#aaa';
    this.selectionRect.style.lineWidth = 1;
    this.selectionRect.style.dashArray = [5, 2];
  }

  onMouseEnter(){
    this.layer.setCursor(this.cursor);
  }

  onMouseDown({ point }){
    this.selectionRect.startPoint = point;
    this.layer.items.add(this.selectionRect);
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
    this.selectionRect.remove();
  }
}
