
import { boundsPoi } from '../algorithm/corner';
import Point from '../types/Point';
import Item from '../Item';

const POINT_WIDTH = 4;
const OFFSET = POINT_WIDTH / 2;
const fillStyle = "#009dec";
const strokeStyle = '#96cef6';
/**
 * 拖动缩放的辅助框
 * simple axes
 */
export default class ControlRect extends Item {

  draw(ctx, bounds){
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = 1;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    // 设置上一个点为最后一个点

    let lastPoint = bounds[boundsPoi[boundsPoi.length - 1]], point;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    boundsPoi.forEach(key => {
      point = bounds[key];
      ctx.lineTo(point.x, point.y);
      ctx.fillRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
      lastPoint = point;
    })

    if(this.showRotate) {
      let tc = bounds['topCenter'];
      ctx.moveTo(tc.x, tc.y);
      point = tc.add(new Point(0, -50));
      ctx.lineTo(point.x, point.y);
      ctx.fillRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
    }

    ctx.stroke();
    ctx.restore();
  }
}