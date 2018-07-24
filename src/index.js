
import playground from './playground'

//top-level APIs
/**
 * on
 */

class VanillaWhiteboard {
  // /version = __VERSION__;

  static install(){
    
  }

  constructor(canvas){

    playground.init(canvas);
    playground.event(canvas);
    playground.rect();
  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }
}

window._canvas = document.getElementById('canvas');

window.vwb = new VanillaWhiteboard(document.getElementById('canvas'))
