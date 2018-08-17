
import Item from './Item';
/**
 * 图形成组，包括Path, Image, Text, CompoundPath
 * 用于成组的transform, delete
 */
export default class Group extends Item {

  _children = [];
  martix = null;

  constructor(items) {

  }

  /**
   * Get children.
   */
  get children() {
    return this._children;
  }

  get bounds() {
    let rect;
    this._children.forEach(path => {
      if (rect) return rect.unite(path.bounds);
      rect = path.bounds;
    });
    return rect;
  }

  transformContent() {
    this._children.forEach(item => item.transformContent());
  }

  _draw(ctx) {
    this._children.forEach(path => path.draw(ctx));
  }

  unGroup() {

  }
}
