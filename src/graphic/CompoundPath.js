import Path from './Path';
import Item from './Item';
import {createItemViaJSON} from './ItemFactory'

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

  static instantiate(preset, paths){

    let instance = new CompoundPath(preset);

    paths.forEach(path=> instance.add(createItemViaJSON(path)));

    return instance;

  }

  constructor(preset, paths) {
    super(preset);
    if(paths) this._children = paths;
  }

  add(path){
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

  get bounds(){
    let rect;
    this._children.forEach(path => {
      if(rect) return rect.unite(path.bounds);
      rect = path.bounds;
    });
    return rect;
  }

  _draw(ctx) {
    this._children.forEach(path => path.draw(ctx));
  }

  _toJSON(){
    return this._children.map(item => item.toJSON());
  }
}

export default CompoundPath
