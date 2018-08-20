
import Tool from './Tool';
import TextImg from '../graphic/shape/Text';
import { uid } from '../util/id';

/**
 * Tool to input text on whiteboard
 */
export default class Text extends Tool {
  _style = {};
  _texts = [];

  constructor(type) {
    super();
    this.type = type;
    window._texts = this._texts;
    window.drawText = this.drawText.bind(this);
  }

  onMouseDown(event) {
    this.currentShape = new TextImg(this.style);
    const input = this.currentShape.createEditableView(event.point);
    input.focus();
    this._texts.push({
      id: `${uid()}text`,
      input
    });
    // items.add(this.currentShape);
  }

  set style(value) {
    this._style = value;
  }

  get style() {
    return this._style;
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
        this.layer.ctx.drawImage(img, left, top);
        DOM_URL.revokeObjectURL(url);
      };
      // document.body.appendChild(img);
      img.src = url;
    });
  }

}
