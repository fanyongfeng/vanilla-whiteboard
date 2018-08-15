import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';

export default class Eraser {
  //
  constructor() {
    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png");

    this.selectionRect = new Rectangle();
    this.selectionRect.style.strokeStyle = '#ccc';
    this.selectionRect.style.lineWidth = 1;
    this.selectionRect.style.dashArray = [5, 2];
  }

  onMouseDown({ point }){
    this.selectionRect.startPoint = point;
    items.add(this.selectionRect);
  }

  onMouseMove({ point, delta }) {
    if(!this.layer.items.length) this.layer.items.add(this.cursor);
    if(this.cursor.loaded) {
      // this.cursor.translate(delta);
      this.cursor.position = point;
    }
  }

  onMouseDrag({ point }) {
    this.selectionRect.endPoint = point;
    this.selectionRect.position = point;
  }

  onMouseUp(){

  }
}
