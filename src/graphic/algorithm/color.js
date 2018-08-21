import { max, min } from './math';

// CSS named colors.
const namedColor = {
  'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
  'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
  'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
  'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
  'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
  'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
  'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
  'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
  'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
  'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
  'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
  'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
  'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
  'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
  'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
  'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
  'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
  'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
  'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
  'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
  'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
  'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
  'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
  'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
  'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
  'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
  'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
  'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
  'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
  'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
  'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
  'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
  'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
  'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
  'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
  'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
  'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
  'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
  'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
  'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
  'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
  'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
  'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
  'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
  'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
  'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
  'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
  'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
  'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
  'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
  'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
  'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
  'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
  'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
  'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
  'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
  'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
  'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
  'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
  'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
  'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
  'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
  'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
  'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
  'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
  'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
  'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
  'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
  'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
  'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
  'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
  'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
  'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
  'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};

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
 * @param {Number} h hue
 * @param {Number} s saturation
 * @param {Number} l lightness
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

/**
 * Convert RGB to HEX.
 *
 * @param {Number} r Red color value
 * @param {Number} g Green color value
 * @param {Number} b Blue color value
 */
function rgb2hex(r, g, b) {
  var s = (65536 * Math.round(255 * r) + 256 * Math.round(255 * g) + Math.round(255 * b)).toString(16);
  return "#" + "00000".substr(0, 6 - s.length) + s
}

/**
 * Convert hex color string to rgb.
 * @param {String} hex e.g. #ffffff, #c19
 */
function hex2rgb(hex) {
  //TODO: check format.
  if (hex.length === 4) { //#fff
    hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[2]}${hex[2]}`;
  } else if (hex.length === 7) {
    hex = hex.replace(/^#/, '');
  } else {
    throw new TypeError("invalid hex format!");
  }

  const num = parseInt(hex, 16);
  const red = num >> 16;
  const green = (num >> 8) & 255;
  const blue = num & 255;

  return [red, green, blue];
}

/**
 * Convert gray color to rgb.
 * @param {Number} g gray
 */
function gray2rgb(g) {
  return [g, g, g];
}

/**
 * Convert gray color to HSB.
 * @param {Number} g gray
 */
function gray2hsb(g) {
  return [0, 0, g];
}

/**
 *Color convert helpers.
 */
export { namedColor, rgb2hsl, hsl2rgb, rgb2gray, gray2rgb, gray2hsb, rgb2hex, hex2rgb }
