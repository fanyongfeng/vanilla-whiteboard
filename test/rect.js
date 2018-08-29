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

test('new Rectangle(object)', t => {
  let expected = new Rectangle(100, 50, 100, 200);

  t.is(function () {
    return new Rectangle({
      top: expected.top,
      right: expected.right,
      bottom: expected.bottom,
      left: expected.left
    });
  }, expected);

  function testProperties(key1, key2) {
    let obj = {};
    obj[key1] = expected[key1];
    obj[key2] = expected[key2];
    let rect = new Rectangle(obj);
    t.is(rect, expected, 'new Rectangle({ ' + key1 + ', ' + key2 + ' });');
  }

  let tests = [
    ['center', 'size'],
    ['topLeft', 'size'],
    ['topRight', 'size'],
    ['bottomRight', 'size'],
    ['bottomLeft', 'size'],
    ['leftCenter', 'size'],
    ['topCenter', 'size'],
    ['rightCenter', 'size'],
    ['bottomCenter', 'size'],
    ['topLeft', 'bottomRight'],
    ['topRight', 'bottomLeft'],
    ['topLeft', 'bottomCenter'],
    ['topLeft', 'rightCenter'],
    ['topRight', 'bottomCenter'],
    ['topRight', 'leftCenter'],
    ['bottomLeft', 'topCenter'],
    ['bottomLeft', 'rightCenter'],
    ['bottomRight', 'topCenter'],
    ['bottomRight', 'leftCenter']
  ];

  tests.forEach(function (test) {
    testProperties(test[0], test[1]);
    testProperties(test[1], test[0]);
  });
});

test('rect.left / rect.top VS rect.right / rect.bottom', t => {
  let rect = new Rectangle({
    point: [0, 0],
    size: [100, 100],
  });
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 90);
  t.is(rect.bottom, 90);

  let rect = new Rectangle([0, 0], [100, 100]);
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 90);
  t.is(rect.bottom, 90);

  let rect = new Rectangle({
    topLeft: [0, 0],
    bottomRight: [100, 100],
  });
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 100);
  t.is(rect.bottom, 100);
});

