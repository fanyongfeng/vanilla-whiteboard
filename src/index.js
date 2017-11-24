let dragging  = false

window.vanilla = {
  init(canvas) {
    canvas.addEventListener('mousemove', () => {
      console.log('1',dragging);
      if(dragging) {
        var ctxt = canvas.getContext('2d');
      }
    }, false);

    canvas.addEventListener('mousedown', () => {
      dragging = true;
    }, false);

    canvas.addEventListener('mouseup', () => {

      dragging = false;
    }, false);
  },
};

vanilla.init(document.getElementById('canvas'));

