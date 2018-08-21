
import Rectangle from '../graphic/shape/Rectangle';
import Point from '../graphic/types/Point';
import { boundsPoi, antiDir } from '../graphic/algorithm/corner';
import Tool from './Tool';
import Group from '../graphic/Group';
import ControlRect from '../graphic/component/ControlRect'

const cursorMap = {
  'topLeft': 'nw-resize',
  'topCenter': 'n-resize',
  'topRight': 'ne-resize',
  'rightCenter': 'e-resize',
  'bottomRight': 'se-resize',
  'bottomCenter': 's-resize',
  'bottomLeft': 'sw-resize',
  'leftCenter': 'w-resize',
};

let realTimeSize, lastSelected = [];

export default class Selection extends Tool {

  mode = 'move'; //resize, rotate, mutate, select

  constructor() {
    super();
    this.selectionRect = new Rectangle();
    this.selectionRect.style.strokeStyle = '#aaa';
    this.selectionRect.style.lineWidth = 1;
    this.selectionRect.style.dashArray = [5, 2];

    this.selectionGroup = new Group();
    this.selectionGroupControl = new ControlRect(this.selectionGroup);
  }

  onMouseDown(event) {
    let point = event.point;

    this.items.unselect();

    if (this.pointOnElement(point)) {
      this.target.selected = true;
      this.selectionGroup.children = [this.target];
      this.layer.append(this.selectionGroupControl);
      return;
    }

    if (!(this.pointOnPoint(point) || this.pointOnResize(point))) {
      this.mode = 'select';
      this.selectionRect.startPoint = point;
      this.selectionRect.endPoint =  point;
      this.layer.items.add(this.selectionRect);
    }
  }

  onMouseUp(event) {
    this.selectionRect.remove();
    this.mode = 'move';
  }

  onMouseDrag(event) {
    let point = event.point;
    if (this.mode === 'mutate') {
      this.targetPoint.assign(point);
    } if (this.mode === 'select') {

      this.selectionRect.endPoint = point;

      let selected = this.items.filter(
        item => item.selected = this.selectionRect.bounds.containsRectangle(item.bounds)
      );

      if (!selected.length) return;

      if (selected.diff(lastSelected)) {
        this.selectionGroup.children = selected;
        lastSelected = selected;
      }

    } else if (this.mode === 'resize') {

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
      this.target.translate(event.delta);
    }
  }

  pointOnElement(point) {
    let item;
    for (let len = this.items.length, i = len; i > 0; i--) { // find from right
      item = this.items[i - 1];
      if (item.containsPoint(point)) {
        this.layer.setCursor('pointer');
        this.mode = 'move';

        this.target = item;
        return true;
      }
    }
    return false;
  }

  pointOnPoint(point) {
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
      this.layer.setCursor('pointer');
      this.target = seg.owner;
      this.targetPoint = nearbyPoint;
      return true
    }
    return false;
  }

  pointOnResize(point) {
    let corner, bounds;
    // for (let i = 0; i < this.items.length; i++) {
    //   bounds = this.items.get(i).bounds;
    //   if (corner = boundsPoi.find(key => point.nearby(bounds[key]))) break;
    // }

    bounds = this.selectionGroup.bounds;
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

  onMouseMove({ point }) {
    if (!(this.pointOnPoint(point) || this.pointOnResize(point) || this.pointOnElement(point))) {
      this.mode = 'select';
    }
  }

}
