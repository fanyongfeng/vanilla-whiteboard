/**
 * Entry of whiteboard.
 */
import emittable from '../decorators/emitter';
import Layer from './Layer';
import OperateLayer from './OperateLayer';
import { setStyle } from '../util/dom';
import EventHandler from './EventHandler';
import Text from '../graphic/shape/Text';
import saveImage from '../util/saveImage';
import Image from '../graphic/shape/Image';
import Rect from '../graphic/types/Rect';
import { getTool } from '../tools';
import { createItemViaJSON, createItem } from '../graphic/ItemFactory';
import Grid from '../graphic/component/Grid';
import Axes from '../graphic/component/Axes';
import MaterialProvider from './MaterialProvider';

const _createContext = Symbol('_createContext');
const defaultOptions = {
  selectionMode: "bounds",
  alignToGrid: false,
  refreshMode: 'loop',
  readonly: false,
  width: 1000,
  height: 800,
  showGrid: false,
  showAxes: false,
};

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
 *
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

    let whiteboardCtx = {
      whiteboard: this,
      backgroundLayer,
      activeLayer,
      operateLayer,
      currentMode: null,
      settings: this.options,
      bounds: new Rect(0, 0, this.width, this.height),
      emit: this.emit.bind(this)
    }

    // 将context 属性赋值白板实例
    Object.keys(whiteboardCtx).forEach(key => this[key] = whiteboardCtx[key]);

    //return context;
    return whiteboardCtx;
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

  zoom(radio) {
    this.activeLayer.ctx.scale(radio, radio);
  }

  createItem(type, style) {
    return createItem(type, style);
  }

  addItem(item) {
    this.items.add(item);
  }

  add(json) {
    let instance = createItemViaJSON(json);
    this.items.add(instance);
    this.emit('item:add', { instance });
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

  command(){

  }

  drawMaterial(url){
    let material = this.material.createMaterial(url)
    this.backgroundLayer.items.set(material, 0);
  }

  drawGrid(minor = false){
    let grid = new Grid({ minor });
    this.backgroundLayer.items.set(grid, 1);
  }

  drawAxes(){
    let axes = new Axes();
    this.backgroundLayer.items.set(axes, 2);
  }

  saveImage() {
    //创建离屏canvas，绘制三个layer；
    let offscreenCanvas = new Layer(this.width, this.height);
    let ctx = offscreenCanvas.ctx;

    this.layers.forEach(layer => ctx.drawImage(layer.el, 0, 0, this.width, this.height));
    return saveImage(offscreenCanvas.el);
  }

  dispose() {
    let wrapper = this.wrapper;
    //TODO: remove all canvas DOM.
    wrapper.removeChild(this.backgroundLayer);
    wrapper.removeChild(this.activeLayer);
  }

  clear() {
    this.items.clear();
    this.activeLayer.clear();
    return this;
  }
}

