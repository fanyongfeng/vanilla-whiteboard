/**
 * Register tools
 */
import ArcDrawing from './ArcDrawing';
import FreeDrawing from './FreeDrawing';
import ShapeDrawing from './ShapeDrawing';
import Selection from './Selection';
import Pointer from './Pointer';
import Eraser from './Eraser';
import TextInput from './TextInput';

//tools map.
const tools = {};
window.tools = tools;
const freeDrawingTools = ["marker", "highlighter", "signature"];
const shapeDrawingTools = ["rectangle", "triangle", "rightTriangle", "ellipse", "arrow", "line", "dashed", "star", "chatBox"];

function create() {
  freeDrawingTools.forEach(toolName => registerTool(toolName, FreeDrawing));
  shapeDrawingTools.forEach(toolName => registerTool(toolName, ShapeDrawing));
  registerTool('selection', Selection);
  registerTool('pointer', Pointer);
  registerTool('text', TextInput);
  registerTool('eraser', Eraser);
}

function registerTool(name, ctor) {
  if (tools[name]) throw new Error(`Tool ${name} already exist!`);
  return tools[name] = new ctor(name);
}

function getTool(name) {
  if (typeof name !== 'string') throw new TypeError("setter value must be string!");
  if (!tools[name]) throw new Error(`can't specify tool ${name}!`);
  return tools[name];
}

create();

export { registerTool, getTool };
