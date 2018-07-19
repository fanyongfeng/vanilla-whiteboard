import test from 'ava';

import Point from '../src/types/Point'

test('Point distanceFrom', t => {
  var p1 = new Point(10, 10);
  var p2 = new Point(10, 100);

	t.is(p1.distanceFrom(p2), 90, 'Method:distanceFrom is pass~');
});