/**
 * enable tool has select behavior.
 */
export default function selectable(multiSelect = true) {
  return {
    _downPoint: null,
    _lastSelected: [],
    _selected: [],

    onMouseDown(event) {
      this._downPoint = event.point;

      if (this._pointOnElement(this._downPoint)) {
        this.mode = 'move';
        if (this.target.selected) return false;
        this.items.unselect();
        this.target.selected = true;
        this._selected = [this.target];
        return true;
      }
      this.mode = 'select';
      return true;
    },

    onMouseDrag(event) {
      if (this.mode !== 'select') return;

      let point = event.point;
      this.dragRect.endPoint = point;
      this._selected = this.items.filter(item => (item.selected = this.dragRect.bounds.containsRect(item.bounds)));
    },

    onMouseMove({ point }) {
      let isPointOnElement = this._pointOnElement(point);
      if (isPointOnElement) {
        let { target } = this;
        target.emit('hover', { target });
      }
      return !isPointOnElement;
    },

    _pointOnElement(point) {
      for (let len = this.items.length, i = len, item; i > 0; i--) {
        // find from right
        item = this.items.get(i - 1);
        if (item.containsPoint(point)) {
          this.target = item;
          this.setLayerCursor('pointer');
          return true;
        }
      }
      return false;
    },
  };
}
