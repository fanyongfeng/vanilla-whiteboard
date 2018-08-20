
import { addListener, removeListener } from '../util/dom'
import Tool from './Tool';

/**
 * Tool to input text on whiteboard
 */
export default class Text extends Tool{
  _createShadowTextArea() {

  }

  onMouseDown(event) {
    if(!this.target) return;

    this.target.setCursor();
  }

  onKeyDown(event) {

  }

  _calcTextareaPosition() {

  }

}
