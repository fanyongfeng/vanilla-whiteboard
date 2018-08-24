/**
 * enable tool has select behavior.
 */
export default {
  onMouseDown(event) {
    let point = event.point;

    this.layer.items.set(this.transformGroup);

    if (this.pointOnElement(point)) {
      if(this.target.selected) return;
      this.items.unselect();
      this.target.selected = true;
      this.transformGroup.children = [this.target];
      return;
    }
  },

  onMouseDrag(event) {
    let point = event.point;
    if (this.mode === 'select') {

      this.selectAreaRect.endPoint = point;

      let selected = this.items.filter(
        item => item.selected = this.selectAreaRect.bounds.containsRect(item.bounds)
      );

      if (!selected.length) return;

      if (ItemCollection.diff(selected, lastSelected)) {
        this.transformGroup.children = selected;
        lastSelected = selected;
      }

    }
  },

  pointOnElement = function (point) {
    let item;
    for (let len = this.items.length, i = len; i > 0; i--) { // find from right
      item = this.items.get(i - 1);
      if (item.containsPoint(point)) {
        this.setCursor('pointer');
        this.mode = 'move';
        this.target = item;
        return true;
      }
    }
    return false;
  }
}
