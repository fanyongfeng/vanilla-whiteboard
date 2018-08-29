import Item from './Item';
import Rect from './types/Rect';
import ControlRect from './component/ControlRect';
import { observeProps } from '../decorators/memoized';
/**
 * 图形成组，包括Path, Image, Text, CompoundPath
 * 用于成组的transform, delete
 */

@observeProps({
  children: { type: Array, default: [] }
})
export default class Group extends Item {

  constructor(options, items = []) {
    super(options);
    this._children = items;
    this.control = new ControlRect({ linked : this});
  }

  append(item) {
    this._children.push(item);
  }

  prepend(item) {
    this._children.unshift(item);
  }

  /**
   * get bounds of path. It's a memoized getter for performance.
   * unite all children bounds.
   */
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
    this.control.draw(ctx, this.bounds);
  }

  /**
   * Data for serialization.
   */
  _toJSON() {
    return this._children.map(item => item.toJSON());
  }
}
