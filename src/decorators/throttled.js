import throttle from '../util/throttle';

/**
 * decorator version of throttle
 */
export default function throttled() {
  return function(target, name, descriptor) {
    if (typeof descriptor.set !== 'function') throw new Error(`Can't decorate ${name}, Only used for setter~`);

    const { set } = descriptor;
    descriptor.set = function() {
      return throttle(set).apply(this, arguments);
    };
    return descriptor;
  };
}
