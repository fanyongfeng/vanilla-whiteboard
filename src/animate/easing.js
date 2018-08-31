/**
 * Adapt from  https://github.com/sole/tween.js/blob/master/src/Tween.js
 * @see http://sole.github.io/tween.js/examples/03_graphs.html
 */
const easing = {
  /**
   * @param {number} k
   * @return {number}
   */
  linear(k) {
    return k;
  },

  /**
   * @param {number} k
   * @return {number}
   */
  quadraticIn(k) {
    return k * k;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quadraticOut(k) {
    return k * (2 - k);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  },

  // 三次方的缓动（t^3）
  /**
   * @param {number} k
   * @return {number}
   */
  cubicIn(k) {
    return k * k * k;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  cubicOut(k) {
    return --k * k * k + 1;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  },

  // 四次方的缓动（t^4）
  /**
   * @param {number} k
   * @return {number}
   */
  quarticIn(k) {
    return k * k * k * k;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quarticOut(k) {
    return 1 - --k * k * k * k;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quarticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  },

  // 五次方的缓动（t^5）
  /**
   * @param {number} k
   * @return {number}
   */
  quinticIn(k) {
    return k * k * k * k * k;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quinticOut(k) {
    return --k * k * k * k * k + 1;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  quinticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },

  // 正弦曲线的缓动（sin(t)）
  /**
   * @param {number} k
   * @return {number}
   */
  sinusoidalIn(k) {
    return 1 - Math.cos((k * Math.PI) / 2);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  sinusoidalOut(k) {
    return Math.sin((k * Math.PI) / 2);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },

  // 指数曲线的缓动（2^t）
  /**
   * @param {number} k
   * @return {number}
   */
  exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  exponentialInOut(k) {
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },

  // 圆形曲线的缓动（sqrt(1-t^2)）
  /**
   * @param {number} k
   * @return {number}
   */
  circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  circularOut(k) {
    return Math.sqrt(1 - --k * k);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  circularInOut(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },

  // 创建类似于弹簧在停止前来回振荡的动画
  /**
   * @param {number} k
   * @return {number}
   */
  elasticIn(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
  },
  /**
   * @param {number} k
   * @return {number}
   */
  elasticOut(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    }
    return a * Math.pow(2, -10 * k) * Math.sin(((k - s) * (2 * Math.PI)) / p) + 1;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  elasticInOut(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1;
  },

  // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
  /**
   * @param {number} k
   * @return {number}
   */
  backIn(k) {
    let s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  backOut(k) {
    let s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  },
  /**
   * @param {number} k
   * @return {number}
   */
  backInOut(k) {
    let s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },

  /**
   * @param {number} k
   * @return {number}
   */
  bounceIn(k) {
    return 1 - easing.bounceOut(1 - k);
  },
  /**
   * @param {number} k
   * @return {number}
   */
  bounceOut(k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },
  /**
   * @param {number} k
   * @return {number}
   */
  bounceInOut(k) {
    if (k < 0.5) {
      return easing.bounceIn(k * 2) * 0.5;
    }
    return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  },
};

export default easing;
