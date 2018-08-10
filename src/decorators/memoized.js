
/**
 * mark getter as memoizable, the value is cached till the instance mark as dirty,
 * @param {String} dirtyCheckKey
 */
export default function memoized(dirtyCheckKey) {

  dirtyCheckKey = dirtyCheckKey || '__is_dirty'

  return function(target, name, descriptor){

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

export function memoizable(){

  return function(target){

    target.prototype.__cachedProps  =[];

    target.prototype.getMemoized = function() {
      return this.__cachedProps;
    }

    return target;
  }
}
