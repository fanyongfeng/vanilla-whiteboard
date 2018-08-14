import { rgb2hsl, hex2rgb } from '../algorithm/color'

const hexRE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const rgbaRE = /^rgba?\((.*)\)$/i;

class Color {
  //4 channels.
  red = 0;
  green = 0;
  blue = 0;
  alpha = 1;

  constructor(colorStr) {
    if (typeof colorStr !== 'string') return;
    this.normalizeColor(colorStr);
  }

  /**
   *
   * normalize color to rgba.
   * hex => rgba;
   * rgb => rgba;
   *
   * @param {String} colorStr
   */
  normalizeColor(colorStr){
    let color;

    if (hexRE.test(colorStr)) {
      color = hex2rgb(colorStr);
    } else {
      let match = colorStr.match(rgbaRE),
        parts = match[1].split(',');
      color = parts.map(part => +part);
    }

    this.red = color[0];
    this.green = color[1];
    this.blue = color[2];
    if(typeof color[3] !== "undefined") this.alpha = color[3];
  }

  /**
   * Convert to HSL format
   */
  toHSL() {
    return rgb2hsl(this.red, this.green, this.blue);
  }

  toJSON() {
    return [this.red, this.green, this.blue, this.alpha];
  }

  /**
   * Convert to RGBA string (css format).
   */
  toString() {
    return `rgba(${this.toJSON().join(',')})`;
  }
}

export default Color;
