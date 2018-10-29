import { RGB2HSL, HEX2RGB } from '../algorithm/color';

const hexRE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const rgbaRE = /^rgba?\((.*)\)$/i;

/**
 * 所用颜色统一处理为 rgba
 */
class Color {
  //4 channels.
  red = 0;
  green = 0;
  blue = 0;
  alpha = 1;

  /**
   *
   *  e.g.
   *  String: '#fff','#ac78bf', 'rgb(30, 30, 30)', 'rgba(30, 30, 30, 0.5)'
   *  Array: [128, 128, 128, 0.5],  [250, 250, 250]
   */
  constructor(colorStr?: string | [number, number, number, number]) {
    if (typeof colorStr === 'string') this.normalizeColor(colorStr);
    else if (Array.isArray(colorStr)) {
      this.red = colorStr[0];
      this.green = colorStr[1];
      this.blue = colorStr[2];
      this.alpha = colorStr[3] || 1;
    }
  }

  /**
   *
   * normalize color to rgba.
   * hex => rgba;
   * rgb => rgba;
   *
   * @param colorStr
   */
  normalizeColor(colorStr: string) {
    let color: number[] = [];

    if (hexRE.test(colorStr)) {
      color = HEX2RGB(colorStr);
    } else {
      const match = colorStr.match(rgbaRE);
      if (match) {
        const parts = match[1].split(',');
        color = parts.map(part => +part);
      }
    }

    this.red = color[0];
    this.green = color[1];
    this.blue = color[2];

    if (typeof color[3] !== 'undefined') this.alpha = color[3];
  }

  /**
   * If equals other color.
   * @param other
   */
  equals(color: Color) {
    return (
      this === color ||
      (this.red === color.red && this.green === color.green && this.blue === color.blue && this.alpha === color.alpha)
    );
  }

  /**
   * Return a new duplicate of this instance.
   */
  clone() {
    let ret = new Color();
    Object.assign(ret, this); // ...this, remain red, blue, green, alpha.
    return ret;
  }

  /**
   * Convert to HSL format.
   */
  toHSL(): number[] {
    return RGB2HSL(this.red, this.green, this.blue);
  }

  /**
   * Convert to HEX number.
   */
  toHex() {
    return (this.red << 16) + (this.green << 8) + this.blue;
  }

  /**
   * Convert to HEX string.
   */
  toHexString() {
    const colorStr = this.toHex().toString(16);
    return '#000000'.substr(0, 7 - colorStr.length) + colorStr;
  }

  /**
   * Convert to JSON format
   */
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
