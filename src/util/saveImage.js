
export default function saveImage(canvas, type = 'png'){
  if(!/^jpeg|jpg|png$/.test(type)) throw new Error(`Can't support type ${type}`);

  let $link = document.createElement('a');
  function downloadCanvas(filename) {
    $link.href = canvas.toDataURL(`image/${type}`);
    $link.download = filename;
    $link.click();
  }
  downloadCanvas(`material.${type}`);
}
