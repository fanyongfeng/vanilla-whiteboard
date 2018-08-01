/**
 * Register tools
 */
import ArcDrawing from './ArcDrawing';
import FreeDrawing from './FreeDrawing';
import ShapeDrawing from './ShapeDrawing';

let tools = [];

const freeDrawingTools = ["marker", "highlighter"];
const shapeDrawingTools = ["rectangle", "triangle", "ellipse", "arrow", "line"];

function create(){
  freeDrawingTools.forEach(toolName =>{
    let tool = new FreeDrawing(toolName);
    tools.push(tool);
  });

  shapeDrawingTools.forEach(toolName =>{
    let tool = new ShapeDrawing(toolName);
    tools.push(tool);
  });
}

function registerTool(name, ctor){
  tools.push(new ctor(name));
}

export default registerTool;
