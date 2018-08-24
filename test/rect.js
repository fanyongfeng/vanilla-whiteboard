/**
 * Author Daniel.he
 */

import test from 'ava';
import Rect from '../src/graphic/types/Rect';
import Point from '../src/graphic/types/Point';

test('Rect contains', t => {
  let r1 = new Rect(10, 10, 100, 100);
  let r2 = new Rect(10, 10, 30, 30);
  let r3 = new Rect(9, 9, 30, 30);

  let p2 = new Point(10, 80);

  t.is(r1.containsRect(r2), true, 'Method:containsRect');
  t.is(r1.containsRect(r3), false, 'Method:containsRect');

  t.is(r1.containsRect(p2), true, 'Method:containsPoint');
});

test('Rect union', t => {
  let r1 = new Rect(10, 10, 100, 100);
  let r2 = new Rect(50, 120, 80, 80);

  let p2 = new Point(10, 80);

  t.is(r1.unite(r2), true, 'Method:union');
});

