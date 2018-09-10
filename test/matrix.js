/**
 * Author Daniel.he
 */
import test from 'ava';
import Matrix from '../src/graphic/types/Matrix';


test('reverse()', t => {
  let m1 = new Matrix
  let m2 = new Matrix

	t.deepEqual(m1.reverse(), m2);
});

test('prepend()', t => {
  let m1 = new Matrix
  let m2 = new Matrix

	t.deepEqual(m1.reverse(), m2);
});

test('append()', t => {
  let m1 = new Matrix
  let m2 = new Matrix

});

test('scale()', t => {
  let m1 = new Matrix
  let m2 = new Matrix

});

test('translate()', t => {
  let m1 = new Matrix
  let m2 = new Matrix

});


test('rotate()', t => {
  let m1 = new Matrix

	t.deepEqual(m1.rotate(180), new Matrix());
});


test('applyToPoint()', t => {
  let m1 = new Matrix

});

test('applyToRect()', t => {
  let m1 = new Matrix

});

test('applyToContext()', t => {
  let m1 = new Matrix

});

