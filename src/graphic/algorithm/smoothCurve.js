export default function smooth(segments, closed) {
  let opts = options || {},
    asymmetric = opts.asymmetric, // asymmetric or continuous;
    length = segments.length;

  // Helper method to pick the right from / to indices.
  // Supports numbers and segment objects.
  // For numbers, the `to` index is exclusive, while for segments and
  // curves, it is inclusive, handled by the `offset` parameter.
  function getIndex(value, _default) {
    // Support both Segment and Curve through #index getter.
    let index = value && value.index;
    if (index != null) {
      // Make sure the segment / curve is not from a wrong path.
      let path = value.path;
      if (path && path !== self)
        throw new Error(value._class + ' ' + index + ' of ' + path
          + ' is not part of ' + self);
      // Add offset of 1 to curves to reach their end segment.
      if (_default && value instanceof Segment)
        index++;
    } else {
      index = typeof value === 'number' ? value : _default;
    }
    // Handle negative values based on whether a path is open or not:
    // Ranges on closed paths are allowed to wrapped around the
    // beginning/end (e.g. start near the end, end near the beginning),
    // while ranges on open paths stay within the path's open range.
    return Math.min(index < 0 && closed
      ? index % length
      : index < 0 ? index + length : index, length - 1);
  }

  let loop = closed && opts.from === undefined && opts.to === undefined,
    from = getIndex(opts.from, 0),
    to = getIndex(opts.to, length - 1);

  if (from > to) {
    if (closed) {
      from -= length;
    } else {
      let tmp = from;
      from = to;
      to = tmp;
    }
  }
  // https://www.particleincell.com/2012/bezier-splines/
  let min = Math.min,
    amount = to - from + 1,
    n = amount - 1,
    // Overlap by up to 4 points on closed paths since a current
    // segment is affected by its 4 neighbors on both sides (?).
    padding = loop ? min(amount, 4) : 1,
    paddingLeft = padding,
    paddingRight = padding,
    knots = [];
  if (!closed) {
    // If the path is open and a range is defined, try using a
    // padding of 1 on either side.
    paddingLeft = min(1, from);
    paddingRight = min(1, length - to - 1);
  }
  // Set up the knots array now, taking the paddings into account.
  n += paddingLeft + paddingRight;
  if (n <= 1)
    return;
  for (let i = 0, j = from - paddingLeft; i <= n; i++ , j++) {
    knots[i] = segments[(j < 0 ? j + length : j) % length]._point;
  }

  // In the algorithm we treat these 3 cases:
  // - left most segment (L)
  // - internal segments (I)
  // - right most segment (R)
  //
  // In both the continuous and asymmetric method, c takes these
  // values and can hence be removed from the loop starting in n - 2:
  // c = 1 (L), 1 (I), 0 (R)
  //
  // continuous:
  // a = 0 (L), 1 (I), 2 (R)
  // b = 2 (L), 4 (I), 7 (R)
  // u = 1 (L), 4 (I), 8 (R)
  // v = 2 (L), 2 (I), 1 (R)
  //
  // asymmetric:
  // a = 0 (L), 1 (I), 1 (R)
  // b = 2 (L), 4 (I), 2 (R)
  // u = 1 (L), 4 (I), 3 (R)
  // v = 2 (L), 2 (I), 0 (R)

  // (L): u = 1, v = 2
  let x = knots[0]._x + 2 * knots[1]._x,
    y = knots[0]._y + 2 * knots[1]._y,
    f = 2,
    n_1 = n - 1,
    rx = [x],
    ry = [y],
    rf = [f],
    px = [],
    py = [];
  // Solve with the Thomas algorithm
  for (let i = 1; i < n; i++) {
    let internal = i < n_1,
      //  internal--(I)  asymmetric--(R) (R)--continuous
      a = internal ? 1 : asymmetric ? 1 : 2,
      b = internal ? 4 : asymmetric ? 2 : 7,
      u = internal ? 4 : asymmetric ? 3 : 8,
      v = internal ? 2 : asymmetric ? 0 : 1,
      m = a / f;
    f = rf[i] = b - m;
    x = rx[i] = u * knots[i]._x + v * knots[i + 1]._x - m * x;
    y = ry[i] = u * knots[i]._y + v * knots[i + 1]._y - m * y;
  }

  px[n_1] = rx[n_1] / rf[n_1];
  py[n_1] = ry[n_1] / rf[n_1];
  for (let i = n - 2; i >= 0; i--) {
    px[i] = (rx[i] - px[i + 1]) / rf[i];
    py[i] = (ry[i] - py[i + 1]) / rf[i];
  }
  px[n] = (3 * knots[n]._x - px[n_1]) / 2;
  py[n] = (3 * knots[n]._y - py[n_1]) / 2;

  // Now update the segments
  for (let i = paddingLeft, max = n - paddingRight, j = from;
    i <= max; i++ , j++) {
    let segment = segments[j < 0 ? j + length : j],
      pt = segment._point,
      hx = px[i] - pt._x,
      hy = py[i] - pt._y;
    if (loop || i < max)
      segment.setHandleOut(hx, hy);
    if (loop || i > paddingLeft)
      segment.setHandleIn(-hx, -hy);
  }
}
