/**
 * 
 */

import hookable from '../decorators/hookable';


@hookable
export default class CanvasMgr {
  constructor(element) {
    this.canvas = element;
    this.width = element.width;
    this.height = element.height;
    this.ctx = element.getContext('2d');
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

  renderAll() {

  }

  scale() {

  }
} 