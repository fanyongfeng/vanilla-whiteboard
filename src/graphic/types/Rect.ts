import Point from './Point';
import { props } from '../algorithm/corner';
import { mixinProps } from '../../decorators/mixin';
import Item from '../Item';
import Matrix from './Matrix';

/**
 *  Type Rect
 */
@mixinProps(props)
class Rect {

  /**
   * static method to create instance from params
   */
  static instantiate(x: number, y: number, width: number, height: number) {
    if (typeof x === 'undefined') throw TypeError('Invalid arguments!');
    return new Rect(x, y, width, height);
    // if x is Rect
    // return x.clone();
  }

  x = 0;
  y = 0;
  width = 0;
  height = 0;
  owner: Item | null; // tool instance
  center: Point;

  constructor(x: number, y: number, width: number, height: number, owner?: Item) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.owner = owner || null;
    this.center = Point.instantiate(this.centerX, this.centerY);
  }

  /**
   * Assign x, y, width, height from other rect.
   * @param rect
   */
  assign(x: number, y: number, width: number, height: number) {
    let rect = Rect.instantiate(x, y, width, height);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }

  /** The coordinate of the top, left, right, bottom. */

  /**
   * The coordinate of the top.
   *
   * @type Number
   *
   */
  get top(): number {
    return this.y;
  }
  set top(top: number) {
    this.y = top;
  }

  /**
   * The coordinate of the left.
   *
   * @type Number
   *
   */
  get left() {
    return this.x;
  }
  set left(left: number) {
    this.x = left;
  }

  /**
   * The coordinate of bottom, getter && setter
   *
   * @type Number
   *
   */
  get bottom() {
    return this.y + this.height;
  }
  set bottom(bottom: number) {
    this.y = bottom - this.height;
  }

  /**
   * The coordinate of right, getter && setter
   *
   * @type Number
   */
  get right() {
    return this.x + this.width;
  }
  set right(right: number) {
    this.x = right - this.width;
  }

  /**
   * The center-x coordinate of the rectangle.
   *
   * @type Number
   */
  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(val: number) {
    this.x = val - this.width / 2;
  }

  /**
   * The center-y coordinate of the rectangle.
   *
   * @type Number
   */
  get centerY() {
    return this.y + this.height / 2;
  }

  set centerY(val: number) {
    this.y = val - this.height / 2;
  }

  //alias for setter ‘center’
  setCenter(x: number, y: number) {
    this.center = Point.instantiate(x, y);
    return this;
  }

  /**
   * The area of the rectangle.
   *
   * @bean
   * @type Number
   */
  get area() {
    return this.width * this.height;
  }

  /**
   * Returns a new rectangle representing the union of this rectangle with the
   * specified rectangle.
   *
   * @param rect the rectangle to be combined with this rectangle
   * @return the smallest rectangle containing both the specified
   * rectangle and this rectangle
   */
  unite(rect: Rect) {
    let x1 = Math.min(this.x, rect.x),
      y1 = Math.min(this.y, rect.y),
      x2 = Math.max(this.x + this.width, rect.x + rect.width),
      y2 = Math.max(this.y + this.height, rect.y + rect.height);

    return new Rect(x1, y1, x2 - x1, y2 - y1);
  }

  /**
   * Returns a new rectangle representing the intersection of this rectangle with the
   * specified rectangle.
   *
   * @param rect the rectangle to be combined with this rectangle
   * @return the smallest rectangle containing both the specified, if
   * rectangle and this rectangle
   */
  intersect(rect: Rect) {
    let x1 = Math.max(this.x, rect.x);
    var width1 = Math.min(this.x + this.width, rect.x + rect.width);
    var y1 = Math.max(this.y, rect.y);
    var height1 = Math.min(this.y + this.height, rect.y + rect.height);
    if (width1 >= x1 && height1 >= y1) {
      return new Rect(x1, y1, width1, height1);
    }
    return null;
  }

  /**
   *  Tests if the specified point is inside the boundary of the rectangle.
   *
   * @function
   * @param point the specified point
   * @type Boolean
   * @ignore
   */
  containsPoint(point: Point) {
    var x = point.x,
      y = point.y;
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
  }

  /**
   * Tests if the interior of the rectangle entirely contains the specified
   *
   * @function
   * @param point the specified rectangle
   * @type Boolean
   * @ignore
   */
  containsRect(rect: Rect) {
    var x = rect.x,
      y = rect.y;
    return (
      x >= this.x && y >= this.y && x + rect.width <= this.x + this.width && y + rect.height <= this.y + this.height
    );
  }

  /**
   * Returns a copy of the rectangle.
   *
   * @function
   * @type Point
   */
  clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  /**
   * If the rect is equal to the other rect.
   * @param other
   */
  equals(other: Rect): boolean {
    return (
      this === other ||
      (this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height)
    );
  }

  /**
   * Expend width, height. as same keep center
   * @param width
   * @param height
   */
  expand(width: number, height?: number): Rect {
    if (typeof height === 'undefined') height = width;

    return new Rect(this.x - width / 2, this.y - height / 2, this.width + width, this.height + height);
  }

  /**
   * transform by matrix
   * @param matrix
   */
  transform(matrix: Matrix) {
    matrix.applyToRect(this);
  }

  /**
   * return point data as JSON-format: [x, y, width, height]
   */
  toJSON() {
    return [this.x, this.y, this.width, this.height];
  }

  /**
   * return string format.
   */
  toString() {
    return '{ x: ' + this.x + ', y: ' + this.y + ', width: ' + this.width + ', height: ' + this.height + ' }';
  }
}

export default Rect;
