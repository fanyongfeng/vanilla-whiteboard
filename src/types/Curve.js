import Point from './Point';
/**
 * 
 */
export default class Curve {

  constructor(start, control1, control2, end) {
    this.start = start;
    this.end = end;
    this.control1 = control1;
    this.control2 = control2;
  }

  get strokeBounds(){

  }

  get bounds(){

  }

  get points(){
    return [
      this.start,
      this.control1,
      this.control2,
      this.end,
    ]
  }

  /**
   * return point data as JSON-format:
   */
  toJSON() {
    return [
      this.start.toJSON,
      this.control1.toJSON,
      this.control2.toJSON,
      this.end.toJSON,
    ];
  }

  /**
   * return point data as String-format
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }
}