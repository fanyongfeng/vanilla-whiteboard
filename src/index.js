
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

    //playground.event();
    playground.init(canvas);
    playground.rect();
  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }
}

window.vwb = new VanillaWhiteboard(document.getElementById('canvas'))
