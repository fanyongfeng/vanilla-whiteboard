/**
 * Base class of tools, for:
 * 1) create item.
 * 2) handle mouse & keyboard event.
 * 3) emit event for websocket.
 * 4) manage items of operateLayer.
 */
export default class Tool {
  ctx = null; //白板上下文，在实例化后注入；
  _layer = null;
  constructor(type){
    this.type = type;
    this._init && this._init();
  }

  /**
   * Items of activeLayer.
   */
  get items(){
    return items;
  }

  /**
   * Get layer of tool
   */
  set layer(value){
    this._layer = value;
  }

  get layer() {
    return this._layer;
  }
}
