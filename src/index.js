import shapes from "./graphic";
import grid from "./component/grid";

window.vanilla = {
  init(canvas) {
    var ctx = canvas.getContext('2d');

    var arc =new shapes.Arc();
    arc.render(ctx);

  }
}
vanilla.init(document.getElementById('canvas'));