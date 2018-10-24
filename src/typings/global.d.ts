
 interface CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: number,
  mozBackingStorePixelRatio?: number,
  msBackingStorePixelRatio?: number,
  oBackingStorePixelRatio?: number,
  backingStorePixelRatio?: number,
 }

interface EventTarget {
  innerHTML: string,
  width: number,
  height: number
}  

interface Window {
  [key: string]: any,
}

declare interface ITool {
  layer: ILayer;
  globalCtx?: IContext,
  type: IToolType;
}
