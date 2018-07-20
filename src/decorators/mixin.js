//https://github.com/steelsojka/lodash-decorators#example-3

function assign() {};

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
export function Mixin(...srcs) {
  return ((target) => {
    assign(target.prototype, ...srcs);
    return target;
  });
}
export default Mixin;
