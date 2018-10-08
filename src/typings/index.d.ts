declare type IToolType = "highlighter" | "marker" | "text" | "selection" | "pointer" | "eraser" | "pathMutator";
declare interface IItem {
  matrix: any,
  type?: IToolType,
  typeId?: number,
  id?: number,
  style: any,
  layer?: any,
  transform(matrix: any): IItem,
  draw(ctx: CanvasRenderingContext2D): IItem;
}

declare interface IItemCollection {

}

declare interface IRect {
  x: number,
  y: number,
  width: number,
  height: number,
  owner: IItem | null,
  center: IPoint,
  area: number,
  centerY: number,
  centerX: number,
  unite(rect: IRect): IRect,
  intersect(rect: IRect): IRect | null,
  containsPoint(point: IPoint): boolean,
  containsRect(rect: IRect): boolean,
  assign(x: number, y: number, width: number, height: number): void,
  toJSON(): number[],
  clone(): IRect,
  equals(other: IRect): boolean,
  expand(width: number, height?: number): IRect,
  toString(): string
}


declare interface IPoint {
  x: number,
  y: number,
  angle: number,
  length: number,
  isZero(): boolean,
  add(x: number | IPoint, y?: number): IPoint,
  multiply(x: number | IPoint, y?: number): IPoint,
  toString(): string,
  toJSON(precision: number): number[],
  clone(): IPoint,
  dot(point: IPoint): number,
  normalize(length: number): IPoint,
  rotate(angle: number, center?: IPoint): IPoint,
  negate(): IPoint,
  nearby(point: IPoint, threshold: number): boolean,
  getDistance(other: IPoint): number,
  midPointFrom(other: IPoint): IPoint,
  lerp(other: IPoint, time: number): IPoint,
  equals(other: IPoint): boolean,
  assign(point: IPoint): IPoint,
  addEquals(other: IPoint): IPoint,
  transform(matrix: any): IPoint,
  divide(x: number, y: number): IPoint,
  subtract(x: number | IPoint, y?: number): IPoint,
  toJSON(precision?: number): number[]
}

declare interface IMatrix {
  m: number[],
  reset(): IMatrix,
  clone(): IMatrix,
  append(m: number[] | IMatrix): IMatrix,
  prepend(m: number[] | IMatrix): IMatrix,
  inverse(): IMatrix,
  translate(point: IPoint): IMatrix,
  rotate(deg: number, point?: IPoint): IMatrix,
  skew(degX: number, degY: number, point?: IPoint): IMatrix,
  scale(sx: number, sy: number, point?: IPoint): IMatrix
  applyToPoint(point: IPoint): IMatrix,
  applyToRect(bounds: IRect): IMatrix,
  applyToPoint(point: IPoint): IMatrix,
  applyToVector(point: IPoint): IMatrix
  applyToContext(ctx: CanvasRenderingContext2D),
  toJSON(): number[],
  toString(): string,
  transformCoordinate(x: number, y: number): number[]
}

declare interface IColor {
  red: number,
  green: number,
  blue: number,
  alpha: number,
  normalizeColor(colorStr: string),
  equals(color: IColor): boolean,
  clone(): IColor,
  toHSL(): number[],
  toHexString(): string,
  toJSON(): number[],
  toString(): string
}

declare interface IStyle {
  lineWidth: number
}
