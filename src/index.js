
import playground from './playground'

//top-level APIs
/**
 * on('type', handler);
 *  possible-values:
 *  - changed 当白板上元素发生变化是，（返回变更的数据和Hash）
 *  - 
 */

class VanillaWhiteboard {
  // /version = __VERSION__;

  mode = 'readonly';

  static install(){
    
  }

  constructor(options){

    playground.init(options);
    playground.event();
    // playground.rect();
    playground.drawGrid();

    //playground.drawPolyline();
    playground.drawPolyline('cubicInOut');
    // playground.drawPolyline('circularInOut');
    // playground.drawPolyline('bounceInOut');

  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }

  export(){

  }

  import(){}

}

window.vwb = new VanillaWhiteboard()
