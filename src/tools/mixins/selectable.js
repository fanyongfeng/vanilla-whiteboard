
import ItemCollection  from '../../Whiteboard/ItemCollection';

/**
 * enable tool has select behavior.
 */
export default function selectable(){
  return {
    _downPoint: null,
    _lastSelected: [],
    _selected: [],

    onMouseDown(event) {
      this._downPoint = event.point;

      if (this._pointOnElement(this._downPoint)) {
        if(this.target.selected) return;
        this.items.unselect();
        this.target.selected = true;
        this._selected = [this.target];
        return false;
      }
      this.mode = 'select';
    },

    onMouseDrag(event) {
      if (this.mode !== 'select')  return;

      let point = event.point;
      this.dragRect.endPoint = point;
      this._selected = this.items.filter(
        item => item.selected = this.dragRect.bounds.containsRect(item.bounds)
      );
    },

    onMouseMove({ point }) {
      this._pointOnElement(point);
    },

    _pointOnElement(point) {
      for (let len = this.items.length, i = len, item; i > 0; i--) { // find from right
        item = this.items.get(i - 1);
        if (item.containsPoint(point)) {
          this.mode = 'move';
          this.target = item;
          if(!(this.cursor && typeof this.cursor !== 'string')) {
            this.layer.setCursor('pointer');
          }
          return true;
        }
      }
      return false;
    }
  }
}

