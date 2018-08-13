/**
 * 处理矩形各个控制点逻辑
 * 1）返回矩形各个控制点的getter, setter
 * 2) 返回各控制点的逻辑
 * 3）返回各控制点名字和反向点名字，并排序
 */
import Point from '../types/Point';

// x方向，对应坐标 -1, 0, 1
const horizontal = ['right', 'centerX', 'left']; //index order sensitive
// y方向，对应坐标 -1, 0, 1
const vertical = ['bottom', 'centerY', 'top']; //index order sensitive

/**
 * 首字幕大写
 * @param { } str
 */
const capitalize = (str) => {
  return str.replace(/\b[a-z]/g, function (match) {
    return match.toUpperCase();
  });
}

/**
 * 获取属性名
 * @param {*} indexY
 * @param {*} indexX
 */
const getDirection = (indexY, indexX) => { // 将centerX, centerY, 简写为center。
  if (indexY === 0) {
    if (indexX === 0) return 'center';
    return horizontal[++indexX] + 'Center';
  }
  if (indexX === 0) return vertical[++indexY] + 'Center';
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

//export constants
const boundsPoi = [];
const antiDir = {};
const props = {}; //set to rect prototype

(() => {
  let _tempBounds = [];

  //控制点临时数组
  cross(horizontal, vertical, (x, y, coordX, coordY) => {
    let dir = getDirection(coordY, coordX);
    let anti = getDirection(-coordY, -coordX);
    let vector = new Point(coordX, coordY);
    _tempBounds.push({ x, y, dir, anti, vector });
  });

  //控制点按矢量进行排序，确保顺时针
  _tempBounds.sort((l, r) => l.vector.angle > r.vector.angle ? -1 : 1);

  _tempBounds.forEach(({ x, y, dir, anti, vector }) => {
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

    if (vector.isZero()) return; // ignore center.

    boundsPoi.push(dir);
    antiDir[dir] = anti;
  });

})();

export {
  boundsPoi,
  antiDir,
  props
}
