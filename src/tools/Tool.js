export default class Tool {
  _layer = null;

  set layer(value){
    this._layer = value;
  }

  get layer() {
    return this._layer;
  }
}
