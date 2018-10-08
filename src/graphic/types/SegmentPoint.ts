import Point from "./Point";

/**
 * related to segment, includes:
 * 1) handleIn, control point 2 of prev curve
 * 2) handleOut, control point 1 of next curve
 * 3) point
 */
export class SegmentPoint {
  handleIn: Point | null;
  handleOut: Point | null;
  point: Point | null;
  prev: SegmentPoint | null;
  next: SegmentPoint | null;
  constructor() {
    this.handleIn = null;
    this.handleOut = null;
    this.point = null;
    this.prev = null;
    this.next = null;
  }

  get points() {
    return [this.point, this.handleIn, this.handleOut];
  }

  toJSON() {
    return this.points.map(point => point ? [point.x, point.y] : []);
  }
}
