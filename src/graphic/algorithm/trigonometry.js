import { atan2, pow, acos, pi } from './math';

/**
 *
 * @param {Number} x
 * @param {Number} y
 */
function getAngleXAxis(x, y) {
  let radian = atan2(y, x);
  if (radian < 0) return radian + 2 * pi;
  return radian;
}

/**
 * 通过中心点、起始点和结束点获取角度（绝对值）
 *
 * @param {Point} cp, center point
 * @param {Point} sp, start point
 * @param {Point} ep, end point
 */
export function getAngle(cp, sp, ep) {
  let disCS = cp.getDistance(sp);
  let disCE = cp.getDistance(ep);
  let disSE = sp.getDistance(ep);

  let resultRadian = acos((pow(disCS, 2) + pow(disCE, 2) - pow(disSE, 2)) / (2 * disCS * disCE));
  return (resultRadian * 180) / pi;
}

/**
 * 通过中心点、起始点和结束点获取角度（相对值）
 *
 * @param {Point} cp, center point
 * @param {Point} sp, start point
 * @param {Point} ep, end point
 */
export function getAngle2(cp, sp, ep) {
  let radian = getAngleXAxis((ep.x - cp.x) / (ep.y - cp.y)) - getAngleXAxis(atan2(sp.x - cp.x, sp.y - cp.y));
  return (radian * 180) / pi;
}
