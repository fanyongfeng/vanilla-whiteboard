/**
 * Helpers & alias of Math.
 */

/** Represents an arbitrary very small number. epsilon2, epsilon3*/
export const epsilon = 1e-6;
export const epsilon2 = 1e-12;
export const epsilon3 = Number.EPSILON; //2.2204460492503130808472633361816E-16
export const pi = Math.PI;
export const halfPi = pi / 2;
export const quarterPi = pi / 4;
export const tau = pi * 2;

export const degrees = 180 / pi;
export const radians = pi / 180;

export const abs = Math.abs;
export const atan = Math.atan;
export const atan2 = Math.atan2;
export const cos = Math.cos;
export const ceil = Math.ceil;
export const exp = Math.exp;
export const floor = Math.floor;
export const log = Math.log;
export const pow = Math.pow;
export const sin = Math.sin;
export const sign =
  Math.sign ||
  function(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  };
export const sqrt = Math.sqrt;
export const tan = Math.tan;
export const max = Math.max;
export const min = Math.min;

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

export function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

export function haversin(x) {
  x = sin(x / 2);
  return x * x;
}

export function isZero(val) {
  return val >= -epsilon2 && val <= epsilon2;
}

export function random(min, max) {
  if (typeof min === 'undefined') {
    max = 1;
    min = 0;
  } else if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }
  return min === max ? min : Math.random() * (max - min) + min;
}

export function sum(array) {
  let result;

  for (const value of array) {
    if (value !== undefined) {
      result = result === undefined ? value : result + value;
    }
  }
  return result;
}

export function mean(array) {
  let len = array.length;
  return sum(array) / len;
}
