import Img from '../../graphic/shape/Image';
import Point from '../../graphic/types/Point';
import { CustomizeMouseEvent } from '../../Whiteboard/EventType';

/**
 * Custom tool cursor as specified image.
 * @param {String} url
 * @param {Object} offset, both offset.x & offset.y are numbers
 * code example:
 * @cursor('https://example/x.png', {x : 10, y: 10});
 */
export default function cursor(url: ((type: string) => string) | string, offset: {x: number, y: number}): { [key: string]: any } {
  const offsetX = offset ? offset.x : 0;
  const offsetY = offset ? offset.y : 0;

  return {
    /**
     * All _init method should be invoked in constructor of base;
     */
    _init() {
      if (typeof url === 'function') {
        url = url(this.type);
      }
      this._cursor = new Img({}, url);
    },

    /**
     * Get cursor image of tool, readonly.
     */
    get cursor() {
      return this._cursor;
    },

    /**
     * Set layer cursor as tool's cursor
     */
    onMouseEnter() {
      this.layer.setCursor(this.cursor);
    },

    /**
     * Update position of image on mousemove & mouseDrag.
     * @param {Point} point
     */
     _move(point: Point) {
      if (this.cursor.loaded) {
        this.cursor.position = point.add(offsetX, offsetY);
      }
    },

    onMouseMove(event: CustomizeMouseEvent) {
      const { point } = event;
      this._move(point);
    },

    onMouseDrag(event: CustomizeMouseEvent) {
      const { point } = event;
      this._move(point);
    },
  };
}
