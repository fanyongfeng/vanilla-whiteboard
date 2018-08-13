import {tsid} from '../util/id';
import Style from './types/Style';
import Matrix from './types/Matrix';

const _selected = Symbol('_selected');
const _style = Symbol('_style');

// 白板所有元素的父类
export default class Item {

  [_selected] = false;

  constructor(style) {
    this.id = tsid();
    this[_style] = new Style(style);
  }

  get selected() {
    return this[_selected];
  }

  set selected(val) {
    this[_selected] = val;
  }
    /**
   * style of current path
   */
  get style() {
    return this[_style];
  }

  set style(value) {
    this[_style] = value;
    //mark-as-dirty
  }

  get bounds() {
    return null;
  }

  get position(){
    return this.bounds.center;
  }

  set position(value){
    this.setPosition(value.x, value.y);
  }

  setPosition(x, y){
    this.translate(Point.instantiate(x, y).subtract(this.position));
  }

  translate(point){
    let mx = new Matrix();
    return this.transform(mx.translate(point));
  }

  scale(sx, sy, point){
    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.scale(sx, sy, point));
  }

  rotate(deg, point) {
    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.rotate(deg, point));
  }

  /**
   * 绘制边界矩形
   * @param {*} ctx 
   */
  drawBoundRect(ctx) {
    ctx.save();
    ctx.strokeStyle = '#009dec';
    ctx.lineWidth = 1;
    ctx.strokeRect.apply(ctx, this.strokeBounds.toJSON());
    ctx.restore();
  }

  transform(matrix){

    this.transformContent(matrix);
    return this;
    // this.emit('changed');
    //TODO:markAsDrity
  }

  draw(ctx){
    if(this.selected) this.drawBoundRect(ctx);
  }
}
