export default class FreeDrawing {

  render() {
    var ctx  = this.canvas.contextTop, i, len,
        p1 = this._points[0],
        p2 = this._points[1];

    this._saveAndTransform(ctx);
    ctx.beginPath();

    if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
      var width = this.width / 1000;
      p1 = new fabric.Point(p1.x, p1.y);
      p2 = new fabric.Point(p2.x, p2.y);
      p1.x -= width;
      p2.x += width;
    }
    ctx.moveTo(p1.x, p1.y);

    for (i = 1, len = this._points.length; i < len; i++) {
      this._drawSegment(ctx, p1, p2);
      p1 = this._points[i];
      p2 = this._points[i + 1];
    }

    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.restore();
  }
  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(pointer) {
    this._prepareForDrawing(pointer);
    // capture coordinates immediately
    // this allows to draw dots (when movement never occurs)
    this._captureDrawingPath(pointer);
    this._render();
  }

  /**
   * Inovoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove(pointer) {
    if (this._captureDrawingPath(pointer) && this._points.length > 1) {
      if (this.needsFullRender) {
        // redraw curve
        // clear top canvas
        this.canvas.clearContext(this.canvas.contextTop);
        this._render();
      }
      else {
        var points = this._points, length = points.length, ctx = this.canvas.contextTop;
        // draw the curve update
        this._saveAndTransform(ctx);
        if (this.oldEnd) {
          ctx.beginPath();
          ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
        }
        this.oldEnd = this._drawSegment(ctx, points[length - 2], points[length - 1], true);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  /**
   * Invoked on mouse up
   */
  onMouseUp() {
    this.oldEnd = undefined;
    this._finalizeAndAddPath();
  }

  _drawSegment(ctx, p1, p2) {
    var midPoint = p1.midPointFrom(p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    return midPoint;
  }

  _finalizeAndAddPath() {
    var ctx = this.canvas.contextTop;
    ctx.closePath();

    var pathData = this.convertPointsToSVGPath(this._points).join('');
    if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
      // do not create 0 width/height paths, as they are
      // rendered inconsistently across browsers
      // Firefox 4, for example, renders a dot,
      // whereas Chrome 10 renders nothing
      this.canvas.requestRenderAll();
      return;
    }

    var path = this.createPath(pathData);
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.add(path);
    this.canvas.renderAll();
    path.setCoords();
    this._resetShadow();

  }
}