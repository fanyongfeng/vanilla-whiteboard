/**
 * Register tools
 */
import ArcDrawing from './ArcDrawing';
import FreeDrawing from './FreeDrawing';
import ShapeDrawing from './ShapeDrawing';
// import Selection from './Selection';
import Pointer from './Pointer';
import TextInput from './TextInput';

//tools map.
const tools = {};
window.tools = tools;
const freeDrawingTools = ["marker", "highlighter", "signature"];
const shapeDrawingTools = ["rectangle", "triangle", "ellipse", "arrow", "line"];

function create(){
  freeDrawingTools.forEach(toolName => registerTool(toolName, FreeDrawing));
  shapeDrawingTools.forEach(toolName => registerTool(toolName, ShapeDrawing));
  // registerTool('selection', Selection);
  registerTool('pointer', Pointer);
  registerTool('text', TextInput);
}

function registerTool(name, ctor){
  if(tools[name]) throw new Error(`Tool ${name} already exist!`);
  return tools[name] = new ctor(name);
}

create();

function getTool(name){
  if(typeof name !== 'string') throw new TypeError("setter value must be string!");
  if(!tools[name]) throw new Error(`can't specify tool ${val}!`);
  return tools[name];
}
export { registerTool, getTool};
