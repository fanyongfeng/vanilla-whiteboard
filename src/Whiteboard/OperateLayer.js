import Layer from './Layer';

/**
 * Support Cursor & Event .. operate layer behavior
 * 最前面的一层, 相较于其他层有特定的行为。
 */
export default class OperatorLayer extends Layer {

    _cursorItem = null;
    /**
     * set cursor of layer. Use for operateLayer.
     * @param {*} value
     */
    setCursor(value) {
        if (typeof value === 'string') {
            this.el.style.cursor = value;
            this._cursorItem = null;
        } else {
            this._cursorItem = value;
        }
        this.markAsDirty();
        // if(!value instanceof Item) throw new TypeError("Must be item");
    }


    _draw() {
        super._draw();
        if (this._cursorItem) this._cursorItem.draw(this.ctx);
    }
}