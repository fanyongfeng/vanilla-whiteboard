
 interface CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: number,
  mozBackingStorePixelRatio?: number,
  msBackingStorePixelRatio?: number,
  oBackingStorePixelRatio?: number,
  backingStorePixelRatio?: number,
 }

interface EventTarget extends Range {
  innerHTML: string,
  width: number,
  height: number,
}

declare type IToolType = "highlighter" | "marker" | "text" | "selection" | "pointer" | "eraser" | "pathMutator";

declare const IS_PRODUCTION: boolean;


declare interface Window {
  [key: string]: any
}
