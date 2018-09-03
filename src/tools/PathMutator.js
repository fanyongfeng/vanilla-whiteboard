import Tool from './Tool';
import mutable from './mixins/mutable';
import { deepMixin } from '../decorators/mixin';

/**
 * Mutate Path of shape.
 */
@deepMixin(mutable())
class PathMutator extends Tool {}

export default PathMutator;
