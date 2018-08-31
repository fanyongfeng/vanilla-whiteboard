import Tool from './Tool';
import mutable from './mixins/mutable';
import { deepMixin } from '../decorators/mixin';

/**
 * Mutate Path of shape.
 */
@deepMixin(mutable())
export default class PathMutator extends Tool {}
