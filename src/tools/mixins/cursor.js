
import Image from '../../graphic/shape/Image';


export default function cursor(url) {
  return {
    cursor:  new Image({}, url),
    onMouseEnter({ point }){
      this.layer.setCursor(this.cursor);
    },

    onMouseMove({ point }) {
      this.layer.setCursor(this.cursor);
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
