export default class Size {

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  /**
   * Returns a copy of the size.
   */
  clone() {
    return new Size(this.width, this.height);
  }

  /**
   * @return {String} a string representation of the size
   */
  toString() {
    return '{ width: ' + this.width
      + ', height: ' + this.height + ' }';
  }
}