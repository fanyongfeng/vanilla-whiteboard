import { rgb2hsl } from '../algorithm/color'

class Color {
  //4 channels.
  red = 0;
  green = 0;
  blue = 0;
  alpha = 1;

  constructor(initVal) {
    this.normalizeColor(initVal);
  }

  toHSL(){
    return rgb2hsl(this.red, this.green, this.blue);
  }

  /**
   * normalize color to rgba.
   * hex => rgba;
   */
  normalizeColor() {

  }

  toString() {
    return `rgba(,${this.alpha}`;
  }
}

export default Color;
