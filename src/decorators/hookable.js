/**
 * Make Class support 'on', 'fire'
 */
export default function hookable(target) {
  
  target.prototype.__callbacks = {};

  target.prototype.on = function(name, fn) {
    if (typeof name !== 'string' || typeof fn !== 'function') throw new Error('Arguments illegal!');

    // if (!this.__callbacks[name]) this.__callbacks[name] = [];
    // this.__callbacks[name].push(fn)
    if (!this.__callbacks[name]) this.__callbacks[name] = {};
    this.__callbacks[name] = fn;

    return this;
  };

  target.prototype.fire = function(name) {
    if (!this.__callbacks[name]) return;

    let args = [];
    let len = arguments.length;
    for (let i = 1; i < len; i++) {
      args.push(arguments[i]);
    }

    // this.__callbacks[name].forEach((fn) => {
    //   fn.apply(this, args);
    // })
    this.__callbacks[name].apply(this, args);
  };
}
