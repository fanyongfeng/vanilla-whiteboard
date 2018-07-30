/**
 * 
 */
export default class Point {
  type = 'point'

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

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

  nearby(point, threshold = 5) {
    return this.distanceFrom(point) < threshold;
  }

  subtract(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
 * Normalize modifies the {@link #length} of the vector to `1` without
 * changing its angle and returns it as a new point. The optional `length`
 * parameter defines the length to normalize to. The object itself is not
 * modified!
 *
 * @param {Number} [length=1] The length of the normalized vector
 * @return {Point} the normalized vector of the vector that is represented
 *     by this point's coordinates
 */
  normalize(length) {
    if (length === undefined)
      length = 1;
    var current = this.length,
      scale = current !== 0 ? length / current : 0,
      point = new Point(this.x * scale, this.y * scale);
    // Preserve angle.
    if (scale >= 0)
      point._angle = this._angle;
    return point;
  }

  /**
    * return a cloned instance of the point
    * @return {fabric.Point}
    */
  clone() {
    return new Point(this.x, this.y);
  }

  toJSON() {
    return [this.x, this.y];
  }

  toString() {
    return '{ x: ' + this.x + ', y: ' + this.y + ' }';
  }
}