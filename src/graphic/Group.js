
import Item from './Item';
/**
 * 图形成组，包括Path, Image, Text, CompoundPath
 * 用于成组的transform, delete
 */
export default class Group extends Item {
  _children = [];

  constructor(options, items = []) {
    super(options);
    this._children = items;
  }

  add(path) {
    this._children.push(path);
  }

  /**
   * Get children.
   */
  get children() {
    return this._children;
  }

  /**
   * get bounds of path. It's a memoized getter for performance.
   */
  @memoized()
  get bounds() {
    let x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;

    for (let i = 0, l = this.children.length; i < l; i++) {
      let bound = this.children[i].bounds;

      let xn = bound.x,
        yn = bound.y,
        xx = bound.x + bound.width,
        yx = bound.y + bound.height;

      if (xn < x1) x1 = xn;
      if (xx > x2) x2 = xx;
      if (yn < y1) y1 = yn;
      if (yx > y2) y2 = yx;
    }

    return new Rect(x1, y1, x2 - x1, y2 - y1, this);
  }

  _draw(ctx) {
    this._children.forEach(path => path.draw(ctx));
  }

  _toJSON() {
    return this._children.map(item => item.toJSON());
  }
}
