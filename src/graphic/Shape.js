import Element from './Element';
import Point from '../types/Point';
import Rect from '../types/Rect';

/**
 * The base class of shapes that build with start-point & end-point.
 */
export default class Shape extends Element {

  constructor(sp, ep) {
    super();
    this.startPoint = sp;
    this.endPoint = ep;
  }

  get bounds() {

  }

}