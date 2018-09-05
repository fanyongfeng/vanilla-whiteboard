import Tool from './Tool';

export default class ArcDrawing extends Tool {
  constructor(type) {
    super(type);
    this.center = null;
  }

  onMouseDown(event) {
    if (this.center) {
      this.radius = event.point.subtract(this.center).length;
    } else this.center = event.point;
  }

  onMouseMove(event) {}
  onMouseDrag(event) {}
  onMouseUp(event) {}
}
