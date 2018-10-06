import Tool from './Tool';
import mutable from './mixins/mutable';
import { deepMixin } from '../decorators/mixin';

/**
 * Mutate Path of shape.
 *
 * 通过拖拽Segment控制点，变形Path
 */
@deepMixin(mutable())
class PathMutator extends Tool {}

export default PathMutator;
