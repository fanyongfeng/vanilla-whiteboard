
import {addListener, removeListener} from '../util/dom'

/**
 * Tool to input text on whiteboard
 */
export default class Text {
  _createShadowTextArea(){
    let hiddenText;
    this.hiddenTextarea = hiddenText = document.createElement('textarea');

    hiddenText.setAttribute('autocapitalize', 'off');
    hiddenText.setAttribute('autocorrect', 'off');
    hiddenText.setAttribute('autocomplete', 'off');
    hiddenText.setAttribute('spellcheck', 'false');
    hiddenText.setAttribute('data-fabric-hiddentextarea', '');
    hiddenText.setAttribute('wrap', 'off');
    var style = this._calcTextareaPosition();

    hiddenText.style.cssText = 'position: absolute; top: ' + style.top +
    '; left: ' + style.left + '; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px;' +
    ' line-height: 1px; paddingｰtop: ' + style.fontSize + ';';

    document.body.appendChild(hiddenText);

    addListener(hiddenText, 'keydown', this.onKeyDown.bind(this));
    addListener(hiddenText, 'keyup', this.onKeyUp.bind(this));
    addListener(hiddenText, 'input', this.onInput.bind(this));
    addListener(hiddenText, 'copy', this.copy.bind(this));
    addListener(hiddenText, 'cut', this.copy.bind(this));
    addListener(hiddenText, 'paste', this.paste.bind(this));
    addListener(hiddenText, 'compositionstart', this.onCompositionStart.bind(this));
    addListener(hiddenText, 'compositionupdate', this.onCompositionUpdate.bind(this));
    addListener(hiddenText, 'compositionend', this.onCompositionEnd.bind(this));

  }

  onMouseDown(event) {

  }

  _calcTextareaPosition(){

  }

}
