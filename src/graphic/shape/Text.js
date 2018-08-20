import Item from '../Item';
import Rect from '../types/Rect'
import Point from '../types/Point';
import { uid } from '../../util/id';

/**
 * Text Item;
 */
export default class Text extends Item {

  _texts = [];
  _mode = 'textarea'; // textarea
  _autoBreak = true; // if _autoBreak is true, Text line will break if out of canvas bounds.

  constructor() {
    super();
    // TODO: delete
    window._texts = this._texts;
    window.drawText = this.drawText.bind(this);
  }

  get text() {
    return this._text;
  }

  _buildPath() {

  }
  buildPath() {

  }

  _draw(ctx) {
    this._ctx = ctx;
  }

  onMouseMove() {}

  onMouseDown(e) {
    const input = this.createEditableView(e.point);
    input.focus();
    this._texts.push({
      id: `${uid()}text`,
      input
    });
  }

  /**
   * 每点击一次创建一个可编辑框
   */
  createEditableView({ x, y }) {
    const input = document.createElement('div');
    input.setAttribute('contenteditable', 'true');
    input.setAttribute('style', '');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocomplete', 'off');

    Object.assign(input.style, {
      fontFamily: this.style.font || 'sans-serif',
      'min-width': '100px',
      'font-weight': 400,
      color: this.style.color,
      'font-style': this.style.italic ? 'italic' : 'normal',
      'font-size': `${this.style.fontSize}px`,
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`
    });
    document.getElementById('draw-panel').appendChild(input);
    this.bindInputEvent(input);
    return input;
  }

  bindInputEvent(input) {
    input.addEventListener('input', event => {
      input.lines = event.target.innerText.split(/\r?\n/);
    });
  }

  /**
   * TODO:
   * @param {inputElement} input
   */
  updatePosition(input, offset={x: 0, y: 0}) {

  }

  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  getStylePropertyValue(target, property) {
    const style = window.getComputedStyle(target, null);
    return parseInt(style.getPropertyValue(property), 10);
  }

  drawText() {
    this._texts.map(item => {
      const input = item.input;
      const width = this.getStylePropertyValue(input, 'width');
      const height = this.getStylePropertyValue(input, 'height');
      const left = this.getStylePropertyValue(input, 'left');
      const top =  this.getStylePropertyValue(input, 'top');
      const style = input.getAttribute('style').replace(/(.+)(position.+?;)(.+)/, ($1, $2, $3, $4) => $2 + $4); // svg 中加入position 会导致 转 img 失败
      let content = input.innerHTML;
      content = this.replaceAll(content, '&nbsp;', ' ');
      content = this.replaceAll(content, '<br>', '<br></br>');
      const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="${style}">${content}</div></foreignObject></svg>`;

      const DOM_URL = window.URL || window.webkitURL || window;
      const img = new Image();
      const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      const url = DOM_URL.createObjectURL(svg);

      img.onload = () => {
        this._ctx.drawImage(img, left, top);
        DOM_URL.revokeObjectURL(url);
      };
      // document.body.appendChild(img);
      img.src = url;
    });
  }

}
