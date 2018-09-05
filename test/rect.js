/**
 * Author Daniel.he
 */

import test from 'ava';
import Rect from '../src/graphic/types/Rect';
import Point from '../src/graphic/types/Point';

test('static:instantiate()', t => {
  let r1 = Rect.instantiate(10, 20, 30, 40);

  t.deepEqual(r1, new Rect(10, 20, 30, 40));
});


test('contains', t => {
  let r1 = new Rect(10, 10, 100, 100);
  let r2 = new Rect(10, 10, 30, 30);
  let r3 = new Rect(9, 9, 30, 30);

  let p2 = new Point(10, 80);

  t.is(r1.containsRect(r2), true);
  t.is(r1.containsRect(r3), false);
  t.is(r1.containsRect(p2), true);
});

test('Rect union', t => {
  let r1 = new Rect(10, 10, 100, 100);
  let r2 = new Rect(50, 120, 80, 80);
  let r3 = new Rect(50, 120, 80, 80);

  t.deepEqual(r1.unite(r2), new Rect(10, 20, 30, 40));
  t.deepEqual(r1.unite(r2), new Rect(10, 20, 30, 40));
});

test('new Rect(object)', t => {
  let expected = new Rect(100, 50, 100, 200);

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

});

test('setter: left', t => {

});

test('setter: top', t => {

});

test('setter: right', t => {

});

test('setter: bottom', t => {

});

test('setter: centerX', t => {

});

test('rect.left / rect.top VS rect.right / rect.bottom', t => {
  let rect = new Rect({
    point: [0, 0],
    size: [100, 100],
  });
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 90);
  t.is(rect.bottom, 90);

  let rect = new Rect([0, 0], [100, 100]);
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 90);
  t.is(rect.bottom, 90);

  let rect = new Rect({
    topLeft: [0, 0],
    bottomRight: [100, 100],
  });
  rect.left -= 10;
  rect.top -= 10;
  t.is(rect.right, 100);
  t.is(rect.bottom, 100);
});

