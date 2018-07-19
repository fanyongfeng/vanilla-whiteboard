//A playground of this proj
import shapes from "./graphic";
import grid from "./component/grid";
import handler from './event/event';
import CanvasMgr from "./whiteboard/canvas";


import Rect from "./types/Rect";
import Point from "./types/Point";


export default {
  canvas:null,

  init(){
    this.canvas = new CanvasMgr(canvas);
    console.log(this.canvas);
  },

  event(){
    handler.bind();
  },

  rect(){
    var rect = new shapes.Rect();
  }

}