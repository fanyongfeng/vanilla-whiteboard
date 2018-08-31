import Group from '../../graphic/Group';
import { boundsPoi, antiDir, cursorMap } from '../../graphic/algorithm/corner';

/**
 * enable tool has transform behavior.
 * 依赖于selectable, 必须选中才可以tranform
 * 使工具可以变形（移动、旋转、缩放）白板Item
 */
export default function transformable(enableRotate = false) {
  return {
    realTimeSize: null,

    _init() {
      this.transformGroup = new Group();
    },

    onMouseDown(event) {
      this._downPoint = event.point;

      this.layer.items.set(this.transformGroup);
      this.transformGroup.children = this._selected;

      let isPointOnResize = this._pointOnResize(this._downPoint);

      if (isPointOnResize) {
        this.mode = 'resize';
      } else if (this.mode === 'select') {
        this.items.unselect();
        this.transformGroup.children = [];
        return true;
      }
      return false;
    },

    onMouseDrag({ delta }) {
      if (this.mode === 'select') {
        this.transformGroup.children = this._selected;
      } else if (this.mode === 'resize') {
        this.corner = this.corner.add(delta);
        let size = this.corner.subtract(this.basePoint);

        let sx = 1.0,
          sy = 1.0;

        if (
          Math.abs(this.realTimeSize.x) > 0.0000001 &&
          this.resizeDir !== 'topCenter' &&
          this.resizeDir !== 'bottomCenter'
        )
          sx = size.x / this.realTimeSize.x;
        if (
          Math.abs(this.realTimeSize.y) > 0.0000001 &&
          this.resizeDir !== 'leftCenter' &&
          this.resizeDir !== 'rightCenter'
        )
          sy = size.y / this.realTimeSize.y;

        this.target.scale(sx, sy, this.basePoint);
        this.realTimeSize = size;
      } else if (this.mode === 'move') {
        this.transformGroup.translate(delta);
      }
    },

    onMouseUp() {
      if (this.mode === 'move') {
        this.globalCtx.emit('items:move', []);
      } else if (this.mode === 'resize') {
        this.globalCtx.emit('items:resize', []);
      }
    },

    onMouseMove({ point }) {
      return !this._pointOnResize(point);
    },

    _pointOnResize(point) {
      let corner, bounds;

      bounds = this.transformGroup.bounds;
      corner = boundsPoi.find(key => point.nearby(bounds[key]));

      if (!corner) {
        this.setLayerCursor('default');
        return false;
      }
      this.setLayerCursor(cursorMap[corner]);
      this.basePoint = bounds[antiDir[corner]];
      this.target = bounds.owner;
      this.corner = bounds[corner];
      this.resizeDir = corner;
      this.realTimeSize = this.corner.subtract(this.basePoint);
      return true;
    },
  };
}
