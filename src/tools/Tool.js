/**
 * Base class of tools
 */
export default class Tool {
  cursor = "pointer";
  _layer = null;

  constructor(){

  }

  get items(){
    return items;
  }

  set layer(value){
    this._layer = value;
  }

  get layer() {
    return this._layer;
  }
}
