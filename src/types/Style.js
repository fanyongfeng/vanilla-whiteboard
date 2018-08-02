import Point from './Point';

const defaultStyles = {
  // Paths
  fillColor: null,
  fillRule: 'nonzero',
  strokeColor: null,
  strokeWidth: 1,
  strokeCap: 'round',
  strokeJoin: 'miter',
  strokeScaling: true,
  miterLimit: 10,
  dashOffset: 0,
  dashArray: [],
  // Shadows
  shadowColor: null,
  shadowBlur: 0,
  shadowOffset: new Point(),
  // Selection
  selectedColor: null
};

const fontStyles = {
  // Characters
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  fontSize: 12,
  leading: null,
  // Paragraphs
  justification: 'left'
};

export default class Style {
  constructor() {


  }

  equals(style) {
    // Since we're dealing with defaults, loop through style values in both
    // objects and compare with default fall-back. But in the secondary pass
    // only check against keys that weren't already in the first object:
    function compare(style1, style2, secondary) {
      var values1 = style1._values,
        values2 = style2._values,
        defaults2 = style2._defaults;
      for (var key in values1) {
        var value1 = values1[key],
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

  hasStroke() {
    var color = this.getStrokeColor();
    return !!color && color.alpha > 0 && this.getStrokeWidth() > 0;
  }


  hasShadow() {
    var color = this.getShadowColor();
    // In order to draw a shadow, we need either a shadow blur or an
    // offset, or both.
    return !!color && color.alpha > 0 && (this.getShadowBlur() > 0
      || !this.getShadowOffset().isZero());
  }

  toString() {

  }
}