import Color from './Color';

const fillRule = {
  nonzero: 'nonzero',
  evenodd: 'evenodd',
};
/**
 * default style settings of path
 */
export const defaultStyles = {
  //reset default value to adapt whiteboard.
  // Paths
  fillRule: fillRule.nonzero,
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
export const fontStyles = {
  // Characters
  strokeColor: 'rgba(232, 20, 20, 1)',
  fontSize: 36,
  fontFamily: 'sans-serif',
  textAlign: 'left',
  justification: 'left',
};

export default class Style {
  private _strokeStyle: Color;
  private _fillStyle: Color;
  fillRule!: "nonzero" | "evenodd";
  lineWidth!: number;
  lineCap!: "butt" | "round" | "square";
  lineJoin!: "bevel" | "round" | "miter";
  miterLimit!: number;
  lineDashOffset!: number;
  dashArray!: number[];
  shadowColor!: Color;
  shadowBlur!: number;
  shadowOffsetX!: number;
  shadowOffsetY!: number;
  strokeColor!: string;
  fontSize!: number;
  fontFamily!: string;
  textAlign!: string;
  justification!: string;

  constructor(options: Partial<typeof defaultStyles & typeof fontStyles> = {}) {
    /** new copy of color instance! */
    this._strokeStyle = new Color('#c69');
    this._fillStyle = new Color('#c69');
    // this.lineWidth = 3;
    Object.assign(this, defaultStyles, fontStyles, options);
  }

  get strokeStyle() {
    return this._strokeStyle;
  }

  /**
   * ensure Color type
   */
  set strokeStyle(val) {
    if (typeof val === 'string') {
      this._strokeStyle = new Color(val);
    } else {
      this._strokeStyle = val;
    }
  }

  get fillStyle() {
    return this._fillStyle;
  }

  /**
   * ensure Color type
   */
  set fillStyle(val) {
    if (typeof val === 'string') {
      this._fillStyle = new Color(val);
    } else {
      this._fillStyle = val;
    }
  }

  /**
   * Apply styles on canvas context.
   * @param ctx, canvas context.
   */
  apply(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = this.lineWidth;
    ctx.lineJoin = this.lineJoin;
    ctx.lineCap = this.lineCap;

    if (this.hasStroke) {
      ctx.strokeStyle = this.strokeStyle.toString();
    }
    if (this.hasFill) {
      ctx.fillStyle = this.fillStyle.toString();
    }
    if (this.dashArray && this.dashArray.length) {
      ctx.setLineDash(this.dashArray);
      ctx.lineDashOffset = this.lineDashOffset;
    }
    //TODO: implement rest props.
  }

  /**
   * Return a new duplicate of this instance.
   */
  clone() {
    const ret = new Style();
    const { strokeStyle, fillStyle, ...rest } = Object.create(this);
    Object.assign(ret, rest);

    ret.fillStyle = fillStyle.clone();
    ret.strokeStyle = strokeStyle.clone();
    return ret;
  }

  /**
   * If equals other style.
   * @param style
   */
  equals(other: Style) {
    function compare(style1: Style, style2: Style) {
      let values1 = Object.keys(style1),
        values2 = Object.keys(style2);

      for (let key in values1) {
        let value1 = values1[key],
          value2 = values2[key];
        if (value1 !== value2) return false;
      }
      return true;
    }

    return other === this || compare(this, other) || false;
  }

  /**
   * Read-only prop
   */
  get font() {
    return `${this.fontSize}px ${this.fontFamily}`;
  }

  /**
   * Get line-height of fonts
   */
  get leading() {
    //hard-code as 1.4 times of fontSize.
    return this.fontSize * 1.4;
  }

  /**
   * If has stroke.
   */
  get hasStroke() {
    let color = this.strokeStyle;
    return !!color && color.alpha > 0 && this.lineWidth > 0;
  }

  /**
   * If has fill.
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
    return (
      !!color && color.alpha > 0 && (this.shadowBlur > 0 || !(this.shadowOffsetX === 0 && this.shadowOffsetY === 0))
    );
  }

  /**
   * Convert to Shortly JSON format. used for MilkyWay concerns.
   */
  toShortJSON() {
    return {
      sc: this.strokeStyle.toHexString(),
      fc: this.fillStyle.toHexString(),
      w: this.lineWidth,
      f: this.fontSize,
    };
  }

  /**
   * Convert to JSON format.
   */
  toJSON() {
    // return { ...this };
    return Object.assign({}, this);
  }

  /**
   * Convert to string.
   * e.g. 'stokeStyle=rgba(0,0,0,1) lineWidth=10'
   */
  toString() {
    // return Object.keys({ ...this })
    return Object.keys(this)
      .filter(key => this[key] && this[key].length !== 0)
      .map(key => `${key} = ${this[key].toString()}`)
      .join(';');
  }
}
