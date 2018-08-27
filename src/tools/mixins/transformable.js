/**
 * enable tool has transform behavior.
 * 使工具可以变形（移动、旋转、缩放）白板Item
 */

export default function transformable() {
  return {
    onMouseDrag(event) {
      let point = event.point;

      if (this.mode === 'resize') {
        this.corner = this.corner.add(event.delta);
        let size = this.corner.subtract(this.basePoint);

        let sx = 1.0,
          sy = 1.0;

        if (Math.abs(realTimeSize.x) > 0.0000001 && this.resizeDir !== 'topCenter' && this.resizeDir !== 'bottomCenter')
          sx = size.x / realTimeSize.x;
        if (Math.abs(realTimeSize.y) > 0.0000001 && this.resizeDir !== 'leftCenter' && this.resizeDir !== 'rightCenter')
          sy = size.y / realTimeSize.y;

        this.target.scale(sx, sy, this.basePoint);
        realTimeSize = size;

      } else if (this.mode === 'move') {
        this.transformGroup.translate(event.delta);
      }
    },

    pointOnResize(point) {
      let corner, bounds;

      bounds = this.transformGroup.bounds;
      corner = boundsPoi.find(key => point.nearby(bounds[key]))

      if (!corner) {
        this.layer.setCursor('default');
        return false;
      }
      this.mode = 'resize';
      this.layer.setCursor(cursorMap[corner]);

      this.basePoint = bounds[antiDir[corner]];
      this.target = bounds.owner;
      this.corner = bounds[corner];
      this.resizeDir = corner;
      realTimeSize = this.corner.subtract(this.basePoint);
      return true;
    }
  }
}
