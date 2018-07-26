import Point from "../../types/Point"
import Shape from "../Shape";

export default class Line extends Shape {
  
  type = 'line';
  dash = [];

  buildPath() {

    this.path.moveTo(this.startPoint);
    this.path.lineTo(this.endPoint);
    this.path.closePath();

    return;
  }
}