import Layer from './Layer';

/**
 * Support Cursor & Event .. operate layer behavior
 * 最前面的一层, 相较于其他层有特定的行为。
 */
export default class OperateLayer extends Layer {
  _cursorImage = null;

  constructor(width, height, role) {
    super(width, height, role);
    this.el.tabIndex = 1; //make OperateLayer focusable.
  }
  /**
   * set cursor of layer. Use for operateLayer.
   * @param {*} value
   */
  setCursor(value) {
    if (typeof value === 'string') {
      this.el.style.cursor = value;
      this._cursorImage = null;
    } else {
      this._cursorImage = value;
      this._cursorImage.layer = this;
    }
    this.markAsDirty();
  }

  /**
   * clear current layer.
   */
  clear() {
    super.clear();
    this.setCursor('default');
  }

  _draw() {
    // draw cursor first!
    if (this._cursorImage) this._cursorImage.draw(this.ctx);
    super._draw();
  }

  /**
   * 释放该Layer
   */
  dispose() {
    this.wrapper && this.wrapper.removeChild(this.el);
  }
}
