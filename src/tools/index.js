/**
 * Register tools
 */
import ArcDrawing from './ArcDrawing';
import {Marker, Highlighter} from './FreeDrawing';
import ShapeDrawing from './ShapeDrawing';
import Selection from './Selection';
import Pointer from './Pointer';
import Eraser from './Eraser';
import TextInput from './TextInput';
import PathMutator from "./PathMutator"

//tools map.
const tools = {};
// const freeDrawingTools = ["marker", "highlighter", "signature"];
const shapeDrawingTools = ["rectangle", "triangle", "rightTriangle", "ellipse", "arrow", "line", "dashed", "star", "chatBox"];

function create() {
  registerTool('marker', Marker);
  registerTool('highlighter', Highlighter);
  shapeDrawingTools.forEach(toolName => registerTool(toolName, ShapeDrawing));
  registerTool('arc', ArcDrawing);
  registerTool('selection', Selection);
  registerTool('pointer', Pointer);
  registerTool('text', TextInput);
  registerTool('eraser', Eraser);
  registerTool('pathMutator', PathMutator);
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
