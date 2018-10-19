import OperateLayer from '../Whiteboard/OperateLayer';

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
  private _layer!: OperateLayer;
  private _cursor!: string;
  private _init!: () => void;

  public globalCtx!: IContext; // 白板上下文，在实例化后注入；
  public mode = toolStatus.select;
  public type: IToolType;

  constructor(type: IToolType) {
    this.type = type;

    if (typeof this._init === 'function') {
      this._init();
    }
  }

  setLayerCursor(cursor: string) {
    if (!this._cursor) this.layer.setCursor(cursor);
  }

  /**
   * Items of activeLayer.
   */
  get items() {
    return window.items;
  }

  /**
   * Get layer of tool
   */
  set layer(value) {
    this._layer = value;
  }

  get layer() {
    return this._layer;
  }
}
