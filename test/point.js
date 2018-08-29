/**
 * Author Daniel.he
 */
import test from 'ava';
import Point from '../src/graphic/types/Point';


const epsilon = 1e-12;

/**
 * 在允许的精度范围内相等。
 * @param {Point} p1
 * @param {Point} p2
 */
function isEqual(p1, p2) {
  return Math.abs(p1.x - p2.x) < epsilon &&
    Math.abs(p1.y - p2.y) < epsilon;
}

test('static:instantiate()', t => {
  let p1 = Point.instantiate(10, 20);
  let p2 = Point.instantiate(20);

  t.deepEqual(p1, new Point(10, 20));
  t.deepEqual(p2, new Point(20, 20));
});

test('getDistance()', t => {
  let p1 = new Point(10, 10);
  let p2 = new Point(10, 100);

  t.is(p1.getDistance(p2), 90);
});

test('equals()', t => {
  let p1 = new Point(10.5, 10.5);
  let p2 = new Point(10.5, 10.5);

  t.is(isEqual(p1, p2), p1.equals(p2));
});

test('clone()', t => {
  let p1 = new Point(10.5, 10.5);
  let p2 = p1.clone();

  t.true(isEqual(p1, p2));
  t.not(p1, p2);
  t.deepEqual(p1, p2);
});

test('add()', t => {
  let p1 = new Point(10, 10);
  let p2 = new Point(30.5, 100);

  t.true(isEqual(p1.add(p2), new Point(40.5, 110)));
  t.true(isEqual(p1.add(30), new Point(40, 40)));
  t.true(isEqual(p1.add(30, 50), new Point(40, 60)));
});

test('multiply()', t => {
  let p1 = new Point(10, 10);
  let p2 = new Point(30.5, 100);

  t.true(isEqual(p1.multiply(p2), new Point(305, 1000)));
  t.true(isEqual(p1.multiply(100), new Point(1000, 1000)));
  t.true(isEqual(p1.multiply(100, .55), new Point(1000, 5.5)));
});


test('subtract()', t => {
  let p1 = new Point(10, 10);
  let p2 = new Point(30.5, 100);

  t.true(isEqual(p1.subtract(p2), new Point(-20.5, -90)));
  t.true(isEqual(p1.subtract(30), new Point(-20, -20)));
  t.true(isEqual(p1.subtract(30, -50), new Point(-20, 60)));
});


test('divide()', t => {
  let p1 = new Point(10, 10);
  let p2 = new Point(30.5, 100);

  t.true(isEqual(p1.divide(p2), new Point(0.32786885245901637, 0.1)));
  t.true(isEqual(p1.divide(20), new Point(.5, .5)));
  t.true(isEqual(p1.divide(100, .1), new Point(.1, 100)));
});

test('nearby()', t => {
  let p1 = new Point(100, 100);

  t.true(p1.nearby(new Point(102, 102)));
  t.true(p1.nearby(new Point(101, 101), 1.5));
  t.false(p1.nearby(new Point(101, 101), 1.4));
});

test('rotate(degrees)', t => {
  let point = new Point(100, 50).rotate(90);
  t.true(isEqual(point, new Point(-50, 100)));
});


test('toJSON()', t => {
  let point = new Point(10.3459793, 10.60694567);
  t.deepEqual(point.toJSON(5), [10.34598, 10.60695]);
  t.deepEqual(point.toJSON(0), [10, 11]);
  t.deepEqual(point.toJSON(), [10.3459793, 10.60694567]);
});


test('getter:length', t => {
  let point = new Point(100, 50); //
  t.true(Math.abs(point.length - 111.80339887498948) < epsilon);
});
