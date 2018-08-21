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
        if (this.layer) {
          this.layer.markAsDirty();
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

const noop = function () { }

const validateFunc = function validateFunc(type, key) {
  if (type === Boolean) {
    return function (val) {
      if (typeof val !== 'boolean') throw new TypeError(`setter '${key}' accept boolean value!`);
    }
  } else if (type === String) {
    return function (val) {
      if (typeof val !== 'string') throw new TypeError(`setter '${key}' accept string value!`);
    }
  } else if (type === Number) {
    return function (val) {
      if (typeof val !== 'number') throw new TypeError(`setter '${key}' accept number value!`);
    }
  } else {
    return function (val) {
      if (!val instanceof type) throw new TypeError(`setter '${key}' accept ${type.name} value!`);
    }
  }

  //return noop;
}

/**
 * Inject observe props for class.
 *
 * @param {Object} desc
 *
 * {
 *  selected: {
 *    type: Boolean,
 *    default: true,
 *    fn:
 *  }
 * }
 */
export function observeProps(desc) {
  if (!Object.keys(desc).length)
    throw new Error('must pass props!');

  return function (target) {
    for (let key in desc) {
      if (typeof target.prototype[key] !== 'undefined')
        throw new Error(`Prop ${key} already exist!`);

      let propDesc = desc[key];
      let privateKey = Symbol(`_${key}`);

      target.prototype[privateKey] = propDesc.default;

      let checkParam = validateFunc(propDesc.type, key);

      Object.defineProperty(target.prototype, key, {
        get() {
          return this[privateKey];
        },
        set(val) {
          //TODO: check params.
          checkParam(val);
          if (val === this[privateKey]) return;

          this[privateKey] = val;
          if (this.layer) {
            this.layer.markAsDirty();
          }
        },
        enumerable: true,
        configurable: true,
      });
    }
  }
}
