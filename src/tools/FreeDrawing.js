import Writing from '../graphic/shape/Writing';
import Tool from './Tool';

// values: Marker & Highlighter
export default class FreeDrawing extends Tool {
  _style = {};

  brush = 'https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png';
    // https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png
    // https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png
    // https://www-stage.tutormeetplus.com/v2/static/media/mark_pen.901db183.png

  constructor(whiteboardCtx, name){
    super();
    this.items = whiteboardCtx.items;
    if(name === 'highlighter') this.alpha = 0.5;
  }

  lastPoint = null;
  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(event) {
    this.currentShape = new Writing();
    // this.currentShape.style = this.style.clone();
    items.add(this.currentShape);

    this.currentShape.moveTo(event.point);
    this.lastPoint = event.point;
  }

  /**
   * Invoked on mouse move
   * @param {Object} pointer
   */
  onMouseDrag(event) {
    var point = event.point;
    var midPoint = point.midPointFrom(this.lastPoint);
    this.currentShape.quadraticCurveTo(this.lastPoint, midPoint);
    this.lastPoint = point;
  }

  /**
   * Invoked on mouse up
   */
  onMouseUp(event) {
    this.currentShape.simplify();
    this.currentShape = null;
  }

  onMouseMove(event){

  }

  set styles(value){
    this._style  = value;
  }

  get styles(){
    return this._style;
  }
}
