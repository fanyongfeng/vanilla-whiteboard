/**
 * Base class of tools, for:
 * 1) create item.
 * 2) handle mouse & keyboard event.
 * 3) emit event for websocket.
 * 4) manage items of operateLayer.
 */

const toolStatus = {
  move: 'move',
  select: 'select',
  drawing: 'drawing',
  scale: 'scale',
  translate: 'translate',
};
export default class Tool {
  private _init: any;
  private _cursor?: string;
  globalCtx?: IContext; // 白板上下文，在实例化后注入；
  mode = toolStatus.select;
  type: IToolType;
  layer?: ILayer;

  constructor(type) {
    this.type = type;

    if (typeof this._init === 'function') {
      this._init();
    }
  }

  setLayerCursor(cursor) {
    if (!this._cursor && this.layer) this.layer.setCursor(cursor);
  }

  /**
   * Items of activeLayer.
   */
  get items() {
    return items;
  }

  // /**
  //  * Get layer of tool
  //  */
  // set layer(value: ILayer) {
  //   this._layer = value;
  // }

  // get layer(): ILayer {
  //   return this._layer;
  // }
}
