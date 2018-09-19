declare interface IWhiteboard {
  wrapper: HTMLDivElement | HTMLCanvasElement,
  backgroundLayer: ILayer,
  operateLayer: ILayer,
  activeLayer: ILayer
}

declare interface ILayer {
  el: HTMLDivElement,
  role: string,
  isDirty: boolean,
  refresh(): void,
  // items: IItemCollection[],
  zoom(radio: number): void,
  clear(): void,
  setCursor(cursor: string): void,
  appendTo(whiteboard: IWhiteboard): void
}


declare interface IContext {
  whiteboard: IWhiteboard,
  backgroundLayer: ILayer,
  activeLayer: ILayer,
  operateLayer: ILayer,
  currentMode: String,
  refreshCount: 0, //刷新计数，白板所有layers刷新总次数
  settings: {
    selectionMode: 'bounds',
    refreshMode: 'loop',
    readonly: false,
    width: 1000,
    height: 800,
    showGrid: false,
    showAxes: false,
    alignToGrid: false,
    throttle: 0,
    minDistance: 0,
    verbose: false,
    precision: 1,
    zoom: 1,
    dragThreshold: 2,
    container: HTMLDivElement
  },
  bounds: IRect,
  emit(): void,
}
