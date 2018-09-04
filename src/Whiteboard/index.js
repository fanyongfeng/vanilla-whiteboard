/**
 * Entry of whiteboard.
 */
import emittable from '../decorators/emitter';
import Layer from './Layer';
import OperateLayer from './OperateLayer';
import { setStyle } from '../util/dom';
import EventHandler from './EventHandler';
import Text from '../graphic/shape/Text';
import { getTool } from '../tools';
import { createItemViaJSON, createItem } from '../graphic/ItemFactory';
import Grid from '../graphic/component/Grid';
import Axes from '../graphic/component/Axes';
import MaterialProvider from './MaterialProvider';
import History from '../commands/History';
import Item from '../graphic/Item';

const _createContext = Symbol('_createContext');
const defaultOptions = {
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
class Whiteboard {
  static instances = [];

  _currentTool = null;
  _animationFrameId = -Infinity;
  backgroundLayer = null;
  activeLayer = null;
  operateLayer = null;
  material = new MaterialProvider();

  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);

    let { container, width, height } = this.options;

    /** 一个container不能加载两个白板*/
    Whiteboard.instances.find(instance => {
      if (instance.wrapper === container) throw new Error("Can't instance at same container twice!");
    });

    setStyle(container, {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
    });

    this.wrapper = container;
    this.width = width;
    this.height = height;

    //实例化所有的layer
    this.backgroundLayer = new Layer(this.width, this.height, 'background');
    this.activeLayer = new Layer(this.width, this.height, 'active');
    this.operateLayer = new OperateLayer(this.width, this.height, 'operate');
    this.context = this[_createContext](this.backgroundLayer, this.activeLayer, this.operateLayer);

    this.backgroundLayer.appendTo(this);
    this.activeLayer.appendTo(this);
    this.operateLayer.appendTo(this);
    this.handler = new EventHandler();
    this.handler.context = this.context;

    if (!this.options.readonly) {
      this.handler.bind(this.operateLayer);
      this.tool = 'selection';
    }

    if (this.options.zoom !== 1) {
      this.zoom = this.options.zoom;
    }

    Whiteboard.instances.push(this);
  }

  /**
   * 白板实例的context, 每个白板唯一
   * context 可以被layers, item-collection, tools访问
   * 注意，要区分白板实例的context，和canvas getContext
   *
   */
  [_createContext](backgroundLayer, activeLayer, operateLayer) {
    return {
      backgroundLayer,
      activeLayer,
      operateLayer,
      refreshCount: 0, //刷新计数，白板所有layers刷新总次数
      settings: Object.freeze(this.options),
      emit: this.emit.bind(this),
    };
  }

  /**
   * Watch mode. Redraw layer if it mark as dirty in every tick.
   */
  watch() {
    if (this._isLoop === true) throw new Error("Can't watch twice!");

    const drawDirtyLayer = () => {
      if (this.activeLayer.isDirty) this.activeLayer.refresh();
      if (this.operateLayer.isDirty) this.operateLayer.refresh();
      if (this.backgroundLayer.isDirty) this.backgroundLayer.refresh();
      this._animationFrameId = requestAnimationFrame(drawDirtyLayer);
    };

    //invoke immediately！
    drawDirtyLayer();
    this._isLoop = true;
  }

  /**
   * unwatch will stop current loop;
   */
  unwatch() {
    this._isLoop = false;
    cancelAnimationFrame(this._animationFrameId);
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
      position: 'relative',
    });
  }

  addItem(item) {
    this.items.add(item);
  }

  createItem(type, style) {
    if (!type) throw new TypeError('Argument illegal!');
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
    if (!this.options.readonly) this.handler.tool = getTool(val);
  }

  get tool() {
    return this.handler.tool;
  }

  /**
   * Get Layers of Whiteboard.
   */
  get layers() {
    return [this.backgroundLayer, this.activeLayer, this.operateLayer];
  }

  [_history] = new History();

  /**
   * Redo action.
   */
  redo() {
    this[_history].redo();
  }

  /**
   * Undo action.
   */
  undo() {
    this[_history].undo();
  }

  command() {}

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

  /**
   * Save canvas content as image.
   *
   * @param {String} filename, default value is 'material'
   * @param {String} type, Image type, default value is 'png'
   * @param {Number} encoderOptions, quality of image, default value is .92
   */
  saveImage(filename = 'material', type = 'png', encoderOptions = 0.92) {
    if (!/^jpeg|jpg|png$/.test(type)) throw new Error(`Can't support type ${type}`);

    //创建离屏canvas，绘制layers；
    let offscreenCanvas = new Layer(this.width, this.height);
    let ctx = offscreenCanvas.ctx;

    this.layers.forEach(layer => ctx.drawImage(layer.el, 0, 0, this.width, this.height));

    let $link = document.createElement('a');
    function downloadCanvas() {
      $link.href = offscreenCanvas.el.toDataURL(`image/${type}`, encoderOptions);
      $link.download = `${filename}.${type}`;
      $link.click();
    }

    downloadCanvas();
  }

  /**
   * Dispose current whiteboard.
   */
  dispose() {
    this.handler.unbind();
    this.layers.forEach(layer => layer.dispose());
    this.items = [];
  }

  /**
   * Clear layers of whiteboard.
   */
  clear() {
    this.layers.forEach(layer => layer.clear());
    return this;
  }
}

export default Whiteboard;
