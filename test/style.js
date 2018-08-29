/**
 * Author Daniel.he
 */
import test from 'ava';
import Style from '../src/graphic/types/Style';
import Color from '../src/graphic/types/Color';

test('hasStroke()', t => {
  let style = new Style();
  style.fillStyle = '#f00';
  t.deepEqual(style.fillStyle, new Color(255, 0, 0));
  t.deepEqual(style.fillStyle.toString(), 'rgba(255,0,0,1)');
});

test('hasFill()', t => {
  let style = new Style();
  style.fillStyle = '#f00';
  t.deepEqual(style.fillStyle, new Color(255, 0, 0));
  t.deepEqual(style.fillStyle.toString(), 'rgba(255,0,0,1)');
});

