
import { setStyle } from '../util/dom';
import PathCollection from './PathCollection';

const _items = Symbol('_items');
/**
 * Create canvas layer, and Manage all canvas of whiteboard.
 */
export default class Layer {
  [_items] = new PathCollection;
  wrapper = null;
  _isDirty = true;

  /**
   * Move items from one to other
   */
  static elevator(source, target, fn){
    target.forEach(element => {
      top.remove(element);
      bottom.add(element);
    });
    refreshAll();
  }

  /**
   * Layer.
   * 
   * @param {Number} width 
   * @param {Number} height 
   * @param {String} role 
   */
  constructor(width, height, role){
    let el = document.createElement('canvas');
    el.setAttribute('data-role', role);

    this.el = el;
    this.ctx = el.getContext('2d');
    this.width = width;
    this.height = height;

    setStyle(el, {
      position: 'absolute',
      width: `${this.width}px`,
      height: `${this.height}px`,
      left: 0,
      top: 0,
      'touch-action': 'none',
    });

    if (this.deviceRatio > 1) {
      this.applyRatio(el);
    }
  }

  redraw(){
    this.clear();
    console.log("--refresh triggered!--");
    this[_items].forEach(item => item.draw(this.ctx));
    this._isDirty = false;
  }

  get items(){
    return [_items];
  }

  get deviceRatio() {
    return window.devicePixelRatio || 1;
  }

  get isDirty(){
    return this._isDirty;
  }

  get pixelRadio() {
    let ctx = this.ctx;
    if (!/^off|false$/.test(canvas.getAttribute('hidpi'))) {
      let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

      return this.deviceRatio / backingStoreRatio;
    }
    return this.deviceRatio;
  }

  applyRatio() {
    this.el.width = this.width * this.deviceRatio;
    this.el.height = this.height * this.deviceRatio;
    this.ctx.scale(this.deviceRatio, this.deviceRatio);
  }

  resetTransform(canvas) {
    this.ctx.setTransform(this.deviceRatio, 0, 0, this.deviceRatio, 0, 0);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  appendTo(wrapper) {
    this.wrapper = wrapper;
    wrapper.appendChild(this.el);
  }

  dispose(){
    this.wrapper && this.wrapper.removeChild(this.el);
  }
}
