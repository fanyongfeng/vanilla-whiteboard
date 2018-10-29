const cachedPropsKey = '__cachedProps';

/**
 * mark getter as memoized prop, the value is cached till the instance mark as dirty,
 * @param {String} cacheKey, Specify the cacheKey of prop (default value: PropName)
 */
export function memoized(cacheKey?: string): MethodDecorator {
  return function(_, name, descriptor) {
    if (typeof descriptor.get !== 'function') throw new Error(`Can't decorate ${String(name)}, Only used for getter~`);

    let propKey = cacheKey || `${String(name)}`;
    const { get } = descriptor;

    descriptor.get = function() {
      let cacheProps = this[cachedPropsKey];
      if (typeof cacheProps[propKey] !== 'undefined') return cacheProps[propKey];
      cacheProps[propKey] = get.apply(this);
      return cacheProps[propKey];
    };

    return descriptor;
  };
}

/**
 * mark setter. if the value changed, it will trigger canvas refresh OR mark layer as dirty.
 */
export function changed(): MethodDecorator {
  return function(_, name, descriptor) {
    if (typeof descriptor.set !== 'function') throw new Error(`Can't decorate ${String(name)}, Only used for setter~`);

    const { set } = descriptor;
    descriptor.set = function() {
      //@ts-ignore
      this.changed();
      return set.apply(this, arguments);
    };

    return descriptor;
  };
}

/**
 * Mark class as memoizable, It will inject prop:'cachedProps' and method:'changed' in prototype:
 *
 * cachedProps: will cache the complex compute prop. And it will be cleared the changed invoked.
 * changed: Notify the layer to refresh.
 *
 */
export function memoizable(): ClassDecorator {
  return function(target) {
    if (typeof target.prototype.changed === 'function') throw new Error(`can't decorate memoizable twice!`);

    // _cachedProps list.
    target.prototype[cachedPropsKey] = {};

    /**
     * mark the item instance as 'dirty', it will trigger canvas refresh and re-calc the memozied props.
     */
    target.prototype.changed = function() {
      if (this.layer && this.layer.markAsDirty) {
        this.layer.markAsDirty();
      }
      this[cachedPropsKey] = {};
    };

    return target;
  };
}

const validateFunc = function validateFunc(type: any, key: string) {
  switch (type) {
    case Boolean:
      return function(val: any) {
        if (typeof val !== 'boolean') throw new TypeError(`setter '${key}' accept boolean value!`);
      };
    case String:
      return function (val: any) {
        if (typeof val !== 'string') throw new TypeError(`setter '${key}' accept string value!`);
      };
    case Number:
      return function (val: any) {
        if (typeof val !== 'number') throw new TypeError(`setter '${key}' accept number value!`);
      };
    default:
      return function (val: any) {
        if (!(val instanceof type)) throw new TypeError(`setter '${key}' accept ${type.name} value!`);
      };
  }
};

/**
 * Inject observe props for class.
 *
 * @param {Object} desc
 *
 * Code Example:
 *  {
 *    selected: { // Name of prop, (In example 'selected')
 *      type: Boolean, // Type of prop
 *      default: true, // Default value of prop
 *      fn: function(newVal) { //callback when prop changed.
 *        console.log(this)
 *      }
 *    }
 *  }
 */
export function observeProps(desc: object): ClassDecorator {
  if (!Object.keys(desc).length) throw new TypeError('must pass props!');

  return function(target) {
    for (let key in desc) {
      if (typeof target.prototype[key] !== 'undefined') {
        throw new Error(`Prop ${key} already exist!`);
      }

      let propDesc = desc[key];
      let privateKey = `__${key}`;

      target.prototype[privateKey] = propDesc.default;

      let checkParam = validateFunc(propDesc.type, key);
      let fn = propDesc.fn;

      Object.defineProperty(target.prototype, key, {
        get() {
          return this[privateKey];
        },
        set(val) {
          checkParam(val);
          // if not changed, do nothing.
          if (val === this[privateKey]) return;

          this[privateKey] = val;
          fn && fn.call(this, val);
          this.changed();
        },
        enumerable: true,
        configurable: true,
      });
    }
  };
}
