
/**
 * default style settings of path
 */
const defaultStyles = {
  // Paths
  fillColor: null,
  fillRule: 'nonzero',
  strokeColor: null,
  lineWidth: 1,
  lineCap: 'round',
  lineJoin: 'round',
  strokeScaling: true,
  miterLimit: 10,
  lineDashOffset: 0,
  dashArray: [],
  // Shadows
  shadowColor: null,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};

/**
 * default font=style settings of fillText
 */
const fontStyles = {
  // Characters
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  fontSize: 12,
  leading: null,
  // Paragraphs
  justification: 'left'
};

class Gradient {
  mode = 'linear';
  constructor() {

  }
  get stops() {

  }
  set stops(val) {

  }

  get radial() {
    return this._radial;
  }

  set radial(radial) {
      this._radial = radial;
      this._changed();
  }

}

export default class Style {
  constructor(options = {}) {
    Object.assign(this, defaultStyles, options);
  }

  equals(style) {
    // Since we're dealing with defaults, loop through style values in both
    // objects and compare with default fall-back. But in the secondary pass
    // only check against keys that weren't already in the first object:
    function compare(style1, style2, secondary) {
      let values1 = style1._values,
        values2 = style2._values,
        defaults2 = style2._defaults;
      for (let key in values1) {
        let value1 = values1[key],
          value2 = values2[key];
        if (!(secondary && key in values2) && !Base.equals(value1,
          value2 === undefined ? defaults2[key] : value2))
          return false;
      }
      return true;
    }

    return style === this || style && this._class === style._class
      && compare(this, style)
      && compare(style, this, true)
      || false;
  }

  /**
   * If has stroke.
   */
  get hasStroke() {
    let color = this.strokeColor;
    return !!color && color.alpha > 0 && this.lineWidth > 0;
  }

  /**
   * If has stroke.
   */
  get hasFill() {
    let color = this.fillColor;
    return !!color && color.alpha > 0;
  }

  /**
   * If has shadow.
   */
  get hasShadow() {
    let color = this.shadowColor;
    // In order to draw a shadow, we need either a shadow blur or an
    // offset, or both.
    return !!color && color.alpha > 0 && (this.shadowBlur > 0
      || !(this.shadowOffsetX === 0 && this.shadowOffsetY === 0));
  }

  toString() {
    return [`${key}=${val}`].join(' ');
  }
}
