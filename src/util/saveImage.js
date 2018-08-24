/**
 * Save Canvas as Image, by order.
 *
  let offscreenCanvas = new Layer(width, height);
 *
 * @param {Array} canvases
 * @param {Number} width
 * @param {Number} height
 * @param {String} filename, filename of image.
 * @param {String} type, Image type, possible values:  'png','jpeg','jpg'
 */
export default function saveImage(canvases, width, height, filename='material', type = 'png'){
  if(!/^jpeg|jpg|png$/.test(type)) throw new Error(`Can't support type ${type}`);

  //创建离屏canvas，绘制layers；
  let offscreenCanvas = document.createElement('canvas');
  let ctx = offscreenCanvas.getContext('2d');
  offscreenCanvas.width = width;
  offscreenCanvas.height = height;

  canvases.forEach(canvas => ctx.drawImage(canvas, 0, 0, width, height));

  let $link = document.createElement('a');
  function downloadCanvas(filename) {
    $link.href = offscreenCanvas.toDataURL(`image/${type}`);
    $link.download = filename;
    $link.click();
  }

  downloadCanvas(`${filename}.${type}`);
}
