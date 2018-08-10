import { max, min } from './math'

/**
* Adapt from <a href="https://rawgithub.com/mjijackson/mjijackson.github.com/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.html">https://github.com/mjijackson</a>
* @param {Number} r Red color value
* @param {Number} g Green color value
* @param {Number} b Blue color value
* @return {Array} hsl color
*/
function rgb2hsl(r, g, b) {
  let maxc = max(r, g, b),
    minc = min(r, g, b),
    delta = maxc - minc,
    achromatic = delta === 0,
    h = achromatic ? 0
      : (maxc == r ? (g - b) / delta + (g < b ? 6 : 0)
        : maxc == g ? (b - r) / delta + 2
          : (r - g) / delta + 4) * 60, // maxc == b
    l = (maxc + minc) / 2,
    s = achromatic ? 0 : l < 0.5
      ? delta / (maxc + minc)
      : delta / (2 - maxc - minc);

  return [h, s, l];
}

/**
 * Convert RGB color tp HSL(LSV)
 *
 * @param {*} h hue
 * @param {*} s saturation
 * @param {*} l lightness
 */
function hsl2rgb(h, s, l) {
  // Scale h to 0..1 with modulo for negative values too
  h = (((h / 360) % 1) + 1) % 1;
  if (s === 0)
    return [l, l, l];
  let t3s = [h + 1 / 3, h, h - 1 / 3],
    t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
    t1 = 2 * l - t2,
    c = [];
  for (let i = 0; i < 3; i++) {
    let t3 = t3s[i];
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

/**
  * Using the standard NTSC conversion formula that is used for
  * calculating the effective lumincance of an RGB color:
  * http://www.mathworks.com/support/solutions/en/data/1-1ASCU/index.html?solution=1-1ASCU
  *
  * @param {Number} r Red color value
  * @param {Number} g Green color value
  * @param {Number} b Blue color value
  * */
function rgb2gray(r, g, b) {
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
