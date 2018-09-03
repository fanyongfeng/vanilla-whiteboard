function assign(target, frm) {
  return Object.assign(target, frm);
}

/**
 * Mixins an object into the classes prototype.
 *
 * @export
 * @param {...Object[]} srcs
 * @returns {ClassDecorator}
 * @example
 *
 * const myMixin = {
 *   blorg: () => 'blorg!'
 * }
 *
 * @Mixin(myMixin)
 * class MyClass {}
 *
 * const myClass = new MyClass();
 *
 * myClass.blorg(); // => 'blorg!'
 *
 */
export function mixin(...srcs) {
  return target => {
    assign(target.prototype, ...srcs);
    return target;
  };
}

/**
 * 组合两个function
 * @param {Object} proto, prototype of class.
 * @param {*} name 名字
 * @param {*} fn 带绑定的function
 */
const combineToProto = function combineFunc(proto, name, fn) {
  let origin = proto[name];
  if (typeof origin === 'undefined') {
    proto[name] = fn;
    return fn;
  }
  if (typeof origin !== 'function') throw new TypeError(`${name} already exist!`);

  proto[name] = function() {
    //call origin function first,
    if (origin.apply(this, arguments) !== false) {
      // cancel second fn call, if origin function return 'false'.
      return fn.apply(this, arguments);
    }
    return false;
  };
  return proto[name];
};

/**
 * Deep mixins an object into the classes prototype.
 * @param  {...any} srcs
 */
export function deepMixin(srcs) {
  return target => {
    for (let key in srcs) {
      let descriptor = Object.getOwnPropertyDescriptor(srcs, key);
      if (typeof descriptor.value === 'function') {
        // if is function, combine with old function.
        combineToProto(target.prototype, key, descriptor.value);
      } else if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
        if (process.env.NODE_ENV === 'development') {
          target.prototype[key] && console.warn(`${target.name}.${key} already exist!`);
        }
        // if is getter & setter, set descriptor to prototype.
        Object.defineProperty(target.prototype, key, descriptor);
      } else {
        if (process.env.NODE_ENV === 'development') {
          target.prototype[key] && console.warn(`${target.name}.${key} already exist!`);
        }
        // if is other types, just overwrite
        target.prototype[key] = descriptor.value;
      }
    }
    return target;
  };
}

/**
 *
 * Mixins property into the classes prototype.
 * @param {Map} props
 */
export function mixinProps(props) {
  //Object.defineProperty
  return target => {
    for (let key in props) {
      Object.defineProperty(target.prototype, key, props[key]);
    }
    return target;
  };
}

export default mixin;
