import shapes from "./graphic";
import grid from "./component/grid";

let dragging = false;

//top-level APIs
/**
 * on
 */

class VanillaWhiteboard {
  static install(){
    
  }

  constructor(canvas){
    var ctx = canvas.getContext('2d');

    var arc =new shapes.Arc();
    arc.render(ctx);

    canvas.addEventListener('mousemove', (event) => {
      if(dragging) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#f00'
        ctx.lineWidth = 2

        ctx.beginPath();
        
        ctx.moveTo(event.offsetX, event.offsetY);

        console.log(event);
        console.log(event.movementX, event.movementY);
        ctx.closePath();

      }
    }, false);

    canvas.addEventListener('mousedown', () => {
      dragging = true;

     
    }, false);

    document.addEventListener('mouseup', () => {
      dragging = false;
    }, false);
  }
  
  on(type, fn){

  }
    
  off(type, fn){
    
  }
}

window.vwb = new VanillaWhiteboard(document.getElementById('canvas'))
