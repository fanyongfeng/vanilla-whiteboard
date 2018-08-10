
/**
 * default style settings of path
 */
const defaultStyles = {
  // Paths
  fillStyle: '#c69',
  fillRule: 'nonzero',
  strokeStyle: '#c69',
  lineWidth: 3,
  lineCap: 'round',
  lineJoin: 'round',
  miterLimit: 10,
  lineDashOffset: 0,
  dashArray: [], // for: setLineDash, getLineDash
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
  font: 'sans-serif',
  leading: null,
  textAlign: 'left',
  justification: 'left'
};

export default class Style {
  constructor(options = {}) {
    Object.assign(this, defaultStyles, options);
  }

  apply(ctx) {
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    if(this.dashArray) {
      ctx.setLineDash(this.dashArray)
    }
  }

  equals(style) {
    function compare(style1, style2, secondary) {
      let values1 = style1.values,
        values2 = style2.values;

      for (let key in values1) {
        let value1 = values1[key],
          value2 = values2[key];
        if (value1 !== value2) return false;
      }
      return true;
    }

    return style === this || compare(this, style) || false;
  }

  /**
   * If has stroke.
   */
  get hasStroke() {
    let color = this.strokeStyle;
    return !!color;
    // return !!color && color.alpha > 0 && this.lineWidth > 0;
  }

  /**
   * If has stroke.
   */
  get hasFill() {
    let color = this.fillStyle;
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
