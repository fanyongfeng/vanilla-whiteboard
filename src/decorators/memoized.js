
export default function memoized(dirtyCheckKey) {

  dirtyCheckKey = dirtyCheckKey || '__is_dirty'

  return function(target, name, descriptor){
    console.log(target, name, descriptor);
    if(typeof descriptor.get !== 'function') throw new Error(`Can't decorate ${name}, Only used for getter~`);
  
    const cacheKey = `__cache__${name}`;
    target[cacheKey] = null;
  
    const {get} = descriptor;
    descriptor.get = function(){
      if(this[cacheKey] && !this[dirtyCheckKey]) return this[cacheKey];
      this[dirtyCheckKey] = false;
      return this[cacheKey] = get.apply(this);
    }
  
    return descriptor;
  }
}