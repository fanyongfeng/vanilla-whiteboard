import Img from '../graphic/shape/Image';

interface ICached {
  [url: string]: Img
}
/**
 * Manage & cache materials of whiteboard.
 */
export default class MaterialProvider {
  private cached: ICached = {};
  private preload = 1;
  private length = 0;

  /**
   * Init MaterialProvider with image src list. order-sensitive
   * @param {Array} images
   * @param {Object} options
   */
  constructor(images?: string[]) {
    if (!images) return;

    for (let url of images) {
      let material = new Img({}, url);
      if (this.length < this.preload) material.loadImage();
      this.length++;
      this.cached[url] = material;
    }
  }

  /**
   * Get material image by url.
   * @param url
   */
  get(url: string): Img {
    let cached = this.cached;
    if (cached[url]) return cached[url];
    let material = new Img({}, url);
    this.length++;
    cached[url] = material;
    return cached[url];
  }

  /**
   * Remove material image by url.
   * @param {String} url
   */
  remove(url: string): Img  {
    let img = this.cached[url];
    delete this.cached[url];
    this.length--;
    return img;
  }

  clear() {
    this.cached = {};
  }

}
