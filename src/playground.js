//A playground of this proj
import shapes from "./graphic";
import grid from "./component/grid";
import handler from './event/event';
import CanvasMgr from "./whiteboard/canvas";
import Path from "./types/Path";


import Rect from "./types/Rect";
import Point from "./types/Point";

import ease from './animate/ease'

import fitCurve from './util/fitCurve'

window.paths = [];

export default {
  canvas:null,

  init(){
    this.canvas = new CanvasMgr(canvas);
    console.log(this.canvas);
  },

  event(canvas){
    handler.bind(canvas);
  },

  rect(){
    var rect = new shapes.Rect();
  },

  drawPolyline(type) {
    type = type || 'linear';
    let p1 = new Path();
    p1.moveTo(new Point(0 ,500));
    for(var i = 0; i < 10; i++) {
      var k = ease[type](i/10);
      p1.lineTo(new Point(i* 50, 500 - k* 500))
    }

    //p1.simplify();

    p1.draw(this.canvas.ctx);
    window.paths.push(p1)
  }

}