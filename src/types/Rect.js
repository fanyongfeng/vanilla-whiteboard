import Point from './Point';

const horizontal = ['left', 'centerX', 'right']; //CenterX
const vertical = ['top', 'centerY', 'bottom']; //CenterY

const boundsPoi = [
  'topLeft',
  'topCenter',
  'topRight',
  'rightCenter',
  'bottomRight',
  'bottomCenter',
  'bottomLeft',
  'leftCenter',
];

const antiDir = {
  'bottomRight': 'topLeft',
  'topLeft': 'bottomRight',
  'bottomLeft': 'topRight',
  'topRight': 'bottomLeft',
  'rightCenter': 'leftCenter',
  'leftCenter': 'rightCenter',
  'bottomCenter': 'topCenter',
  'topCenter': 'bottomCenter',
};


const create = Object.create,
describe = Object.getOwnPropertyDescriptor,
define = Object.defineProperty;

const capitalize = (str) => {
  return str.replace(/\b[a-z]/g, function(match) {
      return match.toUpperCase();
  });
}

const getKey = (y, x, indexY, indexX) => {
  if(indexY === 1) {
    if(indexX === 1) return 'center';
    return x + 'Center';
  }
  if(indexX === 1) return y + 'Center';
  return y + capitalize(x);
}

/**
 *  Type Rect
 */
class Rect {

  static instantiate(x, y, width, height) {
    if(typeof x === "number") return new Rect(x, y, width, height)
    return x;
  }

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;


    horizontal.forEach((x, indexX) => {
      vertical.forEach((y, indexY) => {
        let key = getKey(y, x, indexY, indexX);

        define(this, key, {
          enumerable: true,
          configurable: true,
          get: function(){
            return new Point(this[x], this[y]);
          },
          set: function(point){
            this[x] = point.x;
            this[y] = point.y;
            // A special setter where we allow chaining, because it comes in handy
            // in a couple of places in core.
            return this;
          },
        });
      });
    });
  }

  assign(rect) {
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
  get top() { return this.y; }
  set top(top) { this.y = top;}

  /**
   * The coordinate of the left.
   *
   * @type Number
   *
   */
  get left() { return this.x; }
  set left(left) { this.x = left; }

  /**
   * The coordinate of bottom, getter && setter
   *
   * @type Number
   *
   */
  get bottom() { return this.y + this.height; }
  set bottom(bottom) {  this.y = bottom - this.height; }

  /**
   * The coordinate of right, getter && setter
   *
   * @type Number
   */
  get right() { return this.x + this.width; }
  set right(right) { this.x  = right - this.width; }


  /**
   * The center-x coordinate of the rectangle.
   *
   * @type Number
   */
  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(val){
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

  set centerY(val){
    this.y = val - this.height / 2;
  }

  //alias for
  setCenter(x, y) {
    let point = Point.instantiate(point);
    this.center = point;
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
      ? this.containsRectangle(Rect.instantiate(arguments))
      : this.containsPoint(Point.instantiate(arguments));
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
    return new Rect(this.x, this.y, this.width, this.height);
  }

  expand(width, height) {
    if (typeof height === 'undefined') height = width;

    return new Rect(this.x - width / 2, this.y - height / 2,
      this.width + width, this.height + height);
  }

  /**
   * return point data as JSON-format: [x, y, width, height]
   */
  toJSON(){
    return [this.x , this.y, this.width, this.height];
  }

  toString() {
    return '{ x: ' + this.x
      + ', y: ' + this.y
      + ', width: ' + this.width
      + ', height: ' + this.height
      + ' }';
  }
}

window.Rect = Rect;

export default Rect;
