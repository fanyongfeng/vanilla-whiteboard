import Rectangle from '../graphic/shape/Rectangle';
import Line from '../graphic/shape/Line';
import Arrow from '../graphic/shape/Arrow';
import Triangle from '../graphic/shape/Triangle';
import Ellipse from '../graphic/shape/Ellipse';
import Star from '../graphic/shape/Star';
import Tool from './Tool';

const ctorList = [Rectangle, Line, Arrow, Triangle, Ellipse, Star];
export default class ShapeDrawing extends Tool{

  _style = {};

  constructor(type) {
    super();
    let pathCtor = ctorList.find(ctor => {
      return ctor.type === type
    });
    if (!pathCtor) throw new Error("Can't find specified shape");

    this.pathCtor = pathCtor;
  }

  onMouseDown(event) {
    let options = this.style;
    this.currentShape = new this.pathCtor(options);
    // this.currentShape = new Ellipse(options);
    // this.currentShape = new Star(options);
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    items.add(this.currentShape);
  }

  onMouseDrag(event) {
    this.currentShape.endPoint = event.point;
    this.currentShape.buildPath();
  }

  onMouseMove(event){

  }

  onMouseUp(event) {
    this.currentShape = null;
  }

  set styles(value) {
    this._style = value;
  }

  get styles() {
    return this._style;
  }
}
