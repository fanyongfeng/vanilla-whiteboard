import Rectangle from './shape/Rectangle';
import Line from './shape/Line';
import Arrow from './shape/Arrow';
import Triangle from './shape/Triangle';
import Ellipse from './shape/Ellipse';
import Star from './shape/Star';
import Path from './Path';
import Color from './types/Color';

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
  pointer: { id: 0, ctor: Image },
  marker: { id: 1, ctor: Path },
  highlighter: { id: 2, ctor: Path , preset: { alpha: 0.5 }},
  ellipse: { id: 3, ctor: Ellipse },
  line: { id: 4, ctor: Line, preset: { dash: [10, 12] } },
  triangle: { id: 5, ctor: Triangle },
  rectangle: { id: 6, ctor: Rectangle },
  arrow: { id: 7, ctor: Arrow },
  text: { id: 8, ctor: Text },
  image: { id: 9, ctor: Image },
  selector: { id: 10, ctor: Image },
  eraser: { id: 11, ctor: Image },
  dashed: { id: 12, ctor: Line },
  rightTriangle: { id: 13, ctor: Triangle, preset: { right: true } },
  circle: 14,
  star: { id: 15, ctor: Star },
};

const idMap = {};
for (let key in shapeTypes) { idMap[shapeTypes[key].id] = key; }

function normalizeStyle(style){
  let ret = {};
  if(!style) return ret;

  if(style.c) {
    ret.fillStyle = new Color(style.c);
    ret.strokeStyle = new Color(style.c);
  };
  style.w && (ret.lineWidth = style.w);
  style.f && (ret.fontSize = style.f);
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
    ctor;

  if (!shape || !(ctor = shape.ctor)) throw new TypeError(`Invalid json!`);

  let preset = {
    typeId, type, id, style:normalizeStyle(style)
  };

  if(shape.preset) {
    Object.assign(preset, shape.preset);
  }
  return ctor.instantiate(preset, data);
}

/**
 *
 * @param {*} type
 * @param {*} data
 */
export function createItem(type, style = {}) { // attach to nebula!
  let shape = shapeTypes[type],
    ctor = shape.ctor,
    typeId = shape.id;

  if (!ctor) throw new Error(`Can't find specified graphic '${type}'!`);

  let preset = {
    typeId, type, style
  };

  if(shape.preset) {
    Object.assign(preset, shape.preset);
  }

  return new ctor(preset);
}


/**
 * registry shapes
 * @param {*} type
 * @param {*} ctor
 * @param {*} id
 */
export function registerShape(type, ctor, id) {
  if (shapeTypes[type])
    throw new Error(`Shape '${type}' already exist!`);

  shapeTypes[type] = { ctor, id };
}


