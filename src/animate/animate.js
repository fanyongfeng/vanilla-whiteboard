let requestAnimationFrame =
  (typeof window !== 'undefined' &&
    ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window)) ||
      (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window)) ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame)) ||
  function(fn) {
    return setTimeout(fn, 16);
  };
let noop = () => {};
let cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;

/**
 * Changes value from one to another within certain period of time, invoking callbacks as value is being changed.
 * @memberOf nebula
 * @param {Object} [options] Animation options
 * @param {Function} [options.onChange] Callback; invoked on every value change
 * @param {Function} [options.onComplete] Callback; invoked when value change is completed
 * @param {Number} [options.startValue=0] Starting value
 * @param {Number} [options.endValue=100] Ending value
 * @param {Number} [options.byValue=100] Value to modify the property by
 * @param {Function} [options.easing] Easing function
 * @param {Number} [options.duration=500] Duration of change (in ms)
 */
function animate(options) {
  requestAnimationFrame(function(timestamp) {
    options || (options = {});

    let start = timestamp || +new Date(),
      duration = options.duration || 500,
      finish = start + duration,
      time,
      onChange = options.onChange || noop,
      abort = options.abort || noop,
      onComplete = options.onComplete || noop,
      easing =
        options.easing ||
        function(k) {
          return k;
        },
      startValue = 'startValue' in options ? options.startValue : 0,
      endValue = 'endValue' in options ? options.endValue : 100,
      byValue = options.byValue || endValue - startValue;

    options.onStart && options.onStart();

    (function tick(ticktime) {
      if (abort()) {
        onComplete(endValue, 1, 1);
        return;
      }
      time = ticktime || +new Date();
      let currentTime = time > finish ? duration : time - start,
        timePerc = currentTime / duration,
        current = easing(currentTime / duration) * byValue + startValue,
        valuePerc = Math.abs((current - startValue) / byValue);

      onChange(current, valuePerc, timePerc);
      if (time > finish) {
        options.onComplete && options.onComplete();
        return;
      }

      requestAnimationFrame(tick);
    })(start);
  });
}

export default animate;
export { cancelAnimationFrame };
