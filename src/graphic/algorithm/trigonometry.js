
function getAngleXAxis(x, y){
  let radian = Math.atan2(y, x);
  if(radian<0) return radian+ 2*Math.PI;
  return radian;
}

export function getAngle(){
  let cp = new Point(0, 0);
  let sp = new Point(0, 200);
  let ep = new Point(-300, 300);


  let disCS = cp.getDistance(sp);
  let disCE = cp.getDistance(ep);
  let disSE = sp.getDistance(ep);

  let resultRadian = Math.acos(((Math.pow(disCS, 2)) + (Math.pow(disCE, 2)) - (Math.pow(disSE, 2))) / (2 * disCS * disCE));

  //angle in degrees
  let resultDegree = resultRadian * 180 / Math.PI;

  return resultDegree;

}

export function getAngle2(){
  let cp = new Point(0, 0);
  let sp = new Point(0, 200);
  let ep = new Point(-300, 300 + i);

  return getAngleXAxis((ep.x - cp.x)/(ep.y-cp.y)) - getAngleXAxis(Math.atan2(sp.x - cp.x, sp.y-cp.y));
}
