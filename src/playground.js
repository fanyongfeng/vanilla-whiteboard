//A playground of this proj
import CanvasMgr from "./whiteboard/canvas";

import Path from "./graphic/Path";
import Point from "./graphic/types/Point";

import Grid from './component/Grid'
import Axes from './component/Axes'

import animate from './animate/animate';
import easing from './animate/easing';
import animateColor from './animate/animateColor';


export default {

  init(){
    window.canvas = this.canvas = new CanvasMgr({
      container:document.getElementById('draw-panel'),
      width: 1000,
      height: 800,
    });
  },

  drawGrid(){
    let grid = new Grid(true);
    grid.draw(this.canvas.bgCtx, this.canvas.width, this.canvas.height);
  },

  drawAxes(){
    let grid = new Axes();
    grid.draw(this.canvas.bgCtx, this.canvas.width, this.canvas.height);
  },


  drawPolyline(type) {
    type = type || 'linear';
    let p1 = new Path();
    p1.moveTo(new Point(0 ,500));
    for(var i = 0; i < 10; i++) {
      var k = ease[type](i/10);
      p1.lineTo(new Point(i* 50, 500 - k* 500))
    }

    // p1.simplify();

    p1.draw(this.canvas.ctx);
    window.paths.push(p1)
  },

  animateScale(){
    let item = items[0];
    let point = item.position;
    // let ease = easing.bounceInOut;
    let ease = easing.cubicIn;
    console.time('anim');
    let lastValue = 1;

    animate({
      startValue: 1,
      endValue: 0.3,
      duration: 400,
      easing: ease,
      onChange(value, valueProgress, timeProgress){
        item.scale(value / lastValue, value / lastValue);
        lastValue = value;
        canvas.refresh();
      },
      onComplete(value, valueProgress, timeProgress){
        console.log(value, valueProgress, timeProgress);
        console.timeEnd('anim');
      }
    });
  },

  animate(){
    let item = items[0];
    let point = item.position;
    // let ease = easing.bounceInOut;
    let ease = easing.cubicIn;
    console.time('anim');

    animate({
      startValue: 0,
      endValue: 100,
      duration: 400,
      easing: ease,
      onChange(value, valueProgress, timeProgress){
        item.setPosition(point.x + value, point.y + value);
        canvas.refresh();
      },
      onComplete(value, valueProgress, timeProgress){
        console.log(value, valueProgress, timeProgress);
        console.timeEnd('anim');
      }
    });
  },

  animateRotate(){
    let item = items[0];
    let point = item.position;
    let ease = easing.cubicIn;
    console.time('anim');
    let lastValue = 1;

    animate({
      startValue: 0,
      endValue: 360,
      duration: 1000,
      easing: ease,
      onChange(value, valueProgress, timeProgress){
        console.log(value - lastValue);
        item.rotate(value - lastValue);
        lastValue = value;
        canvas.refresh();
      },
      onComplete(value, valueProgress, timeProgress){
        console.log(value, valueProgress, timeProgress);
        console.timeEnd('anim');
      }
    });
  },

}
