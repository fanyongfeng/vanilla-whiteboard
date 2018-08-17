import Color from './Color';
/**
 * default style settings of path
 */
const defaultStyles = {

  fillStyle: new Color('#c69'),
  strokeStyle: new Color('#c69'),
  // Paths
  fillRule: 'nonzero',
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
  fontSize: 16,
  textAlign: 'left',
  justification: 'left'
};

export default class Style {

  constructor(options = {}) {
    Object.assign(this, defaultStyles, fontStyles, options);
  }

  /**
   * Apply styles on canvas context.
   * @param {CanvasRenderingContext2D} ctx, canvas context.
   */
  apply(ctx) {
    ctx.strokeStyle = this.strokeStyle.toString() ;
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.lineJoin = this.lineJoin;
    ctx.lineCap = this.lineCap;
    if(this.dashArray) {
      ctx.setLineDash(this.dashArray)
    }
    //TODO: implement rest props.
  }

  /**
   * Return a new duplicate of this instance.
   */
  clone(){
    let ret = new Style();
    let {strokeStyle, fillStyle, ...rest} = this;
    Object.assign(ret, rest);

    ret.fillStyle = fillStyle.clone();
    ret.strokeStyle = strokeStyle.clone();
    return ret;
  }

  /**
   * If equals other style.
   * @param {Style} style
   */
  equals(other) {
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

    return other === this || compare(this, other) || false;
  }

  get font(){
    return `${this.fontSize}px sans-serif`;
  }

  /**
   * Get line-height of fonts
   */
  get leading(){
    //hard-code as 1.4 times of fontSize.
    return this.fontSize * 1.4;
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

  toShortJSON(){
    return {
      "c": this.strokeStyle.toHexString(),
      "w": this.lineWidth,
      "f": this.fontSize
    }
  }

  toString() {
    return [`${key}=${val}`].join(' ');
  }
}
