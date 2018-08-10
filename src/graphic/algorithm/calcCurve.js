

import Rect from '../types/Rect';
/**
 * 向量距离平方
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
function distanceSquare(v1, v2) {
  return (v1[0] - v2[0]) * (v1[0] - v2[0])
    + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}

function cubicAt(p0, p1, p2, p3, t) {
  const onet = 1 - t;
  return onet * onet * (onet * p3 + 3 * t * p2) + t * t * (t * p0 + 3 * onet * p1);
}

/**
 * 投射点到三次贝塞尔曲线上，返回投射距离。
 * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {number} x3
 * @param {number} y3
 * @param {number} x
 * @param {number} y
 * @param {Array.<number>} [out] 投射点
 * @return {number}
 */
function cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, out) {
  let t;
  let interval = 0.005;
  let d = Infinity;
  let _t;
  let v1;
  let d1;
  let d2;
  let v2;
  let prev;
  let next;
  const EPSILON = 0.0001;
  const v0 = [x, y];

  for (_t = 0; _t < 1; _t += 0.05) {
    v1 = [
      cubicAt(x1, x2, x3, x4, _t),
      cubicAt(y1, y2, y3, y4, _t)
    ];

    d1 = distanceSquare(v0, v1);
    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }
  d = Infinity;

  for (let i = 0; i < 32; i++) {
    if (interval < EPSILON) {
      break;
    }

    prev = t - interval;
    next = t + interval;

    v1 = [
      cubicAt(x1, x2, x3, x4, prev),
      cubicAt(y1, y2, y3, y4, prev)
    ];

    d1 = distanceSquare(v0, v1);

    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      v2 = [
        cubicAt(x1, x2, x3, x4, next),
        cubicAt(y1, y2, y3, y4, next)
      ];

      d2 = distanceSquare(v0, v2);

      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }

  if (out) {
    out.x = cubicAt(x1, x2, x3, x4, t);
    out.y = cubicAt(y1, y2, y3, y4, t);
  }

  return Math.sqrt(d);
}

/**
 * 三次贝塞尔曲线描边包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  x2
 * @param  {number}  y2
 * @param  {number}  x3
 * @param  {number}  y3
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }
  let _l = lineWidth;
  // Quick reject
  if (
    (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
    || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
    || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
    || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
  ) {
    return false;
  }
  let d = cubicProjectPoint(
    x0, y0, x1, y1, x2, y2, x3, y3,
    x, y, null
  );
  return d <= _l / 2;
}


let PI2 = Math.PI * 2;

function normalizeRadian(angle) {
  angle %= PI2;
  if (angle < 0) {
    angle += PI2;
  }
  return angle;
}

/**
 * 圆弧描边包含判断
 * @param  {number}  cx
 * @param  {number}  cy
 * @param  {number}  r
 * @param  {number}  startAngle
 * @param  {number}  endAngle
 * @param  {boolean}  anticlockwise
 * @param  {number} lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {Boolean}
 */
function containStrokeArc(
  cx, cy, r, startAngle, endAngle, anticlockwise,
  lineWidth, x, y
) {

  if (lineWidth === 0) {
    return false;
  }
  let _l = lineWidth;

  x -= cx;
  y -= cy;
  let d = Math.sqrt(x * x + y * y);

  if ((d - _l > r) || (d + _l < r)) {
    return false;
  }
  if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
    // Is a circle
    return true;
  }
  if (anticlockwise) {
    let tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI2;
  }

  let angle = Math.atan2(y, x);
  if (angle < 0) {
    angle += PI2;
  }
  return (angle >= startAngle && angle <= endAngle)
    || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
}


// Converted from code found here:
// http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
//
function calcBoundsOfBezier(x0, y0, x1, y1, x2, y2, x3, y3) {
  const tvalues = [], bounds = [[], []];
  let a, b, c, t;

  for (let i = 0; i < 2; ++i) {
    if (i === 0) {
      b = 6 * x0 - 12 * x1 + 6 * x2;
      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
      c = 3 * x1 - 3 * x0;
    } else {
      b = 6 * y0 - 12 * y1 + 6 * y2;
      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
      c = 3 * y1 - 3 * y0;
    }
    if (Math.abs(a) < 1e-12) {
      if (Math.abs(b) < 1e-12) {
        continue;
      }
      t = -c / b;
      if (t > 0 && t < 1) {
        tvalues.push(t);
      }
      continue;
    }
    const b2ac = b * b - 4 * c * a;
    const sqrtb2ac = Math.sqrt(b2ac);
    if (b2ac < 0) continue;

    const t1 = (-b + sqrtb2ac) / (2 * a);
    if (t1 > 0 && t1 < 1) {
      tvalues.push(t1);
    }
    const t2 = (-b - sqrtb2ac) / (2 * a);
    if (t2 > 0 && t2 < 1) {
      tvalues.push(t2);
    }
  }

  let j = tvalues.length;
  const jlen = j;
  let mt;
  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
    bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
  }

  bounds[0][jlen] = x0;
  bounds[1][jlen] = y0;
  bounds[0][jlen + 1] = x3;
  bounds[1][jlen + 1] = y3;
  bounds[0].length = bounds[1].length = jlen + 2;

  let x = Math.min.apply(0, bounds[0]);

  let y = Math.min.apply(0, bounds[1]);
  let w = Math.max.apply(0, bounds[0]) - x;
  let h = Math.max.apply(0, bounds[1]) - y;

  return new Rect(x, y, w, h);
}

/**
 * 线段包含判断
 * @param  {number}  x0
 * @param  {number}  y0
 * @param  {number}  x1
 * @param  {number}  y1
 * @param  {number}  lineWidth
 * @param  {number}  x
 * @param  {number}  y
 * @return {boolean}
 */
function containStrokeLine(x0, y0, x1, y1, lineWidth, x, y) {
  if (lineWidth === 0) {
      return false;
  }
  let _l = lineWidth;
  let _a = 0;
  let _b = x0;
  // Quick reject
  if (
      (y > y0 + _l && y > y1 + _l)
      || (y < y0 - _l && y < y1 - _l)
      || (x > x0 + _l && x > x1 + _l)
      || (x < x0 - _l && x < x1 - _l)
  ) {
      return false;
  }

  if (x0 !== x1) {
      _a = (y0 - y1) / (x0 - x1);
      _b = (x0 * y1 - x1 * y0) / (x0 - x1) ;
  }
  else {
      return Math.abs(x - x0) <= _l / 2;
  }
  let tmp = _a * x - y + _b;
  let _s = tmp * tmp / (_a * _a + 1);
  return _s <= _l / 2 * _l / 2;
}

export {
  containStroke,
  containStrokeArc,
  containStrokeLine,
  calcBoundsOfBezier
};

