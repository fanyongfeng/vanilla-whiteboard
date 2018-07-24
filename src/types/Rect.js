import Point from './Point';

const dirs = [
  ['Top', 'Left'], ['Top', 'Right'],
  ['Bottom', 'Left'], ['Bottom', 'Right'],
  ['Left', 'Center'], ['Top', 'Center'],
  ['Right', 'Center'], ['Bottom', 'Center']
];

/**
 * 
 */
class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * The coordinate of the top, left, right, bottom.
   *
   * @bean
   * @type Number
   * @ignore
   */
  get top() { return this.y; }
  get left() { return this.x; }
  get bottom() { return this.y + this.height; }
  get right() { return this.x + this.width; }

  get topRight() { return new Point(this.right, this.top); }

  /**
   * The center-x coordinate of the rectangle.
   *
   * @bean
   * @type Number
   * @ignore
   */
  get centerX() {
    return this.x + this.width / 2;
  }

  /**
   * The center-y coordinate of the rectangle.
   *
   * @bean
   * @type Number
   * @ignore
   */
  get centerY() {
    return this.y + this.height / 2;
  }

  /**
   * The center point coordinate of the rectangle.
   *
   * @bean
   * @type Point
   * @ignore
   */
  get center() {
    return new Point(this.centerX, this.centerY);
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
   * @param {Rectangle} rect the rectangle to be combined with this rectangle
   * @return {Rectangle} the smallest rectangle containing both the specified
   * rectangle and this rectangle
   */
  unite(rect) {
    let x1 = Math.min(this.x, rect.x),
      y1 = Math.min(this.y, rect.y),
      x2 = Math.max(this.x + this.width, rect.x + rect.width),
      y2 = Math.max(this.y + this.height, rect.y + rect.height);

    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  }


  contains(arg) {
    // Detect rectangles either by checking for 'width' on the passed object
    // or by looking at the amount of elements in the arguments list,
    // or the passed array:
    return arg && arg.width !== undefined
      || (Array.isArray(arg) ? arg : arguments).length === 4
      ? this._containsRectangle(Rectangle.read(arguments))
      : this._containsPoint(Point.read(arguments));
  }

  /**
   *  Tests if the specified point is inside the boundary of the rectangle.
   *
   * @function
   * @param {Point} point the specified point
   * @type Boolean
   * @ignore
   */
  containsPoint(point) {
    var x = point.x,
      y = point.y;
    return x >= this.x && y >= this.y
      && x <= this.x + this.width
      && y <= this.y + this.height;
  }

  /**
   *   Tests if the interior of the rectangle entirely contains the specified
   *
   * @function
   * @param {Rect} point the specified rectangle
   * @type Boolean
   * @ignore
   */
  containsRectangle(rect) {
    var x = rect.x,
      y = rect.y;
    return x >= this.x && y >= this.y
      && x + rect.width <= this.x + this.width
      && y + rect.height <= this.y + this.height;
  }

  /**
   * Returns a copy of the rectangle.
   * 
   * @function
   * @type Point
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

export default Rect;