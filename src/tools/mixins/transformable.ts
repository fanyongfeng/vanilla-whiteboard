import Group from '../../graphic/Group';
import { boundsPoi, antiDir, cursorMap } from '../../graphic/algorithm/corner';
import { getAngle } from '../../graphic/algorithm/trigonometry';

import { CustomizeMouseEvent } from '../../Whiteboard/EventType'; 
import Point from '../../graphic/types/Point';
/**
 * enable tool has transform behavior.
 * 依赖于selectable, 必须选中才可以tranform
 * 使工具可以变形（移动、旋转、缩放）白板Item
 */
export default function transformable(enableRotate = false): { [key: string]: any } {
  return {
    realTimeSize: null,
    enableRotate,

    _init() {
      this.transformGroup = new Group({}, []);
    },

    onMouseDown(event: CustomizeMouseEvent) {
      this._downPoint = event.point;

      this.layer.items.set(this.transformGroup);
      this.transformGroup.children = this._selected;

      let action = this._pointOnResize(this._downPoint);

      if (action !== '') {
        this.mode = action;
      } else if (this.mode === 'select') {
        this.items.unselect();
        this.transformGroup.children = [];
        return true;
      }
      return false;
    },

    onMouseDrag({ delta, point }) {
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
      } else if (this.mode === 'rotate') {
        let lastPoint = point.subtract(delta);
        let angle = getAngle(this.transformGroup.bounds.center, lastPoint, point);
        this.transformGroup.rotate(angle);
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

    _pointOnResize(point: Point) {
      let corner, bounds;

      let rotatePoint = this.transformGroup.control.rotateControlPoint;
      if (this.enableRotate && rotatePoint && point.nearby(rotatePoint)) {
        this.setLayerCursor('pointer');
        return 'rotate';
      }

      bounds = this.transformGroup.bounds;
      corner = boundsPoi.find(key => point.nearby(bounds[key]));

      if (!corner) {
        this.setLayerCursor('default');
        return '';
      }

      this.setLayerCursor(cursorMap[corner]);
      this.basePoint = bounds[antiDir[corner]];
      this.target = bounds.owner;
      this.corner = bounds[corner];
      this.resizeDir = corner;
      this.realTimeSize = this.corner.subtract(this.basePoint);
      return 'resize';
    },
  };
}
