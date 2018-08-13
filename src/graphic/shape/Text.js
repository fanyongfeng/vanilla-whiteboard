import Item from '../Item';
import Rect from '../types/Rect'

/**
 * Text Item;
 */
export default class Text extends Item {
  static type = 'text';

  _lines = [];
  _text = "";
  _mode = "canvas"; //textarea
  _autoBreak = true; // if _autoBreak is true, Text line will break if out of canvas bounds.

  constructor(text) {
    super();
    this._text = text;
    this._lines = text.split(/\r\n|\n|\r/mg);
  }

  set text(value){ d
    this._text = value;
  }

  get text(){
    return this._text;
  }

  get bounds() {
    let style = this.style,
      lines = this._lines,
      numLines = lines.length,
      leading = style.leading || 18,
      width = this.getTextWidth(style.font, lines),
      x = 0;

    return new Rect(x + 100, (numLines ? - 0.75 * leading : 0) + 100, width, numLines * leading)
  }

  /**
   * 获取文字宽度
   *
   * @param {String} font
   * @param {Array} lines
   */
  getTextWidth(font, lines) {
    let ctx = this._ctx,
      prevFont = ctx.font,
      width = 0;

    ctx.font = font;
    // 测量text宽度, 但Canvas无法测量文字高度，只能通过leading 设定
    for (let i = 0, l = lines.length; i < l; i++)
      width = Math.max(width, ctx.measureText(lines[i]).width);
    ctx.font = prevFont;

    return width;
  }

  _draw(ctx) {

    this._ctx = ctx;
    let lines = this._lines,
      style = this.style,
      hasFill = style.hasFill,
      hasStroke = style.hasStroke,
      leading = style.leading || 18,
      shadowColor = ctx.shadowColor;

    this.selected = true;

    ctx.save();

    ctx.font = style.font;
    ctx.textAlign = style.justification;
    for (let i = 0, l = lines.length; i < l; i++) {
      // See Path._draw() for explanation about ctx.shadowColor
      ctx.shadowColor = shadowColor;
      let line = lines[i];
      if (hasFill) {
        ctx.fillText(line, 100, 100);
        ctx.shadowColor = 'rgba(0,0,0,0)';
      }
      if (hasStroke) {
        ctx.strokeText(line, 100, 100);
      }
      ctx.translate(0, leading); //绘制行高
    }

    ctx.restore();
  }

  _getCursorBounds(){
    if (typeof position === 'undefined') {
      position = this.selectionStart;
    }

    let left = this._getLeftOffset(),
        top = this._getTopOffset(),
        offsets = this._getCursorBoundariesOffsets(position);

    return {
      left: left,
      top: top,
      leftOffset: offsets.left,
      topOffset: offsets.top
    };
  }

  renderCursorOrSelection() {
    if (!this.isEditing || !this.canvas) return;

    let boundaries = this._getCursorBoundaries(), ctx;

    ctx.save();

    if (this.selectionStart === this.selectionEnd) {
      this.renderCursor(boundaries, ctx);
    } else {
      this.renderSelection(boundaries, ctx);
    }

    ctx.restore();
  }

  renderCursor() {

    let cursorLocation = this.get2DCursorLocation(),
      lineIndex = cursorLocation.lineIndex,
      charIndex = cursorLocation.charIndex > 0 ? cursorLocation.charIndex - 1 : 0,
      charHeight = this.getValueOfPropertyAt(lineIndex, charIndex, 'fontSize'),
      multiplier = this.scaleX * this.canvas.getZoom(),
      cursorWidth = this.cursorWidth / multiplier,
      topOffset = boundaries.topOffset,
      dy = this.getValueOfPropertyAt(lineIndex, charIndex, 'deltaY');

    topOffset += (1 - this._fontSizeFraction) * this.getHeightOfLine(lineIndex) / this.lineHeight
      - charHeight * (1 - this._fontSizeFraction);

    if (this.inCompositionMode) {
      this.renderSelection(boundaries, ctx);
    }

    ctx.fillStyle = this.getValueOfPropertyAt(lineIndex, charIndex, 'fill');
    ctx.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity;
    ctx.fillRect(
      boundaries.left + boundaries.leftOffset - cursorWidth / 2,
      topOffset + boundaries.top + dy,
      cursorWidth,
      charHeight);
  }

  renderSelection() {
    let selectionStart = this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart,
      selectionEnd = this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd,
      isJustify = this.textAlign.indexOf('justify') !== -1,
      start = this.get2DCursorLocation(selectionStart),
      end = this.get2DCursorLocation(selectionEnd),
      startLine = start.lineIndex,
      endLine = end.lineIndex,
      startChar = start.charIndex < 0 ? 0 : start.charIndex,
      endChar = end.charIndex < 0 ? 0 : end.charIndex;

    for (let i = startLine; i <= endLine; i++) {
      let lineOffset = this._getLineLeftOffset(i) || 0,
        lineHeight = this.getHeightOfLine(i),
        realLineHeight = 0, boxStart = 0, boxEnd = 0;

      if (i === startLine) {
        boxStart = this.__charBounds[startLine][startChar].left;
      }

      if (i >= startLine && i < endLine) {
        boxEnd = isJustify && !this.isEndOfWrapping(i) ? this.width : this.getLineWidth(i) || 5; // WTF is this 5?
      } else if (i === endLine) {
        if (endChar === 0) {
          boxEnd = this.__charBounds[endLine][endChar].left;
        } else {
          let charSpacing = this._getWidthOfCharSpacing();
          boxEnd = this.__charBounds[endLine][endChar - 1].left
            + this.__charBounds[endLine][endChar - 1].width - charSpacing;
        }
      }
      realLineHeight = lineHeight;
      if (this.lineHeight < 1 || (i === endLine && this.lineHeight > 1)) {
        lineHeight /= this.lineHeight;
      }
      if (this.inCompositionMode) {
        ctx.fillStyle = this.compositionColor || 'black';
        ctx.fillRect(
          boundaries.left + lineOffset + boxStart,
          boundaries.top + boundaries.topOffset + lineHeight,
          boxEnd - boxStart,
          1);
      }
      else {
        ctx.fillStyle = this.selectionColor;
        ctx.fillRect(
          boundaries.left + lineOffset + boxStart,
          boundaries.top + boundaries.topOffset,
          boxEnd - boxStart,
          lineHeight);
      }

      boundaries.topOffset += realLineHeight;
    }
  }

  blinkCursor() {

  }
}
