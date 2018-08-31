import { atan2, pow, acos, pi } from './math';

/**
 *
 * @param {*} x
 * @param {*} y
 */
function getAngleXAxis(x, y) {
  let radian = atan2(y, x);
  if (radian < 0) return radian + 2 * pi;
  return radian;
}

/**
 *
 */
export function getAngle() {
  let cp = new Point(0, 0);
  let sp = new Point(0, 200);
  let ep = new Point(-300, 300);

  let disCS = cp.getDistance(sp);
  let disCE = cp.getDistance(ep);
  let disSE = sp.getDistance(ep);

  let resultRadian = acos((pow(disCS, 2) + pow(disCE, 2) - pow(disSE, 2)) / (2 * disCS * disCE));

  return (resultRadian * 180) / pi;
}

/**
 *
 */
export function getAngle2() {
  let cp = new Point(0, 0);
  let sp = new Point(0, 200);
  let ep = new Point(-300, 300 + i);

  return getAngleXAxis((ep.x - cp.x) / (ep.y - cp.y)) - getAngleXAxis(atan2(sp.x - cp.x, sp.y - cp.y));
}
