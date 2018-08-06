import Point from './Point';
import Rect from './Rect';
import fitCurve from '../util/fitCurve';
import smoothCurve from '../util/smoothCurve';
import { Segment, LineSegment, BezierSegment, MoveSegment, QuadraticSegment, ArcSegment } from './Segment';
import memoized from '../decorators/memoized'

/**
 * @class A compound path is a complex path that is made up of one or more
 * simple sub-paths. It can have the `nonzero` fill rule, or the `evenodd` rule
 * applied. Both rules use mathematical equations to determine if any region is
 * outside or inside the final shape. The `evenodd` rule is more predictable:
 * Every other region within a such a compound path is a hole, regardless of
 * path direction.
 */
class CompoundPath{
    _children = [];
    constructor(){

    }

    get children(){

    }

    draw(){

    }
}

export default CompoundPath；