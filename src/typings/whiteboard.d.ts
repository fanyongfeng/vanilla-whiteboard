
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

// export declare class Whiteboard {

// }
