
import items from '../store/items';
import canvasStatus from '../canvasStatus';
import Rect from '../graphic/shape/Rect';

const cursorMap =  [
  'n-resize',
  'ne-resize',
  'e-resize',
  'se-resize',
  's-resize',
  'sw-resize',
  'w-resize',
  'nw-resize'
];


export default class Selection {

  constructor(canvas){
    this.canvas = document.getElementById('opcanvas');
    this.ctx = this.canvas.getContext('2d')
  }

  setCursor =  (value) => {
    this.canvas.style.cursor = value;
  }

  moveOnElement(event){

    let hover;
    //  hover = items.items.find(item => item.bounds.containsPoint(event.point));
     hover = items.items.find(item => item.path.containPoint(event.point));
    //  hover = items.items.find(item => {
    //   console.log(document.getElementById('canvas').getContext('2d').isPointInStroke(item.path.path2dObj, event.point.x, event.point.y))
    // });


    if(hover) {
      hover.drawBoundRect();
      this.lastHover = hover;
      console.log(!!hover);
    } else {
      this.lastHover && this.lastHove;
      this.lastHover = null;
    }
  }

  moveOnPoint(event){

    let point; //.containPoint(event.point)

    for(let i=0; i<items.items.length; i++ ) {

      let segments = items.items[i].path.segments;

      for(let j=0; j<segments.length; j++ ) {
        let seg = segments[j];
        if(seg.command !== 'C') continue;


        if(seg.control1.nearby(event.point)) {
          this.seg = seg;
          this.segp = '1';
          document.getElementById('opcanvas').style.cursor = 'pointer';
          canvasStatus.isSelectionMode = true;
          break;

        } else if(seg.control2.nearby(event.point)) {
          this.seg = seg;
          this.segp = '2';
          document.getElementById('opcanvas').style.cursor = 'pointer';
          canvasStatus.isSelectionMode = true;
          break;

        }
        else if(seg.point.nearby(event.point)) {
          this.seg = seg;
          this.segp = '3';
          document.getElementById('opcanvas').style.cursor = 'pointer';
          canvasStatus.isSelectionMode = true;
          break;

        } else {
          this.seg = null;
          this.segp = '';
          document.getElementById('opcanvas').style.cursor = 'default';

          canvasStatus.isSelectionMode = false;
        }

      }
    }

    point = items.items.find(item => item.path.segments);

  }

  onMouseDown(event) {
    this.moveOnPoint(event);

    this.selectionRect = new Rect();

    // strokeColor: '#ccc',
    // strokeWidth: 1,
    // dashArray: [5, 2],
    this.selectionRect.startPoint = this.selectionRect.endPoint = event.point;
  }

  onMouseDrag(event){
    if(this.seg) {
      if(this.segp == '1') this.seg.control1.assign(event.point);
      else if(this.segp == '2') this.seg.control2.assign(event.point);
      else this.seg.point.assign(event.point);
    }

    this._drawSelectArea(event);

  }

  moveOnController(event){

  }

  onMouseMove(event) {

    // this.moveOnElement(event);
    // this.moveOnPoint(event);

    this.moveOnController(event);
  }

  _drawSelectArea(event){
    var ctx = this.ctx;
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.selectionRect.endPoint = event.point;

    this.selectionRect.path.clear();
    this.selectionRect.buildPath();
    this.selectionRect.draw(ctx)

  }

  _multiSelecting(event){

  }

  onMouseUp(event) {
    var ctx = this.ctx;
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}
