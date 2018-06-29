/**
 * Tool to input text on whiteboard
 */
export default class Text {
  _createShadowTextArea(){
    this.hiddenTextarea = fabric.document.createElement('textarea');
    this.hiddenTextarea.setAttribute('autocapitalize', 'off');
    this.hiddenTextarea.setAttribute('autocorrect', 'off');
    this.hiddenTextarea.setAttribute('autocomplete', 'off');
    this.hiddenTextarea.setAttribute('spellcheck', 'false');
    this.hiddenTextarea.setAttribute('data-fabric-hiddentextarea', '');
    this.hiddenTextarea.setAttribute('wrap', 'off');
    var style = this._calcTextareaPosition();
    this.hiddenTextarea.style.cssText = 'position: absolute; top: ' + style.top +
    '; left: ' + style.left + '; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px;' +
    ' line-height: 1px; paddingｰtop: ' + style.fontSize + ';';
    fabric.document.body.appendChild(this.hiddenTextarea);

    fabric.util.addListener(this.hiddenTextarea, 'keydown', this.onKeyDown.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'keyup', this.onKeyUp.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'input', this.onInput.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'copy', this.copy.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'cut', this.copy.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'paste', this.paste.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'compositionstart', this.onCompositionStart.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'compositionupdate', this.onCompositionUpdate.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'compositionend', this.onCompositionEnd.bind(this));
  }
}