/**
 *  @preserve  JavaScript implementation of
 *  Algorithm for Automatically Fitting Digitized Curves
 *  by Philip J. Schneider
 *  "Graphics Gems", Academic Press, 1990
 *
 *  The MIT License (MIT)
 *
 *  https://github.com/soswow/fit-curves
 */


function fitCurve(points, maxError, progressCallback) {
  let _points = [], curves, length;

  for (var i = 0, prev, l = points.length; i < l; i++) {
    var point = points[i];
    if (!prev || !prev.equals(point)) {
      points.push(prev = point.clone());
    }
  }

  length = _points.length
  if (length <= 0) return null;

  curves = fitCubic(_points, maxError, 0, length - 1,
    // Left Tangent
    points[1].subtract(points[0]),
    // Right Tangent
    points[length - 2].subtract(points[length - 1]));

  return curves;
}

function fitCubic(points, error, first, last, tan1, tan2){

  if (last - first === 1) {
    var pt1 = points[first],
      pt2 = points[last],
      dist = pt1.getDistance(pt2) / 3;
    
    return [new Curve(
      points[0],
      maths.addArrays(points[0], maths.mulItems(leftTangent,  dist)),
      maths.addArrays(points[1], maths.mulItems(rightTangent, dist)),
      points[1]
    )];
  }


  return beziers;
}


/**
* Assign parameter values to digitized points using relative distances between points.
*
* @param {Array<Point>} points - Array of digitized points
* @returns {Array<Number>} Parameter values
*/
function chordLengthParameterize(points) {
  var u = [], currU, prevU, prevP;

  points.forEach((p, i) => {
      currU = i ? prevU + maths.vectorLen(p.subtract(prevP))
                : 0;
      u.push(currU);

      prevU = currU;
      prevP = p;
  });

  u = u.map(x => x/prevU);
  return u;
};

// Evaluate a bezier curve at a particular parameter value
function evaluate(degree, curve, t) {
  // Copy array
  var tmp = curve.slice();
  // Triangle computation
  for (var i = 1; i <= degree; i++) {
    for (var j = 0; j <= degree - i; j++) {
      tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
    }
  }
  return tmp[0];
}




export default fitCurve;