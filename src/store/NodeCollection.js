class NodeCollection extends Array {

  static diff(left, right) {
    if (left.length !== right.length) return true;

    for (let i = 0, len = left.length; i < len; i++) {
      if (left[i].id !== right[i].id) return true;
    }
    return false;
  }

  constructor(){
    super(arguments)
  }
  
  add(item) {
    this.push(item);
  }

  selectAll() {
    this.forEach(item => item.path.selected = true);
  }

  antiSelectAll() {
    this.forEach(item => item.path.selected = !item.path.selected);
  }

  deselectAll() {
    this.forEach(item => item.path.selected = false);
  }

  deleteSelect(){
    let deletedItems = new NodeCollection;
    // this = this.filter(item => {
    //   if (item.path.selected !== true) return true;

    //   deletedItems.push(item.hash);
    //   item.remove();
    //   return false;
    // });
    return deletedItems;
  }

  delete(ids) {
    if (!Array.isArray(ids)) ids = [ids];

    // this = this.filter(item => {
    //   if (!includes(ids, item.id)) return true;

    //   item.remove();
    //   return false;
    // });
  }
}