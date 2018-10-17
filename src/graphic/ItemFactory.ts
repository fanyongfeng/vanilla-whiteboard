import Rectangle from './shape/Rectangle';
import Line from './shape/Line';
import Arrow from './shape/Arrow';
import Triangle from './shape/Triangle';
import Ellipse from './shape/Ellipse';
import Star from './shape/Star';
import Writing from './shape/Writing';
import Text from './shape/Text';
import ChatBox from './shape/ChatBox';
import Img from './shape/Image';
import Color from './types/Color';
import CompoundPath from './CompoundPath';

/**
 * magic numbers map to shapes, copy from milkyway.
  pointer: 0,
  marker: 1,
  highlighter: 2,
  ellipse: 3,
  line: 4,
  triangle: 5,
  rectangle: 6,
  arrow: 7,
  text: 8,
  image: 9,
  selector: 10,
  eraser: 11,
  dashed: 12,
  rightTriangle: 13,
  circle: 14,
 */

export const shapeTypes = {
  pointer: { id: 0, ctor: Img },
  marker: { id: 1, ctor: Writing },
  highlighter: { id: 2, ctor: Writing, preset: { alpha: 0.5 } },
  ellipse: { id: 3, ctor: Ellipse },
  line: { id: 4, ctor: Line },
  triangle: { id: 5, ctor: Triangle },
  rectangle: { id: 6, ctor: Rectangle },
  arrow: { id: 7, ctor: Arrow },
  text: { id: 8, ctor: Text },
  image: { id: 9, ctor: Img },
  selector: { id: 10, ctor: Img },
  eraser: { id: 11, ctor: Img },
  dashed: {
    id: 12,
    ctor: Line,
    preset: { dash: [10, 12] },
  },
  rightTriangle: { id: 13, ctor: Triangle, preset: { right: true } },
  circle: { id: 14 },
  star: { id: 15, ctor: Star },
  chatBox: { id: 16, ctor: ChatBox },
  compoundPath: { id: 100, ctor: CompoundPath },
  material: { id: 9.1, ctor: Img },
};

const idMap = {};
for (let key in shapeTypes) {
  idMap[shapeTypes[key].id] = key;
}

function normalizeStyle(style) {
  let ret: any = {};

  if (!style) return ret;

  let strokeColor = style.sc || style.strokeColor;
  let fillColor = style.fc || style.fillColor;
  let color = style.c || style.color;

  let lineWidth = typeof style.w === 'number' ? style.w : style.width;
  let fontSize = typeof style.f === 'number' ? style.f : style.fontSize;

  if (strokeColor || color) {
    ret.strokeStyle = new Color(strokeColor || color); //
  }

  if (fillColor || color) {
    ret.fillStyle = new Color(fillColor || color);
  }

  if (typeof lineWidth === 'number') {
    ret.lineWidth = lineWidth;
  }

  if (typeof fontSize === 'number') {
    ret.fontSize = fontSize;
  }

  return ret;
}

/**
 * format [type, id, dataArr, style]
 * e.g. [3,112481770,[[413,200],[588,378]],{"c":"#8ecf54","w":2,"f":20}]
 *
 * @param {Object} json
 */
export function createItemViaJSON(json) {
  let [typeId, id, data, style] = json,
    type = idMap[typeId],
    shape = shapeTypes[type],
    preset = shape.preset || {},
    ctor = shape && shape.ctor;

  if (!ctor) throw new TypeError(`Invalid json!`);

  style = normalizeStyle(style);

  let options = {
    typeId,
    type,
    id,
    style,
    ...preset,
  };

  let ins = ctor.instantiate(options, data);

  //workaround: if fillStyle is true, set fill-mode in shape;
  // if (style.fillStyle) {
  //   ins.fill = true;
  // }

  return ins;
}

/**
 *
 * @param {String} type
 * @param {Object} style, Style of item.
 */
export function createItem(type, style = {}) {
  // attach to nebula!
  let shape = shapeTypes[type],
    ctor = shape.ctor,
    typeId = shape.id,
    preset = shape.preset || {};

  if (!ctor) throw new Error(`Can't find specified graphic '${type}'!`);

  style = normalizeStyle(style);
  let options = {
    typeId,
    type,
    style,
    ...preset,
  };

  return new ctor(options);
}

/**
 * registry shapes
 * @param {*} type
 * @param {*} ctor
 * @param {*} id
 */
export function registerShape(type, ctor, id) {
  if (shapeTypes[type]) throw new Error(`Shape '${type}' already exist!`);

  shapeTypes[type] = { ctor, id };
}
