/**
 * 
 */
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  type = 'point'

  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  addEquals(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  eq(other) {
    return this === other || (this.x === other.x && this.y === other.y);
  }

  /**
   * Returns new point which is the result of linear interpolation with this one and another one
   * @param {Point} other
   * @param {Number} t , position of interpolation, between 0 and 1 default 0.5
   * @return {Point}
   */
  lerp(other, t) {
    if (typeof t === 'undefined') {
      t = 0.5;
    }
    t = Math.max(Math.min(1, t), 0);
    return new Point(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t);
  }

  /**
   * Returns the point between this point and another one
   * @param {fabric.Point} other
   * @return {fabric.Point}
   */
  midPointFrom(other) {
    return this.lerp(other);
  }

  distanceFrom(other) {
    let dx = this.x - other.x,
      dy = this.y - other.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  nearby(point, threshold = 5){
    return this.distanceFrom(point) < threshold;
  }

  /**
    * return a cloned instance of the point
    * @return {fabric.Point}
    */
  clone() {
    return new Point(this.x, this.y);
  }

  toString() {
    return '{ x: ' + this.x + ', y: ' + this.y + ' }';
  }
}