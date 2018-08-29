/**
 * Author Daniel.he
 */
import test from 'ava';
import Color from '../src/graphic/types/Color';

test('Set color to hex', t => {
  var color = new Color('#ff0000');
  t.deepEqual(color, new Color(1, 0, 0));
  t.deepEqual(color.toString(), 'rgba(255,0,0,1)');

  var color = new Color('#f00');
  t.deepEqual(color, new Color(1, 0, 0));
  t.deepEqual(color.toString(), 'rgba(255,0,0,1)');
});


test('Set color to array', t => {
  var color = new Color(255, 0, 0);
  t.deepEqual(color, new Color(1, 0, 0));
  t.deepEqual(color.toString(), 'rgba(255,0,0,1)');
});

test('Converter:', t => {
  var color = new Color(255, 0, 0);
  t.deepEqual(color, new Color(1, 0, 0));
  t.deepEqual(color.toString(), 'rgba(255,0,0,1)');
})
