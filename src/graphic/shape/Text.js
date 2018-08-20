import Item from '../Item';
import Rect from '../types/Rect'
import Point from '../types/Point';

/**
 * Text Item;
 */
export default class Text extends Item {

  _mode = 'textarea'; // textarea
  _autoBreak = true; // if _autoBreak is true, Text line will break if out of canvas bounds.

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

}
