let items = [];

const includes = function includes(arr, item){

}

window.items = items;

export default {
  /**
   * add instances
   */
  add(instance) {
    items.push(instance);
  },

  get items() {
    return items;
  },

  create(hash) {

  },

  /**
   * delete by ids
   */
  delete(ids) {
    if (!Array.isArray(ids)) ids = [ids];

    items = items.filter(item => {
      if (includes(ids, item.id)) {
        item.remove();
        return false;
      }
      return true;
    });
  },

  diff(leftList, rightList) {
    if (leftList.length !== rightList.length) return true;

    for (let i = 0, len = leftList.length; i < len; i++) {
      if (leftList[i].id !== rightList[i].id) return true;
    }
    return false;
  },

  selectAll() {
    items.forEach(item => item.path.selected = true);
  },

  antiSelectAll(id) {
    items.forEach(item => item.path.selected = !item.path.selected);
  },

  deselectAll(id) {
    items.forEach(item => item.path.selected = false);
  },

  /**
   * delete selected items and return hash
   */
  deleteSelect(){
    let deletedItems = [];
    items = items.filter(item => {
      if (item.path.selected === true) {
        deletedItems.push(item.hash);
        item.remove();
        return false;
      }
      return true;
    });
    this.removeHelper();
    return deletedItems;
  },
}