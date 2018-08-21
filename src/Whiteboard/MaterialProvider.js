
import Image from '../graphic/shape/Image';

export default class MaterialProvider {
  cached = {};
  constructor(options){}
  createMaterial(url){
    let cached = this.cached;
    if(cached[url]) return cached[url];
    let material = new Image({},url);
    return cached[url] = material;;
  }
}
