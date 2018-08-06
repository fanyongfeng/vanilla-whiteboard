
import playground from './playground'

//top-level APIs
/**
 * on('type', handler);
 *  possible-values:
 *  - changed 当白板上元素发生变化时，（返回变更的数据和Hash）
 *  - add 当元素新增时
 *  - remove 当元素删除时
 *  -
 *
 * options:
 *  - selectionMode: 'bounds', 'path'
 *  - alignToGrid: boolean 对齐到网格
 *
 */

class VanillaWhiteboard {
  // /version = __VERSION__;

  mode = 'readonly';

  static install(){

  }

  constructor(options){

    playground.init(options);


    /**
     * draw background
     */
    playground.drawGrid();
    playground.drawAxes();


    // playground.drawPolyline();
    // playground.drawPolyline('cubicInOut');
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
