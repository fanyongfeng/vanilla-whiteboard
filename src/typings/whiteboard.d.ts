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
  textWrapper: HTMLDivElement,
  whiteboard: IWhiteboard,
  backgroundLayer: ILayer,
  activeLayer: ILayer,
  operateLayer: ILayer,
  currentMode: string,
  refreshCount: number, //刷新计数，白板所有layers刷新总次数
  settings: {
    selectionMode: string,
    refreshMode: string,
    readonly: boolean,
    width: number,
    height: number,
    showGrid: boolean,
    showAxes: boolean,
    alignToGrid: boolean,
    throttle: number,
    minDistance: number,
    verbose: boolean,
    precision: number,
    zoom: number,
    dragThreshold: number,
    distance: number,
    container: HTMLDivElement
  },
  emit(name: string, data?: any): void,
}
