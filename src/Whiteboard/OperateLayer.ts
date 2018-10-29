import Layer from './Layer';
import Img from '../graphic/shape/Image';

/**
 * Support Cursor & Event .. operate layer behavior
 * 最前面的一层, 相较于其他层有特定的行为。
 */
export default class OperateLayer extends Layer {
  private _cursorImage?: Img;

  constructor(width: number, height: number, role: string) {
    super(width, height, role);
    this.el.tabIndex = 1; //make OperateLayer focusable.
  }
  /**
   * set cursor of layer. Use for operateLayer.
   * @param value Img instance
   */
  setCursor(value: Img): void;
  /**
   * set cursor of layer. Use for operateLayer.
   * @param value Img url
   */
  setCursor(value: string): void;
  /**
   * set cursor of layer. Use for operateLayer.
   * @param value css cursor string
   */
  setCursor(value: string | Img): void {
    if (typeof value === 'string') {
      this.el.style.cursor = value;
      this._cursorImage = undefined;
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

  /**
   * draw items and cursor, but draw cursor first!
   */
  _draw() {
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
