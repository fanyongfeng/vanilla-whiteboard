function assign(target, frm) {
  return Object.assign(target, frm);
};

/**
 * Mixins an object into the classes prototype.
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
 */
export function mixin(...srcs) {
  return ((target) => {
    assign(target.prototype, ...srcs);
    return target;
  });
}
export default mixin;
