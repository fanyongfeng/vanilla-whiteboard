export default class CanvasMgr {
  constructor(element) {
    this.canvas = element;
    this.ctx = element.getContext();
  }

  clearContext() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }
} 