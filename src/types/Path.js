import Point from './Point';
import Rect from './Rect';

class Command {

  controlA = null;
  controlB = null;
  point = null;

  constructor(name){
    this.name = name; // M, L, Q, C
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
    this._commands = [];
  }

  get commands(){
    return this._commands;
  }

  add(command){
    this._commands.push(command);
  }

  get bounds(){
    return new Rect(0,0,0,0);
  }

  simplify(){

  }

  smooth(){

  }

  clear(){
    this._commands = [];
  }

  arc(x, y, r, sa, ea){
    var cmd = new Command('A');
    cmd.arc = [x, y, r, sa, ea];
    this._commands.push(cmd);
    return this;
    // cmd
  }

  moveTo(point) {
    var cmd = new Command('M');
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  lineTo(point) {
    var cmd = new Command('L');
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  bezierCurveTo(cp1, cp2, point) {
    
    var cmd = new Command('C');
    cmd.controlA = cp1;
    cmd.controlB = cp2;
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  quadraticCurveTo(cp, point){

    var cmd = new Command('Q');
    cmd.controlA = cp;
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  closePath(){
    var cmd = new Command('Z');
    this._commands.push(cmd);
    return this;
  }

  toJSON(){
    return this._commands.map(item=>{
      var ret = [];
      if(item.point) ret.push(item.point.toJSON());
      if(item.controlA) ret.push(item.controlA.toJSON());
      if(item.controlB) ret.push(item.controlB.toJSON());
      return ret;
    });
  }

  toString(){
    return this._commands.map(item => {
      var ret = [];
      ret.push(item.name);
      if(item.controlA) ret.push(item.controlA.x, item.controlA.y);
      if(item.controlB) ret.push(item.controlB.x, item.controlB.y);
      if(item.point) ret.push(item.point.x, item.point.y);
      if(item.arc) ret.push.apply(ret, item.arc);
      return ret.join(' ');
    }).join(',');
  }
}