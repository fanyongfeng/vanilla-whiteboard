
import items from '../store/items';
import canvasStatus from '../canvasStatus'

export default class Selection { 
  
  constructor(canvas){
    this.canvas = document.getElementById('canvas');
  }

  onMouseDown(event) {
    this.moveOnPoint(event);
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

  onMouseDrag(event){
    if(this.seg) {
      if(this.segp == '1') this.seg.control1.assign(event.point);
      else if(this.segp == '2') this.seg.control2.assign(event.point);
      else this.seg.point.assign(event.point);

    }
  }

  onMouseMove(event) {
    // this.moveOnElement(event);

    this.moveOnPoint(event);
  }

  onMouseUp(event) {
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}