
import Image from '../../graphic/shape/Image';

const combineFunc = function combineFunc(origin, fn){
  if(!origin) return fn;
  return function(){
    origin.apply(this, arguments);
    fn.apply(this, arguments);
  }
}

export default function cursor(url) {

  return function (target) {

    target.prototype.cursor = new Image({ url });


    target.prototype.onMouseEnter = function ({ point }){
    }

    target.prototype.onMouseDown = combineFunc(target.prototype.onMouseDown, function ({ point }){
      console.log('--cursor');
    });


    target.prototype.onMouseMove = function({ point }) {
      this.layer.setCursor(this.cursor);
      if(this.cursor.loaded) {
        this.cursor.position = point;
      }
    }
  }
}
