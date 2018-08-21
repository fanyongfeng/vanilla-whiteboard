import Point from './graphic/types/Point';
import Rect from './graphic/types/Rect';
import Style from './graphic/types/Style';
import Color from './graphic/types/Color';
import Matrix from './graphic/types/Matrix';
import Path from './graphic/Path';
import Whiteboard from './Whiteboard';
import playground from './playground'; // for debug,
// import keyCode from '';

import { rgb2hsl, hsl2rgb, rgb2gray, gray2rgb, gray2hsb } from './graphic/algorithm/color';


//top-level APIs
/**
 * on('type', handler);
 *  possible-values:
 *  - changed 当白板上元素发生变化时，（返回变更的数据和Hash）
 *  - add 当元素新增时
 *  - remove 当元素删除时
 *  -
 *
 * options:
 *  - selectionMode: 'bounds', 'path'
 *  - alignToGrid: boolean 对齐到网格
 *  - loop / notify
 *  -
 *
 */

//mount graphic on namespace (top-level).
let nebula = typeof nebula !== 'undefined' ? nebula : { Point, Rect, Style, Path, Color, Matrix };

//mount util on namespace.
nebula.util = { rgb2hsl, hsl2rgb, rgb2gray, gray2rgb, gray2hsb };

//mount Whiteboard constructor on namespace.
nebula.Whiteboard = Whiteboard;

//mount enum on namespace.
// nebula.enum = { keyCode };

export default nebula;
export { Whiteboard, Point, Rect, Style, Path }

//tmp for debug
let wb = playground.init();
// wb.drawGrid();
// wb.drawAxes();
window.nebula = nebula;



