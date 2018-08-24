
import Image from '../graphic/shape/Image';

export default class MaterialProvider {
  cached = {};
  preload = 1;
  _length = 0;

  /**
   * Init MaterialProvider with image src list. order-sensitive
   * @param {Array} images
   * @param {Object} options
   */
  constructor(images, options = {}){
    if(!images) return;

    for(let url of images) {
      let material = new Image({},url);
      if(this._length < this.preload)
        material.loadImage();
      this._length++;
      this.cached[url] = material;;
    }
  }

  /**
   * get material image.
   * @param {String} url
   */
  get(url){
    let cached = this.cached;
    if(cached[url]) return cached[url];
    let material = new Image({},url);
    this._length++;
    return cached[url] = material;;
  }

  /**
   * remove material image.
   * @param {String} url
   */
  remove(url) {
    let img = this.cached[url];
    delete this.cached[url];
    this._length--;
    return img;
  }

  get length() { return this._length; }
}
