/**
 * 
 */

import hookable from '../decorators/hookable';
import bgLayer from './bgLayer';
import staticLayer from './staticLayer';
import {setStyle} from '../util/dom'


@hookable
export default class CanvasMgr {
  constructor(options) {

    let {container, width, height} = options;

    this.wrapper = container;

    setStyle(container,  {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative'
    });

    this.width = width;
    this.height = height;

    this.bgCanvas = this.createAndApplyCanvasAttr('bgcanvas');
    this.activeCanvas = this.createAndApplyCanvasAttr('canvas');
    this.ctx = this.activeCanvas.getContext('2d');
    this.bgCtx = this.bgCanvas.getContext('2d');
  }

  createAndApplyCanvasAttr(id){
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

    if(this.deviceRatio > 1) {
      this.applyRatio(canvas);
    }

    this.wrapper.appendChild(canvas);
    return canvas;
  }

  dispose () {
    let wrapper = this.wrapper;
    //TODO: remove all object.
    wrapper.removeChild(this.bgCanvas);
    wrapper.removeChild(this.activeCanvas);
  }

  applyRatio(canvas){

    canvas.width = this.width * this.deviceRatio;
    canvas.height = this.height * this.deviceRatio;
    canvas.getContext('2d').scale(this.deviceRatio, this.deviceRatio);
  }

  get deviceRatio(){
    return window.devicePixelRatio || 1;
  }

  get pixelRadio() {
    if (!/^off|false$/.test(canvas.getAttribute('hidpi'))) {
      // Hi-DPI Canvas support based on:
      // http://www.html5rocks.com/en/tutorials/canvas/hidpi/
      var deviceRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;

      return deviceRatio / backingStoreRatio;
    }
    return 1;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }

  renderAll() {}
  scale() {}
} 