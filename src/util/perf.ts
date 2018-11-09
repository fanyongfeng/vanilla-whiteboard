export let mark: (tag: string) => void;
export let measure: (name: string, startTag?: string, endTag?: string) => void;

/**
 * performance API of browser.
 */
if (process.env.NODE_ENV !== 'production') {
  const perf = window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = tag => perf.mark(tag);
    measure = (name: string, startTag?: string, endTag?: string) => {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}
