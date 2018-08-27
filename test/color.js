/**
 * Author Daniel.he
 */
import test from 'ava';
import Color from '../src/graphic/types/Color';

test('Set named color', function() {
  var path = new Path();
  path.fillColor = 'red';
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
});

test('Set color to hex', function() {
  var path = new Path();
  path.fillColor = '#ff0000';
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');

  var path = new Path();
  path.fillColor = '#f00';
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
});


test('Set color to array', function() {
  var path = new Path();
  path.fillColor = [1, 0, 0];
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
});

test('Converter:', function() {
  var path = new Path();
  path.fillColor = [1, 0, 0];
  equals(path.fillColor, new Color(1, 0, 0));
  equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
})
