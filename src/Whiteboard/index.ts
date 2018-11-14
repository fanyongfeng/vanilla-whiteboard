/**
 * Entry of whiteboard.
 */
import emittable from '../decorators/emitter';
import Layer from './Layer';
import OperateLayer from './OperateLayer';
import { setStyle } from '../util/dom';
import EventHandler from './EventHandler';
import Rect from '../graphic/types/Rect';
import { getTool } from '../tools';
import { createItemViaJSON, createItem } from '../graphic/ItemFactory';
import Grid from '../graphic/component/Grid';
import Axes from '../graphic/component/Axes';
import MaterialProvider from './MaterialProvider';
import History from '../commands/History';
import Item from '../graphic/Item';
import Point from '../graphic/types/Point';

// const _createContext = Symbol('_createContext');
export const defaultOptions = {
  selectionMode: 'bounds',
  refreshMode: 'loop',
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
  dragThreshold: 2
};

export type WhiteboardOptions =  {
  container: HTMLDivElement
}

/**
 * 白板的初始化选项。
 * Initialize options of whiteboard.
 * Options:
 *
 *  - selectionMode: 'bounds', 'path'
 *  - alignToGrid: boolean 对齐到网格
 *  - loop / notify
 *  - command-mode: verbose // 当绘制时发送更多的指令
 *  - precision (精度)
 */
@emittable()
export default class Whiteboard  {
  static instances: Whiteboard[] = [];
  private options: typeof defaultOptions & WhiteboardOptions;
  private isLoop = false;
  private _zoom = 1;
  wrapper: HTMLDivElement;
  width: number;
  height: number;
  backgroundLayer!: Layer;
  activeLayer!: Layer;
  operateLayer!: OperateLayer;
  handler: EventHandler;
  context: IContext;

  material = new MaterialProvider();
  emit!: () => void;

  constructor(options: Partial<typeof defaultOptions> & WhiteboardOptions) {
    this.options = Object.assign({}, defaultOptions, options);

    let { container, width, height } = this.options;

    /** 一个container不能加载两个白板*/
    Whiteboard.instances.find(instance => {
      if (instance.wrapper === container) throw new Error("Can't instance at same container twice!");
      return false;
    });

    setStyle(container, {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
    });

    this.wrapper = container;
    this.width = width;
    this.height = height;
    this.context = this._createContext();

    const layerDep = {
      wrapper: this.wrapper,
      context: this.context
    };
    this.backgroundLayer = new Layer(this.width, this.height, 'background', layerDep);
    this.activeLayer = new Layer(this.width, this.height, 'active', layerDep);
    this.operateLayer = new OperateLayer(this.width, this.height, 'operate', layerDep);
    //operateLayer must be last one
    this.operateLayer.el.tabIndex = 1; //make container focusable.


    const handler = (this.handler = new EventHandler(this.items));
    handler.context = this.context;
    handler.bind(this.operateLayer);
    // this.tool = 'selection';

    if (this.options.zoom !== 1) this.zoom = this.options.zoom;

    this.context.zoom = this.options.zoom;

    Whiteboard.instances.push(this);
  }

  /**
   * 白板实例的context, 每个白板唯一
   * context 可以被layers, item-collection, tools访问
   * 注意，要区分白板实例的context，和canvas getContext
   *
   */
  private _createContext() {
    const proto = {
      textWrapper: this.wrapper,
      whiteboard: this,
      currentMode: null,
      refreshCount: 0, //刷新计数，白板所有layers刷新总次数
      settings: Object.freeze(this.options),
      bounds: new Rect(0, 0, this.width, this.height),
      emit: this.emit.bind(this),
    };

    return Object.create(proto);
  }

  /**
   * Watch mode. Redraw layer if it mark as dirty in every tick.
   */
  watch() {
    if (this.isLoop === true) throw new Error("Can't watch twice!");

    const drawDirtyLayer = () => {
      if (this.activeLayer.isDirty) this.activeLayer.refresh();
      if (this.operateLayer.isDirty) this.operateLayer.refresh();
      if (this.backgroundLayer.isDirty) this.backgroundLayer.refresh();
      requestAnimationFrame(drawDirtyLayer);
    };

    //invoke immediately！
    drawDirtyLayer();
    this.isLoop = true;
  }

