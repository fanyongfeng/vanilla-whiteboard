const dirtyCheckKey = '__is_dirty';
const privateKey = Symbol(dirtyCheckKey);

/**
 * mark getter as memoized prop, the value is cached till the instance mark as dirty,
 * @param {String} dirtyCheckKey
 */
export function memoized(cacheKey) {

  return function (target, name, descriptor) {

    if (typeof descriptor.get !== 'function')
      throw new Error(`Can't decorate ${name}, Only used for getter~`);

    cacheKey = cacheKey || `__cache__${name}`;
    target[cacheKey] = null;
    const { get } = descriptor;

    descriptor.get = function () {
      if (this[cacheKey] && !this[dirtyCheckKey]) return this[cacheKey];
      this[dirtyCheckKey] = false;
      return this[cacheKey] = get.apply(this);
    }

    return descriptor;
  }
}

/**
 * mark setter. if the value changed, it will trigger canvas refresh OR mark layer as dirty.
 */
export function changed() {
  return function (target, name, descriptor) {
    if (typeof descriptor.set !== 'function')
      throw new Error(`Can't decorate ${name}, Only used for setter~`);

    const { set } = descriptor;
    descriptor.set = function () {
      this.markAsDirty();
      return set.apply(this, arguments);
    }

    return descriptor;
  }
}

/**
 * Mark class as memoizable, It will inject prop '__is_dirty' in  prototype,
 * if this.__is_dirty === true, notify the item-collection.
 */
export function memoizable() {

  return function (target) {

    if (typeof target.prototype.markAsDirty === 'function')
      throw new Error(`can't decorate memoizable twice!`);

    target.prototype.__cachedProps = [];

    Object.defineProperty(target.prototype, dirtyCheckKey, {
      get() {
        return this[privateKey];
      },
      set(val) {
        if (this.owner) {
          this.owner.markAsDirty();
        }
        this[privateKey] = val;
        return this;
      },
      enumerable: true,
      configurable: true,
    });

    /**
     * mark the item instance as 'dirty', it will trigger canvas refresh and re-calc the memozied props.
     */
    target.prototype.markAsDirty = function () {
      this[dirtyCheckKey] = true;
    }

    return target;
  }
}
