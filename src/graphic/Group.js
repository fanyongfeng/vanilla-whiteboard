import Item from './Item';
import ControlRect from './component/ControlRect';
import { observeProps } from '../decorators/memoized';
/**
 * 图形成组，包括Path, Image, Text, CompoundPath
 * 用于成组的transform, delete
 */

@observeProps({
  children: { type: Array, default: [] },
})
class Group extends Item {
  constructor(options, items = []) {
    super(options);
    this.children = items;
    this.control = new ControlRect({ linked: this });
  }

  append(item) {
    this.children.push(item);
  }

  prepend(item) {
    this.children.unshift(item);
  }

  /**
   * get bounds of path. It's a memoized getter for performance.
   * unite all children bounds.
   */
  get bounds() {
    return this.uniteBoundsOfChildren(this.children);
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

export default Group;
