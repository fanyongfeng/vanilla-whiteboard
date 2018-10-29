import Item, { ItemOptions } from './Item';
import Path from './Path';
import { memoized } from '../decorators/memoized';
import { createItemViaJSON } from './ItemFactory';
import { Segment } from './types/Segment';

/**
 * @class A compound path is a complex path that is made up of one or more
 * simple sub-paths. It can have the `nonzero` fill rule, or the `evenodd` rule
 * applied. Both rules use mathematical equations to determine if any region is
 * outside or inside the final shape. The `evenodd` rule is more predictable:
 * Every other region within a such a compound path is a hole, regardless of
 * path direction.
 */
class CompoundPath extends Item {
  private _children: Path[] = [];

  static instantiate(options: Partial<ItemOptions>, paths: Path[]) {
    let instance = new CompoundPath(options);
    paths.forEach(path => instance.add(createItemViaJSON(path)));
    return instance;
  }

  constructor(options: Partial<ItemOptions>, paths: Path[]  = []) {
    super(options);
    this._children = paths;
  }

  add(path: Path) {
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
      segments: Segment[] = [];
    for (let i = 0, l = children.length; i < l; i++) {
      segments.push.apply(segments, children[i].segments);
    }
    return segments;
  }

  /**
   * get bounds of path. It's a memoized getter for performance.
   */
  @memoized()
  get bounds() {
    return this.uniteBoundsOfChildren(this.children);
  }

  _draw(ctx: CanvasRenderingContext2D) {
    this._children.forEach(path => path.draw(ctx));
    return this;
  }

  _toJSON() {
    return this._children.map(item => item.toJSON());
  }
}

export default CompoundPath;
