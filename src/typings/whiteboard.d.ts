// import ItemCollection from '../Whiteboard/ItemCollection'
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
  appendTo(whiteboard: IWhiteboard): void
}


declare interface IContext {
  zoom: number,
  wrapper: HTMLDivElement,
  whiteboard: IWhiteboard,
  backgroundLayer: ILayer,
  activeLayer: ILayer,
  operateLayer: ILayer,
  currentMode: string,
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
    distance: 0,
    container: HTMLDivElement
  },
  bounds: IRect,
  emit(name: string, data?: any): void,
}