  /**
   * refresh activeLayer in next tick.
   * Ensure redraw only once in every tick.
   */
  refresh() {
    requestAnimationFrame(() => this.activeLayer.refresh());
  }

  /**
   * refresh all layers in next tick.
   * Ensure redraw only once in every tick.
   */
  refreshAll() {
    requestAnimationFrame(() => this.layers.forEach(layer => layer.refresh()));
  }

  /**
   * get data of items in all layers.
   */
  get data() {
    return this.items.toJSON();
  }

  /**
   * Get zoom of current whiteboard.
   */
  get zoom() {
    return this._zoom;
  }

  /**
   * Set zoom of current whiteboard.
   */
  set zoom(radio) {
    this._zoom = radio;
    this.context.zoom = radio;
    this.layers.forEach(layer => layer.zoom(radio));

    setStyle(this.wrapper, {
      width: `${this.width * radio}px`,
      height: `${this.height * radio}px`,
      position: 'relative',
    });
  }

  addItem(item: Item) {
    this.items.add(item);
  }

  createItem(type: object, style?: object): any {
    if (!type) throw new TypeError('Argument illegal!');
    if (typeof type === 'string') return createItem(type, style);
    if (type instanceof Item) return type;
    const ins = createItemViaJSON(type);
    if (ins.type === 'text') { // TODO: need to refactor
      ins.textWrapper = this.wrapper;
      ins.zoom = this.zoom;
    }
    return ins;
  }

  typingText(json: [number, string]) {
    const textInstance = this.items.find(item => item.id === json[0]);
    textInstance && textInstance.input && (textInstance.input.innerHTML = json[1]);
  }

  add(json: any) {
    let instance = this.createItem(json);
    this.items.add(instance);
    return instance;
  }

  remove(json: number[]) {
    this.items.deleteById(json);
  }

  resize(json: [number[], number[]]) {
    const ids = json[0];
    const [sx, sy, X, Y] = json[1];
    this.items.filter(item => ids.includes(item.id)).map(item => item.scale(sx, sy, new Point(X, Y)));
  }

  move(json: [number[], number[]]) {
    const ids = json[0];
    const [x, y] = json[1];
    this.items.filter(item => ids.includes(item.id)).map(item => item.translate(new Point(x, y)));
  }

  /**
   * Items of activeLayer is whiteboard 'real' items.
   * It's read-only.
   */
  get items() {
    return this.activeLayer.items;
  }

  set tool(val: string) {
    this.handler.tool = getTool(val);
  }

  getTool() {
    return this.handler.tool;
  }

  getToolByName(name: string) {
    const tool = getTool(name);
    tool.layer = this.handler.layer;
    return tool;
  }

  /**
   * Get Layers of Whiteboard.
   */
  get layers() {
    return [this.backgroundLayer, this.activeLayer, this.operateLayer];
  }

  private history = new History();

  redo() {
    this.history.redo();
  }
  undo() {
    this.history.undo();
  }

  command() {}

  drawMaterial(url: string) {
    const material = this.material.get(url);
    this.backgroundLayer.items.set(material, 0);
  }

  drawGrid(minor = false) {
    const grid = new Grid({ minor });
    this.backgroundLayer.items.set(grid, 1);
  }

  drawAxes() {
    const axes = new Axes();
    this.backgroundLayer.items.set(axes, 2);
  }

  saveImage(filename = 'material', type = 'png') {
    if (!/^jpeg|jpg|png$/.test(type)) throw new Error(`Can't support type ${type}`);

    //创建离屏canvas，绘制layers；
    const offscreenCanvas = new Layer(this.width, this.height, '', {
      context: this.context
    });
    const ctx = offscreenCanvas.ctx;

    this.layers.forEach(layer => ctx.drawImage(layer.el, 0, 0, this.width, this.height));

    const $link = document.createElement('a');
    function downloadCanvas() {
      $link.href = offscreenCanvas.el.toDataURL(`image/${type}`);
      $link.download = filename;
      $link.click();
    }

    downloadCanvas();
  }

  dispose() {
    const wrapper = this.wrapper;
    //TODO: remove all canvas DOM.
    wrapper.removeChild(this.backgroundLayer.el);
    wrapper.removeChild(this.activeLayer.el);
  }

  /**
   * Clear layers of whiteboard.
   */
  clear() {
    this.layers.forEach(layer => layer.clear());
    this.context.emit('layers:clear');
    return this;
  }
}
