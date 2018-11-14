import { setStyle } from '../util/dom';
import ItemCollection from './ItemCollection';
import Matrix from '../graphic/types/Matrix';
import Rect from '../graphic/types/Rect';
import Item from '../graphic/Item';

export type layerDep = {
  context: IContext,
  wrapper?: HTMLElement
};

/**
 * Create canvas layer, and Manage all canvases in whiteboard.
 */
export default class Layer {
  width: number;
  height: number;
  globalCtx: IContext;
  matrix = new Matrix();
  ctx: CanvasRenderingContext2D;
  el: HTMLCanvasElement;

  protected role: string;
  protected wrapper?: HTMLElement;
  protected offscreen = false;
  private _bounds!: Rect;
  private _items: ItemCollection;
  private _isDirty = true;

  /**
   * Move items from one to other
   * @param source layer
   * @param target layer
   * @param fn callback.
   */
  static elevator(source: Layer, target: Layer, fn?: () => void) {
    let sourceItems = source.items;

    for (let i = 0, len = sourceItems.length; i < len; i++) {
      let element = sourceItems.get(0);
      source.items.remove(element);
      target.items.add(element);
    }
    fn && fn();
  }

  /**
   * Get bounds of layer.
   */
  get bounds() {
    return this._bounds;
  }

  /**
   * Alias of items.append .
   * @param item
   */
  append(item: Item) {
    this.items.add(item);
  }

  /**
   * Alias of items.remove .
   * @param item
   */
  remove(item: Item) {
    this.items.remove(item);
  }

  /**
   * Create whiteboard layer with specified width & height.
   *
   * @param width
   * @param height
   * @param role
   */
  constructor(width: number, height: number, role: string = '', props: layerDep) {
    this._items = new ItemCollection(this);
    const el = document.createElement('canvas');
    el.setAttribute('data-role', role);
    el.setAttribute('canvas-id', role);
    el.setAttribute('width', width.toString());
    el.setAttribute('height', height.toString());
    this.role = role;
    this.el = el;
    if (!this.offscreen && props.wrapper) {
      this.wrapper = props.wrapper;
      this.wrapper.appendChild(this.el);
    }
    this.globalCtx = props.context;
    // if (typeof wx !== 'undefined' && wx.createCanvasContext) {
    //   // adapt to wechat-mini-app
    //   this.ctx = wx.createCanvasContext(role);
    // } else {
    //   this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
    // }
    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;

    this.width = width;
    this.height = height;
    this._bounds = new Rect(0, 0, this.width, this.height);

    setStyle(el, {
      position: 'absolute',
      width: `${this.width}px`,
      height: `${this.height}px`,
      left: 0,
      top: 0,
      'touch-action': 'none',
    });

    if (this.deviceRatio > 1) {
      this.applyRatio();
    }
  }

  // appendTo(whiteboard: Whiteboard) {
  //   //appendTo wrapper.
  //   if (this.offscreen) return;

  //   this.wrapper = whiteboard.wrapper;
  //   this.wrapper.appendChild(this.el);

  //   //ref whiteboard context.
  //   this.globalCtx = whiteboard.context;
  // }

  _draw() {
    this.globalCtx.refreshCount++;
    this._items.forEach(item => item && item.draw(this.ctx));
  }

  /**
   * refresh current layer.
   */
  refresh() {
    this._clearCanvas();
    this.globalCtx.emit('layer:refresh', { layer: this });
    this._draw();
    this._isDirty = false;
  }

  get items() {
    return this._items;
  }

  get deviceRatio() {
    return window.devicePixelRatio || 1;
  }

  get pixelRadio() {
    let ctx = this.ctx;
    let canvas = document.createElement('canvas');
    if (!/^off|false$/.test(canvas.getAttribute('hidpi') || '')) {
      let backingStoreRatio =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;

      return this.deviceRatio / backingStoreRatio;
    }
    return this.deviceRatio;
  }

  /**
   * prop 'isDirty' is readonly
   */
  get isDirty() {
    return this._isDirty;
  }

  /**
   * Mark layer as 'dirty', it will be refreshed on next tick.
   */
  markAsDirty() {
    this._isDirty = true;
  }

  /**
   * Apply deviceRatio to Canvas, for retina.
   */
  applyRatio() {
    this.el.width = this.width * this.deviceRatio;
    this.el.height = this.height * this.deviceRatio;
    this.ctx.scale(this.deviceRatio, this.deviceRatio);
  }

  /**
   * reset transform for initial state.
   */
  resetTransform() {
    this.ctx.setTransform(this.deviceRatio, 0, 0, this.deviceRatio, 0, 0);
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * clear current layer.
   */
  clear() {
    this.items.clear();
  }

  /**
   * 等比缩放画布
   * @param radio
   */
  zoom(radio: number) {
    // this.ctx.scale(radio, radio);
    setStyle(this.el, {
      width: this.width * radio + "px",
      height: this.height * radio + "px",
    });
    this.el.width = this.el.width * radio;
    this.el.height = this.el.height * radio;
    this.ctx.restore();
    this.ctx.save();
    this.ctx.scale(this.deviceRatio, this.deviceRatio);
    this.ctx.scale(radio, radio);
    this.markAsDirty();
  }


  /**
   * Move own items to target
   * @param target
   */
  elevateTo(target: Layer) {
    Layer.elevator(this, target);
  }

  /**
   * 释放该Layer
   */
  dispose() {
    this.wrapper && this.wrapper.removeChild(this.el);
  }
}
