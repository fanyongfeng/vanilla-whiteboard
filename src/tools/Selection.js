import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import selectable from './mixins/selectable';
import transformable from './mixins/transformable';
import { deepMixin } from '../decorators/mixin';

/**
 * Select Tool of whiteboard.
 */
@deepMixin(transformable())
@deepMixin(selectable())
@deepMixin(dragBounds())
export default class Selection extends Tool {}
