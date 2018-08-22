/**
 * Base class of tools, for:
 * 1) create item.
 * 2) handle mouse & keyboard event.
 * 3) emit event for websocket.
 * 4) manage items of operateLayer.
 */
export default class Tool {
  _layer = null;
  constructor(){

  }

  /**
   * Items of activeLayer.
   */
  get items(){
    return items;
  }

  /**
   * Get layer of
   */
  set layer(value){
    this._layer = value;
  }

  get layer() {
    return this._layer;
  }
}
