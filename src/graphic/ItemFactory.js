import Rectangle from './shape/Rectangle';
import Line from './shape/Line';
import Arrow from './shape/Arrow';
import Triangle from './shape/Triangle';
import Ellipse from './shape/Ellipse';
import Star from './shape/Star';
import Writing from './shape/Writing';

//https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png
const installCtor = {

}

//magic numbers map to shapes
export const toolTypes = {
  POINTER: 0,
  PEN: 1,
  MARKER: 2,
  ELLIPSE: 3,
  LINE: 4,
  TRIANGLE: 5,
  RECTANGLE: 6,
  ARROW: 7,
  TEXT: 8,
  IMAGE: 9,
  SELECTOR: 10,
  ERASER: 11,
  DASHED: 12,
  RIGHTTRIANGLE: 13,
  CIRCLE: 14,
};
const idForCtor = {

}

export function createItem(type, data) { // attach to nebula!
    let ctor = installCtor[type];
    if(!ctor) throw new Error(`Can't find specified graphic '${type}'!`);

    return new ctor(data);
}

export function createItemViaJSON(json) {
  let [type, data] = json;
  let ctor = idForCtor[type];
  if(!ctor) throw new Error(`Invalid json!`);
  return new ctor(data);
}

export function registerShape(type, ctor) {
    if(installCtor[type]) throw new Error(`Shape '${type}' already exist!`);

    ctor.type = type;
    installCtor[type] = ctor;
}

export default installCtor;

