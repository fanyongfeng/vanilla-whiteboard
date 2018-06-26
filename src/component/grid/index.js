export default function drawGrid(hDivide, vDivide, bounds) {
  let cellWidth = bounds.width / hDivide;
  let cellHeight = bounds.height / vDivide;

  for (let i = 0; i <= hDivide; i++) {
    let xPos = bounds.left + i * cellWidth;
    let topPoint = new paper.Point(xPos, bounds.top);
    let bottomPoint = new paper.Point(xPos, bounds.bottom);
    let aLine = new paper.Path.Line(topPoint, bottomPoint);
    aLine.strokeColor = 'black';
    aLine.strokeColor.alpha = 0.15;

    let text = new paper.PointText(new paper.Point(xPos + 10, 10));
    text.justification = 'center';
    text.fillColor = 'black';
    text.fillColor.alpha = 0.15;
    text.content = parseInt(i * cellWidth, 10);
    text.fontSize = 9;
  }

  for (let i = 0; i <= vDivide; i++) {
    let yPos = bounds.top + i * cellHeight;
    let leftPoint = new paper.Point(bounds.left, yPos);
    let rightPoint = new paper.Point(bounds.right, yPos);
    let aLine = new paper.Path.Line(leftPoint, rightPoint);
    aLine.strokeColor = 'black';
    aLine.strokeColor.alpha = 0.15;

    let text = new paper.PointText(new paper.Point(10, yPos));
    text.justification = 'center';
    text.fillColor = 'black';
    text.fillColor.alpha = 0.15;
    text.content = parseInt(i * cellHeight, 10);
    text.fontSize = 9;
  }
}