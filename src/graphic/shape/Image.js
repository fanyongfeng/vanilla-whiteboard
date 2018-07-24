import Element from "../Element"
export default class Image extends Element { 

  loaded = false;

  get src(){

  }

  set src(ref) {

  }

  onLoaded(image){
    this.loaded = true;

    let width = image ? image.naturalWidth || image.width : 0;
    let height = image ? image.naturalHeight || image.height : 0;
  }

  renderStroke(){
    //TODO: render dash stroke
  }
}