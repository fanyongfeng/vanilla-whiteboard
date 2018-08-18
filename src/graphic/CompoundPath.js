import { memoized } from '../decorators/memoized'
import Rect from './types/Rect';
import Item from './Item';
import { createItemViaJSON } from './ItemFactory'

/**
 * @class A compound path is a complex path that is made up of one or more
 * simple sub-paths. It can have the `nonzero` fill rule, or the `evenodd` rule
 * applied. Both rules use mathematical equations to determine if any region is
 * outside or inside the final shape. The `evenodd` rule is more predictable:
 * Every other region within a such a compound path is a hole, regardless of
 * path direction.
 */
class CompoundPath extends Item {
  _children = [];

  static instantiate(options, paths) {
    let instance = new CompoundPath(options);
    paths.forEach(path => instance.add(createItemViaJSON(path)));
    return instance;

  }

  constructor(options, paths = []) {
    super(options);
    this._children = paths;
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
   * Get segments
   */
  get segments() {
    let children = this._children,
      segments = [];
    for (let i = 0, l = children.length; i < l; i++)
      segments.push.apply(segments, children[i].segments);
    return segments;
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

export default CompoundPath
