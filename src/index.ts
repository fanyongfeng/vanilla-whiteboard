import Point from './graphic/types/Point';
import Rect from './graphic/types/Rect';
import Style from './graphic/types/Style';
import Color from './graphic/types/Color';
import Matrix from './graphic/types/Matrix';
import Path from './graphic/Path';
import Layer from './Whiteboard/Layer';
import animate from './animate/animate';
import animateColor from './animate/animateColor';
import Whiteboard from './Whiteboard';
import playground from './playground.js'; // for debug,
// import keyCode from '';

import { RGB2HSL, HSL2RGB, RGB2Gray, Gray2RGB, Gray2HSB } from './graphic/algorithm/color';

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
//@ts-ignore
let nebula = typeof nebula !== 'undefined' ? nebula : { Point, Rect, Style, Path, Color, Matrix, Layer };
// let nebula;
// if (typeof nebula === 'undefined') {
//   nebula = { Point, Rect, Style, Path, Color, Matrix, Layer };
// }

//mount util on namespace.
nebula.util = { RGB2HSL, HSL2RGB, RGB2Gray, Gray2RGB, Gray2HSB, animateColor, animate };

//mount Whiteboard constructor on namespace.
nebula.Whiteboard = Whiteboard;

//mount enum on namespace.
// nebula.enum = { keyCode };

//tmp for debug
playground.init();

window.nebula = nebula;

export default nebula;
export { Whiteboard, Point, Rect, Style, Path };
