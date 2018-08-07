/**
 *
 */

import hookable from '../decorators/hookable';
import bgLayer from './bgLayer';
import staticLayer from './staticLayer';
import { setStyle } from '../util/dom'
import items from '../store/items';
import handler from '../event/event';
import Writing from '../graphic/shape/Writing';
import saveImage from '../util/saveImage';
import Image from '../graphic/shape/Image';
import {tools} from '../tools';


@hookable
export default class CanvasMgr {
  static instances = [];

  items = items;
  constructor(options) {
    let { container, width, height } = options;

    /** 一个container不能加载两个白板*/
    CanvasMgr.instances.find(instance => {
      if(instance.wrapper === container) throw new Error("Can't instance at same container twice!");
    })

    this.wrapper = container;
    setStyle(container, {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative'
    });

    this.width = width;
    this.height = height;

    this.bgCanvas = this.createAndApplyCanvasAttr('bgcanvas');
    this.activeCanvas = this.createAndApplyCanvasAttr('canvas');
    this.operateCanvas = this.createAndApplyCanvasAttr('opcanvas');
    this.ctx = this.activeCanvas.getContext('2d');
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.opCtx = this.operateCanvas.getContext('2d');

    handler.bind(this.operateCanvas);
    handler.refreshCanvas = this.refresh.bind(this);

    CanvasMgr.instances.push(this)
  }

  createAndApplyCanvasAttr(id) {
    let canvas = document.createElement('canvas');

    canvas.setAttribute('id', id);

    setStyle(canvas, {
      position: 'absolute',
      width: `${this.width}px`,
      height: `${this.height}px`,
      left: 0,
      top: 0,
      'touch-action': 'none',
    });

    if (this.deviceRatio > 1) {
      this.applyRatio(canvas);
    }

    this.wrapper.appendChild(canvas);
    return canvas;
  }

  refresh() {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.items.items.forEach(item => item.draw(this.ctx));
    });
  }

  get data() {
    return this.items.items.map(item => item.toJSON());
  }

  add(segments) {
    let ins = Writing.instantiate(segments);
    this.items.add(ins);
    // this.refresh();
  }

  addImage(src) {
    this.items.add(new Image(src));
  }

  saveImage() {
    return saveImage(this.activeCanvas);
  }

  refreshAll() {

  }

  _toolName = '';

  set tool(val){
    this._toolName = val;
  }

  get tools(){
    return tools;
  }

  get tool(){
    return tools[this._toolName];
  }

  dispose() {
    let wrapper = this.wrapper;
    //TODO: remove all object.
    wrapper.removeChild(this.bgCanvas);
    wrapper.removeChild(this.activeCanvas);
  }

  applyRatio(canvas) {

    canvas.width = this.width * this.deviceRatio;
    canvas.height = this.height * this.deviceRatio;
    canvas.getContext('2d').scale(this.deviceRatio, this.deviceRatio);
  }

  resetTransform(canvas) {
    canvas.getContext('2d').setTransform(this.deviceRatio, 0, 0, this.deviceRatio, 0, 0);
  }

  get deviceRatio() {
    return window.devicePixelRatio || 1;
  }

  get pixelRadio() {
    let ctx = this.ctx;
    if (!/^off|false$/.test(canvas.getAttribute('hidpi'))) {
      // Hi-DPI Canvas support based on:
      // http://www.html5rocks.com/en/tutorials/canvas/hidpi/

      let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

      return this.deviceRatio / backingStoreRatio;
    }
    return this.deviceRatio;
  }

  clear() {
    this.items.removeAll();
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }

  renderAll() { }
  scale() { }
}

window.CanvasMgr = CanvasMgr;
