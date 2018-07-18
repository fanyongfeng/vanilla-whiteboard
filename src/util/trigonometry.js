export function getAngle(){
  var cp = new Point(0, 0);
  var sp = new Point(0, 200);
  var ep = new Point(-300, 300);


  var disCS = cp.distanceFrom(sp);
  var disCE = cp.distanceFrom(ep);
  var disSE = sp.distanceFrom(ep);

  var resultRadian = Math.acos(((Math.pow(disCS, 2)) + (Math.pow(disCE, 2)) - (Math.pow(disSE, 2))) / (2 * disCS * disCE));

  //angle in degrees
  var resultDegree = resultRadian * 180 / Math.PI;

}