/**
 * 行为装饰器，使工具具有item选择的能力
 */
export default function hitBehavior() {
  return function (target) {

    target.prototype.onMouseMove = function (event) {

    }

    target.prototype.pointOnElement = function (point) {
      let item;
      for (let len = this.items.length, i = len; i > 0; i--) { // find from right
        item = this.items.get(i - 1);
        if (item.containsPoint(point)) {
          this.setCursor('pointer');
          this.mode = 'move';
          this.target = item;
          return true;
        }
      }
      return false;
    }

    target.prototype.pointOnPoint = function (point) {
      let nearbyPoint, seg;
      for (let i = 0; i < this.items.length; i++) {
        let segments = this.items.get(i).segments;

        if (!segments) continue;

        for (let j = 0; j < segments.length; j++) {
          seg = segments[j];
          if (seg.command !== 'C') continue;
          nearbyPoint = seg.points.find(p => point.nearby(p));
          if (nearbyPoint) break;
        }
        if (nearbyPoint) break;
      }

      if (nearbyPoint) {
        this.mode = 'mutate';
        this.setCursor('pointer');
        this.target = seg.owner;
        this.targetPoint = nearbyPoint;
        return true
      }
      return false;
    }

    target.prototype.pointOnResize = function (point) {
      let corner, bounds;
      for (let i = 0; i < this.items.length; i++) {
        bounds = this.items.get(i).bounds;
        if (corner = boundsPoi.find(key => point.nearby(bounds[key]))) break;
      }
      if (!corner) {
        this.setCursor('default');
        return false;
      }
      this.mode = 'resize';
      this.setCursor(cursorMap[corner]);

      this.basePoint = bounds[antiDir[corner]];
      this.target = bounds.owner;
      this.corner = bounds[corner];
      this.resizeDir = corner;
      realTimeSize = this.corner.subtract(this.basePoint);
      return true;
    }
  }
}
