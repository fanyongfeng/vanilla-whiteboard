
import Image from '../../graphic/shape/Image';

/**
 * Custom tool cursor as specified image.
 * @param {String} url
 * @param {Object} offset, both offset.x & offset.y are numbers
 * code example:
 * @cursor('https://example/x.png', {x : 10, y: 10});
 */
export default function cursor(url, offset = null) {
  let offsetX = offset ? offset.x : 0;
  let offsetY = offset ? offset.y : 0;

  return {

    /**
     * All _init method should invoked in constructor of base;
     */
    _init() {
      if (typeof url === "function") {
        url = url(this.type);
      }
      this._cursor = new Image({}, url);
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
    _move(point){
      if (this.cursor.loaded) {
        this.cursor.position = point.add(offsetX, offsetY);
      }
    },

    onMouseMove({ point }) {
      this._move(point);
    },

    onMouseDrag({ point }) {
      this._move(point);
    },
  }
}
