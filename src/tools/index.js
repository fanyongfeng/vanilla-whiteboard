/**
 * Register tools
 */
import ArcDrawing from './ArcDrawing';
import FreeDrawing from './FreeDrawing';
import ShapeDrawing from './ShapeDrawing';

let tools = {};

const freeDrawingTools = ["marker", "highlighter"];
const shapeDrawingTools = ["rectangle", "triangle", "ellipse", "arrow", "line"];

function create(){
  freeDrawingTools.forEach(toolName => registerTool(toolName, FreeDrawing));
  shapeDrawingTools.forEach(toolName => registerTool(toolName, ShapeDrawing));
}

function registerTool(name, ctor){
  return tools[name] = new ctor(name)
}

create();

export default {
  registerTool, tools
};
