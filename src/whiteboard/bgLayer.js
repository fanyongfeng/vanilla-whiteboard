export default class bgLayer {
  constructor(){

    let el = document.createElement('canvas');

    el.width = this.width;
    el.height = this.height;

    this.el = el;
    
  } 
  
}