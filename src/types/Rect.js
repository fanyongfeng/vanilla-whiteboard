import Point from './Point';
export default class Rect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * The center-x coordinate of the rectangle.
   *
   * @bean
   * @type Number
   * @ignore
   */
  getCenterX() {
    return this.x + this.width / 2;
  }

  /**
   * The center-y coordinate of the rectangle.
   *
   * @bean
   * @type Number
   * @ignore
   */
  getCenterY() {
    return this.y + this.height / 2;
  }

  getCenter() {
    return new Point(this.getCenterX(), this.getCenterY());
  }

      /**
     * Returns a copy of the rectangle.
     */
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  toString() {
    return '{ x: ' + this.x
      + ', y: ' + this.y
      + ', width: ' + this.width
      + ', height: ' + this.height
      + ' }';
  }
}