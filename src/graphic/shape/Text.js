import Item from '../Item';

const replaceAll = (target, search, replacement) => target.replace(new RegExp(search, 'g'), replacement);

const getStylePropertyValue = (target, property) => {
  const style = window.getComputedStyle(target, null);
  return parseInt(style.getPropertyValue(property), 10);
};

export const drawTextImg = (element, ctx) => {
  const width = getStylePropertyValue(element, 'width');
  const height = getStylePropertyValue(element, 'height');
  const left = getStylePropertyValue(element, 'left');
  const top = getStylePropertyValue(element, 'top');
  const style = element.getAttribute('style').replace(/(.+)(position.+?;)(.+)/, ($1, $2, $3, $4) => $2 + $4); // svg 中加入position 会导致 转 img 失败
  let content = element.innerHTML;
  content = replaceAll(content, '&nbsp;', ' ');
  content = replaceAll(content, '<br>', '<br></br>');
  const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="${style}">${content}</div></foreignObject></svg>`;

  const DOM_URL = window.URL || window.webkitURL || window;
  const img = new Image();
  const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = DOM_URL.createObjectURL(svg);

  img.onload = data => {
    element.cxtWidth = data.target.width;
    element.cxtHeight = data.target.height;
    ctx.drawImage(img, left, top);
    DOM_URL.revokeObjectURL(url);
  };
  // document.body.appendChild(img);
  img.src = url;
};

/**
 * Text Item;
 */
export default class Text extends Item {
  _mode = 'textarea'; // textarea
  _autoBreak = true; // if _autoBreak is true, Text line will break if out of canvas bounds.
  _editable = false;
  _crossBorder = false; // can cross a boundary

  /**
   * 每点击一次创建一个可编辑框
   */
  _draw(cxt) {
    const { x, y } = this.startPoint;
    this.cxt = cxt;
    const input = document.createElement('div');
    input.setAttribute('contenteditable', this._editable);
    input.setAttribute('style', '');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocomplete', 'off');

    Object.assign(input.style, {
      fontFamily: this.style.font || 'sans-serif',
      'min-width': '100px',
      'font-weight': 400,
      color: this.style.strokeColor,
      'font-style': this.style.italic ? 'italic' : 'normal',
      'font-size': `${this.style.fontSize}px`,
      position: 'absolute',
      left: `${x}px`,
      top: `${y - 10}px`,
    });
    document.getElementById('draw-panel').appendChild(input);
    this.bindInputEvent(input);
    input.focus();
    this.input = input;
  }

  set editable(val) {
    this._editable = val;
    if (this.input) {
      this.input.setAttribute('contenteditable', val);
    }
  }

  bindInputEvent(input) {
    input.addEventListener('input', event => {
      this.value = event.target.innerText;
      this.lines = this.value.split(/\r?\n/);
    });
  }

  /**
   * @param offset object {x, y}
   */
  updatePosition({ x = 0, y = 0 }) {
    const { left, top } = input.style;
    Object.assign(input.style, {
      left: `${left - x}px`,
      top: `${top - y}px`,
    });
  }

  _drawTextImg() {
    drawTextImg(this.input, this.cxt);
  }
}
