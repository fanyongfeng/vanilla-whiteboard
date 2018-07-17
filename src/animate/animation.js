
let requestAnimationFrame = (
  typeof window !== 'undefined'
  && (
    (window.requestAnimationFrame && window.requestAnimationFrame.bind(window))
    // https://github.com/ecomfe/zrender/issues/189#issuecomment-224919809
    || (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window))
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
  )
) || function (fn) {
  return setTimeout(fn, 16);
};

function tick(ticktime) {
  if (abort()) {
    onComplete(endValue, 1, 1);
    return;
  }
  time = ticktime || +new Date();
  var currentTime = time > finish ? duration : (time - start),
    timePercent = currentTime / duration,
    current = easing(currentTime, startValue, byValue, duration),
    valuePercent = Math.abs((current - startValue) / byValue);
  onChange(current, valuePercent, timePercent);
  if (time > finish) {
    options.onComplete && options.onComplete();
    return;
  }
  requestAnimFrame(tick);
};

export function animate(options) {

  let start = +new Date();
  requestAnimFrame(() => {
    tick(start);
  });
}