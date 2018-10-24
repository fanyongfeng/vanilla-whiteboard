import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import selectable from './mixins/selectable';
import transformable from './mixins/transformable';
import { deepMixin } from '../decorators/mixin';

/**
 * Select Tool of whiteboard.
 *
 * Inject following behaviors for tool 'Selection'
 * 1) 当拖拽时生成“拖拽框”
 * 2) 当拖拽时选中白板Items
 * 3）当拖拽控制点时可以变形Items
 */
@deepMixin(dragBounds())
@deepMixin(transformable())
@deepMixin(selectable())
class Selection extends Tool {} // TODO : try to fix via doc of ts

export default Selection;
