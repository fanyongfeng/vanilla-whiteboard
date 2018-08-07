import Writing from '../graphic/shape/Writing';
import items from '../store/items';
// values: Marker & Highlighter
export default class FreeDrawing {
  _style = {};

  constructor(name){
    if(name === 'highlighter') this.alpha = 0.5;
  }

  lastPoint = null;
  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(event) {
    this.currentShape = new Writing();
    items.add(this.currentShape);

    this.currentShape.moveTo(event.point);
    this.lastPoint = event.point;
  }

  /**
   * Invoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove(event) {
    var point = event.point;
    var midPoint = point.midPointFrom(this.lastPoint);
    this.currentShape.quadraticCurveTo(this.lastPoint, midPoint);
    this.lastPoint = point;
  }

  /**
   * Invoked on mouse up
   */
  onMouseUp(event) {
    this.currentShape = null;
  }

  set styles(value){
    this._style  = value;
  }

  get styles(){
    return this._style;
  }
}
