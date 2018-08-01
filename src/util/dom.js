/**
 * Dom helpers
 */

export const setStyle = (element, styles) => {

  let elementStyle = element.style;
  if (!elementStyle) {
    return element;
  }

  for (let property in styles) {

    let normalizedProperty = (property === 'float' || property === 'cssFloat')
      ? (typeof elementStyle.styleFloat === 'undefined' ? 'cssFloat' : 'styleFloat')
      : property;
    elementStyle[normalizedProperty] = styles[property];
  }
  return element;
}