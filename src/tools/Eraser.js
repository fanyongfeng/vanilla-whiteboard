import Image from '../graphic/shape/Image';
import Rectangle from '../graphic/shape/Rectangle';
import Tool from './Tool';

export default class Eraser extends Tool {
  //
  constructor() {
    super();
    this.cursor = new Image();
    this.cursor.loadImage("https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png");

    this.selectAreaRect = new Rectangle();
    this.selectAreaRect.style.strokeStyle = '#aaa';
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
    }
  }

  onMouseDrag({ point }) {
    this.selectAreaRect.endPoint = point;
  }

  onMouseUp(){
    this.items.deleteSelected();
    this.selectAreaRect.remove();
  }
}
