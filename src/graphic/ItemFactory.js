import Rect from './shape/Rect';
import Line from './shape/Line';
import Arrow from './shape/Arrow';
import Triangle from './shape/Triangle';
import Ellipse from './shape/Ellipse';
import Star from './shape/Star';
import Writing from './shape/Writing';

const installCtor = {

}

//magic numbers map to shapes
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

