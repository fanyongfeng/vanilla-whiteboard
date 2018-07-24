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
}