import shapes from "./graphic";
import grid from "./component/grid";

import handler from './event/event';

//top-level APIs
/**
 * on
 */

class VanillaWhiteboard {
  // /version = __VERSION__;

  static install(){
    
  }

  constructor(canvas){
    handler.bind(canvas);
  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }
}

window.vwb = new VanillaWhiteboard(document.getElementById('canvas'))
