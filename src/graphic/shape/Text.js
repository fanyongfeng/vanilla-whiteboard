export default class Text extends Element {

  type = 'text';

  draw(ctx) {

    let style = this.style,
      hasFill = style.hasFill,
      hasStroke = style.hasStroke,
      leading = style.leading,
      shadowColor = ctx.shadowColor;

    ctx.font = style.fontStyle;
    ctx.textAlign = style.justification;
    for (var i = 0, l = lines.length; i < l; i++) {
      // See Path._draw() for explanation about ctx.shadowColor
      ctx.shadowColor = shadowColor;
      var line = lines[i];
      if (hasFill) {
        ctx.fillText(line, 0, 0);
        ctx.shadowColor = 'rgba(0,0,0,0)';
      }
      if (hasStroke) {
        ctx.strokeText(line, 0, 0);
      }

      ctx.translate(0, leading);
    }
  }

  renderCursorOrSelection() {
    if (!this.isEditing || !this.canvas) return;

    var boundaries = this._getCursorBoundaries(), ctx;

    if (this.canvas && this.canvas.contextTop) {
      ctx = this.canvas.contextTop;
      this.clearContextTop(true);
    } else {
      ctx = this.canvas.contextContainer;
      ctx.save();
    }
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
    var selectionStart = this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart,
      selectionEnd = this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd,
      isJustify = this.textAlign.indexOf('justify') !== -1,
      start = this.get2DCursorLocation(selectionStart),
      end = this.get2DCursorLocation(selectionEnd),
      startLine = start.lineIndex,
      endLine = end.lineIndex,
      startChar = start.charIndex < 0 ? 0 : start.charIndex,
      endChar = end.charIndex < 0 ? 0 : end.charIndex;

    for (var i = startLine; i <= endLine; i++) {
      var lineOffset = this._getLineLeftOffset(i) || 0,
        lineHeight = this.getHeightOfLine(i),
        realLineHeight = 0, boxStart = 0, boxEnd = 0;

      if (i === startLine) {
        boxStart = this.__charBounds[startLine][startChar].left;
      }
      if (i >= startLine && i < endLine) {
        boxEnd = isJustify && !this.isEndOfWrapping(i) ? this.width : this.getLineWidth(i) || 5; // WTF is this 5?
      }
      else if (i === endLine) {
        if (endChar === 0) {
          boxEnd = this.__charBounds[endLine][endChar].left;
        }
        else {
          var charSpacing = this._getWidthOfCharSpacing();
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

  _animateCursor() {

  }
}
