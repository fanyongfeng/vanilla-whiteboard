import Element from "../Element"
import Point from "../../types/Point"
import fitCurve from "../../util/fitCurve";

import Path from "../../types/Path"

/**
 * Shapes create by: pen, marker, highlighter, etc.
 */
export default class Writing extends Element {
  static instantiate(segments) {
    let ins = new Writing;
    ins.path = Path.instantiate(segments);;
    return ins;
  }

  type = 'writing';
  points = [];

  buildPath(){}

  curveTo(point){

  }

  _drawSegment(p1, p2){

  }
}