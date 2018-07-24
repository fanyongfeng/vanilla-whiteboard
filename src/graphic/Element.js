/**
 * Base of all shapes
 */
import Rect from '../types/Rect';
import Style from './Style';
import {tsid, uid} from '../util/id';

const _selected = Symbol('selected');

export default class Element {

  selectable = true;

  strokeColor = null;
  strokeWidth = 1;
  _style = new Style();
  group = null;

  constructor(){
    this.id = tsid();
    this[_selected] = false;
  }


  drawBoundRect(){
    let ctx = this.ctx;
    let {x, y, width, height} = this.bounds;

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#009dec";
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  }

  get selected(){
    return this[_selected];
  }

  set selected(val){
    this.drawBoundRect();
    this[_selected] = val;
  }

  get style(){
    return {
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    }
  }

  set style(val){
    this.strokeColor = val.strokeColor;
    this.strokeWidth = val.strokeWidth;
  }

  get bounds(){
    return new Rect(this.x, this.y, this.width, this.height);
  }
  
  buildPath(ctx, shape) {
    throw "This method must be implemented!";
  }

  render(ctx){
    this.ctx = ctx;

    ctx.strokeStyle = '#c69';
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    this.buildPath(ctx);
  }
}