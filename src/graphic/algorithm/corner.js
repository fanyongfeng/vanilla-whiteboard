import Point from '../types/Point';

const horizontal = ['right', 'centerX', 'left']; //index order sensitive
const vertical = ['bottom', 'centerY', 'top']; //index order sensitive


const boundsPoi = [];
const antiDir = {};
const props = {}; //set to rect prototype

/**
 * 首字幕大写
 * @param { } str
 */
const capitalize = (str) => {
  return str.replace(/\b[a-z]/g, function(match) {
      return match.toUpperCase();
  });
}

/**
 * 获取属性名
 * @param {*} indexY
 * @param {*} indexX
 */
const getDirection = (indexY, indexX) => { // 将centerX, centerY, 简写为center。
  if(indexY === 0) {
    if(indexX === 0) return 'center';
    return horizontal[++indexX] + 'Center';
  }
  if(indexX === 0) return vertical[++indexY] + 'Center';
  return vertical[++indexY] + capitalize(horizontal[++indexX]);
}

/**
 * Cross product
 * @param {Array} a1
 * @param {Array} a2
 * @param {Function} itor
 */
const cross = (a1, a2, itor) => {
  a1.forEach((i1, i1Idx) => {
    a2.forEach((i2, i2Idx) => {
      itor.apply(null, [i1, i2, i1Idx - 1, i2Idx - 1]);
    });
  });
}

(function(){

  let _tempBounds = [];

  cross(horizontal, vertical, (x, y, coordX, coordY) => {

    let dir = getDirection(coordY, coordX);
    let anti = getDirection(-coordY, -coordX);
    let vector = new Point(coordX, coordY);

    _tempBounds.push({ x, y, dir, anti, vector});
  });

  _tempBounds.sort((l, r)=>l.vector.angle > r.vector.angle ? -1 : 1);
  _tempBounds.forEach(({x, y, dir, anti, vector}) => {

    props[dir] = {
      get() {
        return new Point(this[x], this[y]);
      },
      set(point) {
        this[x] = point.x;
        this[y] = point.y;
        return this;
      },
      enumerable: true,
      configurable: true,
    }

    if(vector.isZero()) return;
    boundsPoi.push(dir);
    antiDir[dir] = anti;

  });
  console.log(props, boundsPoi, antiDir);

}());

export {
  boundsPoi,
  antiDir,
  props
}
