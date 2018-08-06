//https://github.com/chrisaljoudi/transformatrix.js

/**
 * 
 * * Such a coordinate transformation can be represented by a 3 row by 3
 * column matrix with an implied last row of `[ 0 0 1 ]`. This matrix
 * transforms source coordinates `(x, y)` into destination coordinates `(x',y')`
 * by considering them to be a column vector and multiplying the coordinate
 * vector by the matrix according to the following process:
 *
 *     [ x ]   [ a  c  tx ] [ x ]   [ a * x + c * y + tx ]
 *     [ y ] = [ b  d  ty ] [ y ] = [ b * x + d * y + ty ]
 *     [ 1 ]   [ 0  0  1  ] [ 1 ]   [         1          ]
 * 变换矩阵，用于transform
 */
class Matrix {
  constructor(m) {
    m = m || [1, 0, 0, 1, 0, 0]
    this.m = [m[0], m[1], m[2], m[3], m[4], m[5]];
  }

  reset() {
    this.m = [1, 0, 0, 1, 0, 0];
    return this;
  }

  /**
   * 一个矩阵作用于另一个矩阵
   */
  multiply(m) {
    const m1 = this.m
    let m2

    if (m instanceof Matrix) {
      m2 = m.m
    } else {
      m2 = m
    }

    const m11 = m1[0] * m2[0] + m1[2] * m2[1],
      m12 = m1[1] * m2[0] + m1[3] * m2[1],
      m21 = m1[0] * m2[2] + m1[2] * m2[3],
      m22 = m1[1] * m2[2] + m1[3] * m2[3]

    const dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5]

    m1[0] = m11
    m1[1] = m12
    m1[2] = m21
    m1[3] = m22
    m1[4] = dx
    m1[5] = dy
    return this
  }

  /**
   * 返回反操作矩阵
   */
  inverse() {
    const inv = new Matrix(this.m),
      invm = inv.m

    const d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
      m0 = invm[3] * d,
      m1 = -invm[1] * d,
      m2 = -invm[2] * d,
      m3 = invm[0] * d,
      m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
      m5 = d * (invm[1] * invm[4] - invm[0] * invm[5])

    invm[0] = m0
    invm[1] = m1
    invm[2] = m2
    invm[3] = m3
    invm[4] = m4
    invm[5] = m5
    return inv
  }

  /**
   * 语法糖移动
    (1, 0, sx)
    (0, 1, sy)
   * */
  translate(x, y) {
    return this.multiply([1, 0, 0, 1, x, y])
  }

  /**
   *  语法糖旋转
      (cos, -sin, 0)
      (sin, cos, 0)
   */
  rotate(deg) {
    const rad = deg * Math.PI / 180,
      c = Math.cos(rad),
      s = Math.sin(rad)

    return this.multiply([c, s, -s, c, 0, 0]);
  }

  /**
   *
   *  语法糖倾斜
      (1, tx, 0)
      (ty, 1, 0)
   */
  skew(degX, degY) {
    degY |= 0
    const radX = degX * Math.PI / 180,
      radY = degY * Math.PI / 180
    const tx = Math.tan(radX),
      ty = Math.tan(radY)

    return this.multiply([1, ty, tx, 1, 0, 0])
  }

  /**
   *  语法糖缩放
    (sx, 0, 0)
    (0, sy, 0)
   */
  scale(sx, sy) {
    return this.multiply([sx, 0, 0, sy, 0, 0])
  }

 /**
  * 变形一个点
  * @param {*} point
  */
  transformPoint(point) {
    let {x, y} = point;

    point.x = x * this.m[0] + y * this.m[2] + this.m[4],
    point.y = x * this.m[1] + y * this.m[3] + this.m[5]

    return point;
  }

  /**
   * 变形向量
   * @param {*} point
   */
  transformVector(point) {
    let {x, y} = point;

    point.x = x * this.m[0] + y * this.m[2]
    point.y = x * this.m[1] + y * this.m[3]

    return point;
  }
}

export default Matrix
