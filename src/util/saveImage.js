
export default function saveImage(canvas){
  let $link = document.createElement('a');

  function downloadCanvas(filename) {
    $link.href = canvas.toDataURL('image/png');
    $link.download = filename;
    $link.click();
  }
  
  downloadCanvas('material.png');
}