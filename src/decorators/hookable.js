/**
 * Make Class support 'on', 'emit'
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

  target.prototype.off = function() {

  }

  target.prototype.once = function(name, fn) {
    return this.on(name, function() {
        fn.apply(this, arguments);
        this.off(name, fn);
    });
  }

  target.prototype.emit = function(name) {
    if (!this.__callbacks[name]) return;

    let args = [];
    let len = arguments.length;
    for (let i = 1; i < len; i++) {
      args.push(arguments[i]);
    }

    // this.__callbacks[name].forEach((fn) => {
    //   fn.apply(this, args);
    // })

    if (this.__callbacks[name].apply(this, args) === false) {
      // If the handler returns false, prevent the default behavior
      // and stop propagation of the event by calling stop()
        if (event && event.stop)
            event.stop();
        // Stop propagation right now!
        // break;
    }
  };
}
