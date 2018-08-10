import { isZero } from '../algorithm/math'
/**
 * The base type of graphic ,(location & vector)
 */
export default class Point {

  /**
   * static method to create instance from params
   */
  static instantiate(x, y) {
    if (typeof x === "number") {
      return typeof y === "number" ? new Point(x, y) : new Point(x, x);
    }
    return x;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isZero() {
    return isZero(this.x) && isZero(this.y);
  }

  /**
    * Returns the addition of the supplied value to both coordinates of
  * the point as a new point.
  * The object itself is not modified!
  */
  add(point) {
    point = Point.instantiate(point);
    return new Point(this.x + point.x, this.y + point.y);
  }

  /**
   * Transforms the point by the matrix as a new point. The object itself is
   * not modified!
   *
   * @param {Matrix} matrix
   * @return {Point} the transformed point
   */
  transform(matrix) {
    matrix.applyToPoint(this);
    return this;
  }

  /**
   * Returns the multiplication of the supplied point to the point as a new
   * point.
   * The object itself is not modified!
   */
  multiply(point) {
    point = Point.instantiate(point);
    return new Point(this.x * point.x, this.y * point.y);
  }

  /**
    * Returns the subtraction of the supplied value to both coordinates of
    * the point as a new point.
    * The object itself is not modified!
    */
  subtract(point) {
    point = Point.instantiate(point);
    return new Point(this.x - point.x, this.y - point.y);
  }

  /**
   * Returns the division of the supplied value to both coordinates of
   * the point as a new point.
   * The object itself is not modified!
   */
  divide(point) {
    point = Point.instance(point);
    return new Point(this.x / point.x, this.y / point.y);
  }

  /**
   * Add and return this
   * @param {Point} other
   */
  addEquals(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  /**
   * Assign x, y from other point.
   * @param {*} point
   */
  assign(point) {
    this.x = point.x;
    this.y = point.y;
    return this;
  }

  /**
   * If the point coord is equal to the other point.
   * @param {Point} other
   */
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

  /**
   * Returns distance from other point.
   * @param {point} other
   */
  getDistance(other) {
    let dx = this.x - other.x,
      dy = this.y - other.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   *
   * @param {Point} point
   * @param {number} threshold
   */
  nearby(point, threshold = 4) {
    return this.getDistance(point) < threshold;
  }

  /**
   * negate point & return a new point.
   */
  negate() {
    return new Point(-this.x, -this.y);
  }

  /**
   * get the length of point from (0,0);
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get Angle In Radians, Vector
   */
  get angle() {
    if (!this.length) return 0;
    return Math.atan2(this.y, this.x);
  }

  /**
 * Rotates the point by the given angle around an optional center point.
 * The object itself is not modified.
 *
 * Read more about angle units and orientation in the description of the
 * {@link #angle} property.
 *
 * @param {Number} angle the rotation angle
 * @param {Point} center the center point of the rotation
 * @return {Point} the rotated point
 */
  rotate(angle, center) {
    if (angle === 0)
      return this.clone();
    angle = angle * Math.PI / 180;

    let point = center ? this.subtract(center) : this,
      sin = Math.sin(angle),
      cos = Math.cos(angle);

    point = new Point(
      point.x * cos - point.y * sin,
      point.x * sin + point.y * cos
    );

    return center ? point.add(center) : point;
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
    if (length === undefined) length = 1;

    let current = this.length,
      scale = current !== 0 ? length / current : 0;

    return new Point(this.x * scale, this.y * scale);
  }

  /**
   * {@group-title Vector Math Functions}
   * Returns the dot product of the point and another point.
   *
   * @param {Point} point
   * @return {Number} the dot product of the two points
   */
  dot(point) {
    return this.x * point.x + this.y * point.y;
  }

  /**
   * return a cloned instance of the point
   * @return {Point}
   */
  clone() {
    return new Point(this.x, this.y);
  }

  /**
   * return point data as JSON-format: [x, y]
   */
  toJSON() {
    return [this.x, this.y];
  }

  /**
   * return point data as String-format
   */
  toString() {
    return '{ x: ' + this.x + ', y: ' + this.y + ' }';
  }
}
