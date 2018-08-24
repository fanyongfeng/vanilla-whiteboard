/**
 * Author Daniel.he
 */
import test from 'ava';

import Point from '../src/graphic/types/Point'

test('Point getDistance', t => {
  var p1 = new Point(10, 10);
  var p2 = new Point(10, 100);

	t.is(p1.getDistance(p2), 90, 'Method:getDistance is pass~');
});

test('Point add, multiply, divide, ', t => {
  var p1 = new Point(10, 10);
  var p2 = new Point(30.5, 100);

  p1.add(p2);

  p1.multiply(p2);

  p1.divide(p2);

  p2.subtract(p2);

	// t.is(p1.add(p2), , 'Method:getDistance is pass~');
});
