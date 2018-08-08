
/**
 *  Adapted from <a href="https://rawgithub.com/mjijackson/mjijackson.github.com/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.html">https://github.com/mjijackson</a>
* @param {Number} r Red color value
* @param {Number} g Green color value
* @param {Number} b Blue color value
* @return {Array} hsl color
 */
function rgb2hsl(r, g, b) {
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min,
    achromatic = delta === 0,
    h = achromatic ? 0
      : (max == r ? (g - b) / delta + (g < b ? 6 : 0)
        : max == g ? (b - r) / delta + 2
          : (r - g) / delta + 4) * 60, // max == b
    l = (max + min) / 2,
    s = achromatic ? 0 : l < 0.5
      ? delta / (max + min)
      : delta / (2 - max - min);
  return [h, s, l];
}

function hsl2rgb(h, s, l) {
  // Scale h to 0..1 with modulo for negative values too
  h = (((h / 360) % 1) + 1) % 1;
  if (s === 0)
    return [l, l, l];
  var t3s = [h + 1 / 3, h, h - 1 / 3],
    t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
    t1 = 2 * l - t2,
    c = [];
  for (var i = 0; i < 3; i++) {
    var t3 = t3s[i];
    if (t3 < 0) t3 += 1;
    if (t3 > 1) t3 -= 1;
    c[i] = 6 * t3 < 1
      ? t1 + (t2 - t1) * 6 * t3
      : 2 * t3 < 1
        ? t2
        : 3 * t3 < 2
          ? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
          : t1;
  }
  return c;
}

function rgb2gray(r, g, b) {
  // Using the standard NTSC conversion formula that is used for
  // calculating the effective luminance of an RGB color:
  // http://www.mathworks.com/support/solutions/en/data/1-1ASCU/index.html?solution=1-1ASCU
  return [r * 0.2989 + g * 0.587 + b * 0.114];
}

function gray2rgb(g) {
  return [g, g, g];
}

function gray2hsb(g) {
  return [0, 0, g];
}

/**
 *Color convert helpers.
 */
export { rgb2hsl, hsl2rgb, rgb2gray, gray2rgb, gray2hsb }
