/**
 * enable tool has mutate behavior.
 */
export default function mutable() {
  return {
    onMouseDown(event) {
      const point = event.point;
      if (this._pointOnPoint(point)) {
        return;
      }
    },

    onMouseDrag(event) {
      const point = event.point;
      if (this.mode === 'mutate') {
        this.targetPoint.assign(point);
        this.target.changed();
      }
    },

    onMouseMove({ point }) {
      return !this._pointOnPoint(point);
    },

    _pointOnPoint(point) {
      let nearbyPoint, seg, segments;
      for (let item of this.items) {
        segments = item.segments;

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
        this.setLayerCursor('pointer');
        this.target = seg.owner;
        this.targetPoint = nearbyPoint;
        return true;
      }

      this.setLayerCursor('default');
      return false;
    },
  };
}
