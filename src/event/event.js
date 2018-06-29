let dragging  = false

let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

//绑定流程和一般拖拽类似

window.vanilla = {
  init(canvas) {
    canvas.addEventListener('mousemove', (event) => {
      if(dragging) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#f00'
        ctx.lineWidth = 2

        ctx.beginPath();
        
        ctx.moveTo(event.offsetX, event.offsetY);
        console.log(event);
        ctx.closePath();

      }
    }, false);

    canvas.addEventListener('mousedown', () => {
      dragging = true;
    }, false);

    document.addEventListener('mouseup', () => {

      dragging = false;
    }, false);
  },
};



