import Item from '../Item';
import Rect from '../types/Rect';
import Point from '../types/Point';
import { observeProps } from '../../decorators/memoized';

const replaceAll = (target: string, search: string, replacement: string): string => target.replace(new RegExp(search, 'g'), replacement);

const getStylePropertyValue = (target, property) => {
  const style = window.getComputedStyle(target, null);
  return parseInt(style.getPropertyValue(property), 10);
};

export const drawTextImg = (element: HTMLDivElement, ctx: CanvasRenderingContext2D) => {
  const preStyle = element.getAttribute('style');
  if (!preStyle) return;
  const width = getStylePropertyValue(element, 'width');
  const height = getStylePropertyValue(element, 'height');
  const left = getStylePropertyValue(element, 'left');
  const top = getStylePropertyValue(element, 'top');
  const style = preStyle.replace(/(.+)(position.+?;)(.+)/, (_1, $2, _2, $4) => $2 + $4); // svg 中加入position 会导致 转 img 失败
  let content = element.innerHTML;
  content = replaceAll(content, '&nbsp;', ' ');
  content = replaceAll(content, '<br>', '<br></br>');
  const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${width + 5}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="${style}">${content}</div></foreignObject></svg>`;

  const DOM_URL = window.URL || window.webkitURL || window;
  const img = new Image();
  const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOM_URL.createObjectURL(svg);

  img.onload = () => {
    ctx.drawImage(img, left, top);
    DOM_URL.revokeObjectURL(url);
  };
  // document.body.appendChild(img);
  img.src = url;
};

/**
 * Text Item;
 */

@observeProps({
  _editable: { type: Boolean, default: false },
})
export default class Text extends Item {

  /**
   * static method to create instance from params
   */
  static instantiate(options, ...rest) {
    const text = new Text(options);
    text.startPoint = new Point(rest[0]);
    return text;
  }

  // private _mode = 'textarea'; // textarea
  // private _autoBreak = true; // if _autoBreak is true, Text line will break if out of canvas bounds.
  private _editable!: boolean;
  // private _crossBorder = false; // can cross a boundary
  private _cxt!: CanvasRenderingContext2D;

  public startPoint!: Point;
  public endPoint!: Point;
  public value!: string;
  public input!: HTMLDivElement;
  public onTyping!: (value: any[]) => void;


  /**
   * 每点击一次创建一个可编辑框
   */
  protected _draw(cxt: CanvasRenderingContext2D) {
    this._cxt = cxt;
    const { x, y } = this.startPoint;
    if (!this.input) {
      this.input = document.createElement('div');
      this.input.setAttribute('contenteditable', this._editable.toString());
      this.input.setAttribute('style', '');
      this.input.setAttribute('autocapitalize', 'off');
      this.input.setAttribute('autocorrect', 'off');
      this.input.setAttribute('autocomplete', 'off');
      console.log('strokeColor', this.style.strokeColor);
      Object.assign(this.input.style, {
        fontFamily: this.style.font || 'sans-serif',
        'min-width': '100px',
        'font-weight': 400,
        color: this.style.strokeStyle, // 不可 color strokeColor
        // 'font-style': this.style.italic ? 'italic' : 'normal',
        'font-size': `${this.style.fontSize}px`,
        position: 'absolute',
        left: `${x}px`,
        top: `${y - 10}px`,
      });
      const panelWrapper = document.getElementById('draw-panel');
      if (!panelWrapper) {
        throw ("can not find div about draw-panel");
      }
      panelWrapper.appendChild(this.input);
      this.bindInputEvent();
    }
    this._editable && this.input.focus();
    this.drawTextImg(this._editable);
  }

  set editable(val: boolean) {
    this._editable = val;
    if (this.input) this.input.setAttribute('contenteditable', val.toString());
  }

  bindInputEvent() {
    if (!this.input) return;
    this.input.addEventListener('input', event => {
      if (!event.target) return;
      this.value = event.target.innerHTML;
      this.onTyping([this.id, this.value]);
      // this.lines = this.value.split(/\r?\n/);
    });
  }

  /**
   * @param offset object {x, y}
   */
  updatePosition({ x = 0, y = 0 }) {
    const { left, top } = this.input.style;
    if (!left || !top) return;
    Object.assign(this.input.style, {
      left: `${Number(left) - x}px`,
      top: `${Number(top) - y}px`,
    });
  }

  drawTextImg(showOriginInput = false) {
    this.input.style.visibility = 'visible';
    drawTextImg(this.input, this._cxt);
    !showOriginInput && (this.input.style.visibility = 'hidden');
  }

  protected _toJSON() {
    return [this.startPoint.x, this.startPoint.y]
  }

  /**
   * just for ts lint, no sense
   */
  public get bounds(): Rect {
    const { x, y } = this.startPoint;
    if (!this.input) return new Rect(0, 0, 0, 0);
    return new Rect(x, y - 10, getStylePropertyValue(this.input, 'width'), getStylePropertyValue(this.input, 'height'), this)
  }
}
