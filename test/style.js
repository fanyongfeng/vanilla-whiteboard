/**
 * Author Daniel.he
 */
import test from 'ava';
import Style from '../src/graphic/types/Style';

test('Style.prototype.hasStroke', function() {
  var path = new Path();
  path.fillColor = 'red';
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
});

test('Style.prototype.hasFill', function() {
  var path = new Path();
  path.fillColor = 'red';
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
});

