
import items from '../store/items';

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
      //this.lastHover
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
          break;

        } else if(seg.control2.nearby(event.point)) {
          this.seg = seg;
          this.segp = '2';
          document.getElementById('opcanvas').style.cursor = 'pointer';
          break;

        } else {
          this.seg = null;
          this.segp = '2';
          document.getElementById('opcanvas').style.cursor = 'default';
        }
        
      }
    }

    point = items.items.find(item => item.path.segments); 

  }

  onMouseDrag(event){
    if(this.seg) {
      if(this.segp == '1') this.seg.control1 = event.point;
      else  this.seg.control2 = event.point;

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