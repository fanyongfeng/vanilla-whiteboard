
import Image from '../../graphic/shape/Image';


export default function cursor(url) {
  return {
    _init(){
      if(typeof url === "function") {
        url = url(this.type);
      }
      this._cursor = new Image({}, url);
    },

    get cursor() {
      return this._cursor;
    },

    onMouseEnter({ point }){
      this.layer.setCursor(this.cursor);
    },

    onMouseMove({ point }) {
      if(this.cursor.loaded) {
        this.cursor.position = point;
      }
    },

    onMouseDrag({ point }) {
      if(this.cursor.loaded) {
        this.cursor.position = point;
      }
    },

    onMouseDown({ point }){
      console.log('--cursor');
    },
  }
}
