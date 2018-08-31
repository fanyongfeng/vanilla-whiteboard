/**
 * Entry of whiteboard.
 */
import emittable from '../decorators/emitter';
import Layer from './Layer';
import OperateLayer from './OperateLayer';
import { setStyle } from '../util/dom';
import EventHandler from './EventHandler';
import Text from '../graphic/shape/Text';
import Rect from '../graphic/types/Rect';
import { getTool } from '../tools';
import { createItemViaJSON, createItem } from '../graphic/ItemFactory';
import Grid from '../graphic/component/Grid';
import Axes from '../graphic/component/Axes';
import MaterialProvider from './MaterialProvider';
import History from '../commands/History';
import Item from '../graphic/Item';

const _createContext = Symbol('_createContext');
const defaultOptions = {
  selectionMode: "bounds",
  refreshMode: 'loop',
  readonly: false,
  width: 1000,
  height: 800,
  showGrid: false,
  showAxes: false,
  alignToGrid: false,
  throttle: 0,
  minDistance: 0,
  verbose:false,
  precision: 1,
  zoom: 1,
  dragThreshold: 2,
};


const _history = Symbol('_history');

/**
 * 白板的初始化选项。
 * Initialize options of whiteboard.
 * Options:
 *
 *  - selectionMode: 'bounds', 'path'
 *  - alignToGrid: boolean 对齐到网格
 *  - loop / notify
 *  - readonly
 *  - command-mode: verbose // 当绘制时发送更多的指令
 *  - precision (精度)
 */
@emittable()
export default class Whiteboard {
  static instances = [];

  _currentTool = null;
  backgroundLayer = null;
  activeLayer = null;
  operateLayer = null;
  material = new MaterialProvider;

  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);

    let { container, width, height } = this.options;

    /** 一个container不能加载两个白板*/
    Whiteboard.instances.find(instance => {
      if (instance.wrapper === container)
        throw new Error("Can't instance at same container twice!");
    })

    setStyle(container, {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative'
    });

    this.wrapper = container;
    this.width = width;
    this.height = height;
    this.context = this[_createContext]();

    this.operateLayer.el.tabIndex = 1; //make container focusable.
    this.backgroundLayer.appendTo(this);
    this.activeLayer.appendTo(this);
    this.operateLayer.appendTo(this);

    let handler = this.handler = new EventHandler();

    handler.context = this.context;
    handler.bind(this.operateLayer);

    this.tool = 'selection';

    if(this.options.zoom !== 1) {
      this.zoom = this.options.zoom;
    }

    Whiteboard.instances.push(this)
  }

  /**
   * 白板实例的context, 每个白板唯一
   * context 可以被layers, item-collection, tools访问
   * 注意，要区分白板实例的context，和canvas getContext
   *
   */
  [_createContext]() {

    let backgroundLayer = new Layer(this.width, this.height, 'background'),
      activeLayer = new Layer(this.width, this.height, 'active'),
      operateLayer = new OperateLayer(this.width, this.height, 'operate');

    let proto = {
      whiteboard: this,
      backgroundLayer,
      activeLayer,
      operateLayer,
      currentMode: null,
      refreshCount: 0, //刷新计数，白板所有layers刷新总次数
      settings: Object.freeze(this.options),
      bounds: new Rect(0, 0, this.width, this.height),
      emit: this.emit.bind(this)
    }

    // 将context 属性赋值白板实例
    if (process.env.NODE_ENV === 'development')
      Object.keys(proto).forEach(key => this[key] = proto[key]);

    //return context;
    return Object.create(proto);
  }

  /**
   * Watch mode. Redraw layer if it mark as dirty in every tick.
   *
   */
  watch() {
    if (this._isLoop === true) throw new Error("Can't watch twice!");

    const drawDirtyLayer = () => {
      if (this.activeLayer.isDirty) this.activeLayer.refresh();
      if (this.operateLayer.isDirty) this.operateLayer.refresh();
      if (this.backgroundLayer.isDirty) this.backgroundLayer.refresh();
      requestAnimationFrame(drawDirtyLayer);
    }

    //invoke immediately！
    drawDirtyLayer();
    this._isLoop = true;
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

  _zoom = 1;

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
    this.layers.forEach(layer => layer.zoom(radio));

    setStyle(this.wrapper, {
      width: `${this.width * radio}px`,
      height: `${this.height * radio}px`,
      position: 'relative'
    });
  }

  addItem(item) {
    this.items.add(item);
  }

  createItem(type, style) {
    if (!type) throw new TypeError("Argument illegal!");
    if (typeof type === 'string') return createItem(type, style);
    if (type instanceof Item) return type;
    return createItemViaJSON(type);
  }

  add(json) {
    let instance = this.createItem(json);
    this.items.add(instance);
  }

  remove(json) {
    this.items.deleteById(json);
  }

  addText(text) {
    this.items.add(new Text(text));
  }

  /**
   * Items of activeLayer is whiteboard 'real' items.
   * It's read-only.
   */
  get items() {
    return this.activeLayer.items;
  }

  set tool(val) {
    this.handler.tool = getTool(val);
  }

  get tool() {
    return this.handler.tool;
  }

  /**
   * Get Layers of Whiteboard.
   */
  get layers() {
    return [
      this.backgroundLayer,
      this.activeLayer,
      this.operateLayer
    ];
  }

  [_history] = new History;

  redo() {
    this[_history].redo();
  }
  undo() {
    this[_history].undo();
  }

  command() {

  }

  drawMaterial(url) {
    let material = this.material.get(url);
    this.backgroundLayer.items.set(material, 0);
  }

  drawGrid(minor = false) {
    let grid = new Grid({ minor });
    this.backgroundLayer.items.set(grid, 1);
  }

  drawAxes() {
    let axes = new Axes();
    this.backgroundLayer.items.set(axes, 2);
  }

  saveImage(filename = 'material', type = 'png') {
    if (!/^jpeg|jpg|png$/.test(type)) throw new Error(`Can't support type ${type}`);

    //创建离屏canvas，绘制layers；
    let offscreenCanvas = new Layer(this.width, this.height);
    let ctx = offscreenCanvas.ctx;

    this.layers.forEach(layer => ctx.drawImage(layer.el, 0, 0, this.width, this.height));

    let $link = document.createElement('a');
    function downloadCanvas() {
      $link.href = offscreenCanvas.el.toDataURL(`image/${type}`);
      $link.download = filename;
      $link.click();
    }

    downloadCanvas(`${filename}.${type}`);
  }

  dispose() {
    let wrapper = this.wrapper;
    //TODO: remove all canvas DOM.
    wrapper.removeChild(this.backgroundLayer);
    wrapper.removeChild(this.activeLayer);
  }

  /**
   * Clear layers of whiteboard.
   */
  clear() {
    this.layers.forEach(layer => layer.clear());
    return this;
  }
}

