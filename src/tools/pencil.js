export default class Pencil {
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
}