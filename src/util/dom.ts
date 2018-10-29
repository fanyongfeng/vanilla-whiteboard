//Dom helpers

/**
 *
 * @param {*} element
 * @param {*} styles
 */
export function setStyle(element: HTMLElement, styles: object) {
  const elementStyle = element.style;
  if (!elementStyle) {
    return element;
  }

  for (let property in styles) {
    let normalizedProperty =
      property === 'float' || property === 'cssFloat'
      //@ts-ignore
        ? typeof elementStyle.styleFloat === 'undefined'
          ? 'cssFloat'
          : 'styleFloat'
        : property;
    elementStyle[normalizedProperty] = styles[property];
  }
  return element;
}

/**
 * Remove listeners to element.
 * @param {DomElement} element
 * @param {String} eventType, e.g. "mousemove", "mousemove mousedown"
 * @param {Function} handler
 */
export function addListener(element: EventTarget, eventType: string, handler: (event: any) => any) {
  if (!element) return;

  let events = eventType.split(' ');
  if (events.length > 1) {
    for (let i = 0; i < events.length; i++) {
      addListener(element, events[i], handler);
    }
    return;
  }

  if (element.addEventListener) {
    element.addEventListener(eventType, handler, false);
    //@ts-ignore
  } else if (element.attachEvent) {
    //@ts-ignore
    element.attachEvent('on' + eventType, handler);
  } else {
    element['on' + eventType] = handler;
  }
}

/**
 * Remove listeners from element.
 * @param {DomElement} element
 * @param {String} eventType, e.g. "mousemove", "mousemove mousedown"
 * @param {Function} handler
 */
export function removeListener(element: EventTarget, eventType: string, handler: (event: any) => any) {
  if (!element) return;

  let events = eventType.split(' ');
  if (events.length > 1) {
    for (let i = 0; i < events.length; i++) {
      removeListener(element, events[i], handler);
    }
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(eventType, handler, false);
    //@ts-ignore
  } else if (element.detachEvent) {
    //@ts-ignore
    element.detachEvent('on' + eventType, handler);
  } else {
    element['on' + eventType] = null;
  }
}
