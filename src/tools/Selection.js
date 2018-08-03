
import items from '../store/items';

export default class Selection { 
  
  constructor(canvas){
    this.canvas = document.getElementById('canvas');
  }

  onMouseDown(event) {

    let hover = items.items.find(item => item.bounds.containsPoint(event.point));

    if(hover && hover.selectable === true) {
      console.log(hover);
      hover.selected = true;
    }
  }

  onMouseMove(event) {
    let hover;
    //  hover = items.items.find(item => item.bounds.containsPoint(event.point));
     hover = items.items.find(item => item.path.containPoint(event.point)); 
    //  hover = items.items.find(item => {
    //   console.log(document.getElementById('canvas').getContext('2d').isPointInStroke(item.path.path2dObj, event.point.x, event.point.y))
    // });


    if(hover) {
      hover.drawBoundRect();
      this.lastHover = hover;
      // console.log(!!hover);
    } else {
      //this.lastHover
    }
  }

  onMouseUp(event) {
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}