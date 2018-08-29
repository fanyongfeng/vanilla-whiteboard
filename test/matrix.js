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


test('rotate()', t => {
  let m1 = new Matrix

	t.deepEqual(m1.rotate(180), new Matrix());
});
