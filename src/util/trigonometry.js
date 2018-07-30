
function getAngleXAxis(x, y){
  var radian = Math.atan2(y, x); 
  if(radian<0) return radian+ 2*Math.PI; 
  return radian;
}

export function getAngle(){
  var cp = new Point(0, 0);
  var sp = new Point(0, 200);
  var ep = new Point(-300, 300);


  var disCS = cp.getDistance(sp);
  var disCE = cp.getDistance(ep);
  var disSE = sp.getDistance(ep);

  var resultRadian = Math.acos(((Math.pow(disCS, 2)) + (Math.pow(disCE, 2)) - (Math.pow(disSE, 2))) / (2 * disCS * disCE));

  //angle in degrees
  var resultDegree = resultRadian * 180 / Math.PI;

}

export function getAngle2(){ 
  var cp = new Point(0, 0);
  var sp = new Point(0, 200);
  var ep = new Point(-300, 300 + i);

  return getAngleXAxis((ep.x - cp.x)/(ep.y-cp.y)) - getAngleXAxis(Math.atan2(sp.x - cp.x, sp.y-cp.y));
}