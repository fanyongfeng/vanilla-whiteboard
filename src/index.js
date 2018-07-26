
import playground from './playground'

//top-level APIs
/**
 * on
 */

class VanillaWhiteboard {
  // /version = __VERSION__;

  static install(){
    
  }

  constructor(options){

    playground.init(options.canvas);
    playground.event(options.canvas);
    playground.rect();
  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }
}

window._canvas = document.getElementById('canvas');

window.vwb = new VanillaWhiteboard({
  el:document.getElementById('canvas'),
  width: 800,
  height: 800,
})
