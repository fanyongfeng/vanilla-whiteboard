
import throttle from '../util/throttle';

/**
 * decorator version of throttle
 */
export function throttle() {
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
