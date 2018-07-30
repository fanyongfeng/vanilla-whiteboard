import Element from "../Element"
import Point from "../../types/Point"

/**
 * Shapes create by: pen, marker, highlighter, etc.
 */
export default class Writing extends Element {

  type = 'writing';
  points = []

  buildPath(){}

  curveTo(point){

  }

  _drawSegment(p1, p2){

  }
}