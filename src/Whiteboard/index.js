/**
 *
 */

import hookable from '../decorators/hookable';
import Layer from './Layer';
import { setStyle } from '../util/dom';
import handler from '../event/event';
import Writing from '../graphic/shape/Writing';
import Text from '../graphic/shape/Text';
import saveImage from '../util/saveImage';
import Image from '../graphic/shape/Image';
import Rect from '../graphic/shape/Rect';
import Point from '../graphic/types/Point';
import { tools } from '../tools';

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
 *
 * Options:
 *
 *  - selectionMode: 'bounds', 'path'
 *  - alignToGrid: boolean 对齐到网格
 *  - loop / notify
 *  - readonly
 *  -
 */
@hookable()
export default class Whiteboard {
  static instances = [];

  backgroundLayer = null;
  activeLayer = null;
  operateLayer = null;

  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions ,options);

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

    handler.context = this.context;
    handler.bind(this.operateLayer);
    handler.refreshCanvas = this.refresh.bind(this);

    Whiteboard.instances.push(this)
  }

  /**
   * 注意，要区分白板实例的context，和canvas getContext,
   * @param {} width
   * @param {*} height
   */
  [_createContext]() {

    let backgroundLayer = new Layer(this.width,this. height, 'background'),
    activeLayer = new Layer(this.width,this. height, 'active'),
    operateLayer = new Layer(this.width,this. height, 'operate');

    backgroundLayer.appendTo(this.wrapper);
    activeLayer.appendTo(this.wrapper);
    operateLayer.appendTo(this.wrapper);

    let whiteboardCtx = {
      items: new PathCollection,
      backgroundLayer,
      activeLayer,
      operateLayer,
      currentMode: null,
      settings: this.options,
    }

    // 将context 属性赋值白板实例
    Object.keys(whiteboardCtx).forEach(key => this[key] = whiteboardCtx[key]);

    //return context;
    return whiteboardCtx;
  }

  refresh() {
    requestAnimationFrame(() => {
      this.activeLayer.clear();
      this.items.forEach(item => item.draw(this.activeLayer.ctx));
    });
  }

  get data() {
    return this.items.map(item => item.toJSON());
  }

  add(segments) {
    let ins = Writing.instantiate(segments);
    this.items.add(ins);
    // this.refresh();
  }

  addText(text){
    this.items.add(new Text(text));
  }

  addPath(instance) {
    this.items.add(instance);
  }

  addRect(x1, y1, x2, y2) {
    let instance = new Rect(new Point(x1, y1), new Point(x2, y2));
    instance.buildPath();
    this.items.add(instance);
  }

  addImage(src) {
    this.items.add(new Image(src));
  }

  saveImage() {
    return saveImage(this.activeLayer);
  }

  refreshAll() {

  }

  _toolName = '';

  set tool(val) {
    this._toolName = val;
  }

  get tools() {
    return tools;
  }

  get tool() {
    return tools[this._toolName];
  }

  dispose() {
    let wrapper = this.wrapper;
    //TODO: remove all object.
    wrapper.removeChild(this.backgroundLayer);
    wrapper.removeChild(this.activeLayer);
  }

  clear() {
    this.items.clear();
    this.activeLayer.clear();
    return this;
  }

  renderAll() { }
  scale() { }
}

