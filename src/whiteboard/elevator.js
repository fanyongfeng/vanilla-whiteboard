export default function elevator(top, bottom, target){

  target.forEach(element => {
    top.remove(element);
    bottom.add(element);
  });
  refreshAll();
}
