/**
 * create 1 million points;
 */
function createPoints(){
  console.profile('Point');
  var a = [];
  for(let i=0;i<1000000;i++) {
    a.push(new nebula.Point(i,i))
  }
  console.profileEnd('Point');
}

function addMassiveShapes(){

}
