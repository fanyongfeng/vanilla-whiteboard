import Item, { ItemOptions } from './Item';
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
  private control: ControlRect;

  constructor(options?: Partial<ItemOptions>, items: Item[] = []) {
    super(options);
    this.children = items;
    this.control = new ControlRect({ linked: this });
  }

  append(item: Item) {
    this.children.push(item);
  }

  prepend(item: Item) {
    this.children.unshift(item);
  }

  /**
   * get bounds of path. It's a memoized getter for performance.
   * unite all children bounds.
   */
  get bounds() {
    return this.uniteBoundsOfChildren(this.children);
  }

  protected _draw(ctx:CanvasRenderingContext2D) {
    this.control.draw(ctx);
    return this;
  }

  /**
   * Data for serialization.
   */
  protected _toJSON() {
    return this.children.map(item => item.toJSON());
  }
}

export default Group;
