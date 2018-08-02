import Point from '../types/Point';
import Writing from '../graphic/shape/Writing';
import items from '../store/items';
// values: Marker & Highlighter
export default class FreeDrawing {
  styles = {};

  constructor(name){
    this.shapeCtor = name;
  }

  lastPoint = null;

  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(event) {
    this.currentShape = new Writing();
    items.add(this.currentShape);

    this.currentShape.path.moveTo(event.point);
    
    this.lastPoint = event.point;
  }

  /**
   * Inovoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove(event) {
    
    var point = event.point;
    var midPoint = point.midPointFrom(this.lastPoint);
    this.currentShape.path.quadraticCurveTo(this.lastPoint, midPoint);
    this.lastPoint = point;
  }

  /**
   * Invoked on mouse up
   */
  onMouseUp(event) {

  }
}