
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
    let hover = items.items.find(item => item.bounds.containsPoint(event.point));
  }

  onMouseUp(event) {
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}