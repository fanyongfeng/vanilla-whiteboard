import Point from '../../graphic/types/Point';
import { CustomizeMouseEvent } from '../../Whiteboard/EventType';
import { Segment } from '../../graphic/types/Segment';
/**
 * enable tool has mutate behavior.
 */
export default function mutable(): { [key: string]: any } {
  return {
    onMouseDown(event: CustomizeMouseEvent) {
      const { point } = event;
      if (this._pointOnPoint(point)) {
        return;
      }
    },

    onMouseDrag(event: CustomizeMouseEvent) {
      const { point } = event;
      if (this.mode === 'mutate') {
        this.targetPoint.assign(point);
        this.target.changed();
      }
    },

    onMouseMove(event: CustomizeMouseEvent) {
      const { point } = event;
      return !this._pointOnPoint(point);
    },

    _pointOnPoint(point: Point) {
      let nearbyPoint, seg, segments: Segment[];
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
        seg && (this.target = seg.owner);
        this.targetPoint = nearbyPoint;
        return true;
      }

      this.setLayerCursor('default');
      return false;
    },
  };
}
