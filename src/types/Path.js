import Point from './Point';


class Command {

  constructor(){
    this.command = ""; // M, L, Q, C
  }
  
  get controlA(){
    return new Point();
  }

  get controlB(){
    return new Point();
  }

  get point(){
    
  }

  toJSON(){

  }

  toString(){

  }
}

/**
 * A full path 
 */
export default class Path {
  constructor(){
    this._segments = [];
  }

  get segments(){
    return this._segment;
  }

  add(segments){

  }

  toJSON(){

  }

  toString(){

  }
}