/**
 * Action of redo-undo.
 */
const ActionType = {
  "translate": "translate",
  "add": "add",
  "remove": "remove",
  "scale": "scale",
  "typing": "typing",
}


/**
 * Get anti-action for current action
 * @param {*} delta
 * @param {*} oldDelta used fro anti-action
 */
function getUndoAction(delta, oldDelta) {
  if (delta.action === 'ADD') {
    return Object.assign({}, delta, {
      action: 'DELETE',
    });
  } else if (delta.action === 'DELETE') {
    return Object.assign({}, delta, {
      action: 'ADD',
    });
  } else if (delta.action === 'MOVE') {
    let antiOffset = {
      x: -delta.data.offset.x,
      y: -delta.data.offset.y,
    };

    return {
      action: 'MOVE',
      data: {
        ids: delta.data.ids,
        offset: antiOffset,
      },
    };
  } else if (delta.action === 'SCALE') {
    let antiScale = {
      sx: 1 / delta.data.scale.sx,
      sy: 1 / delta.data.scale.sy,
      basePoint: delta.data.scale.basePoint,
    };
    return {
      action: 'SCALE',
      data: {
        ids: delta.data.ids,
        scale: antiScale,
      },
    };
  } else if (delta.action === 'TYPING') {
    return {
      action: 'TYPING',
      data: {
        id: delta.data.id,
        value: delta.data.lastTypedText,
      },
    };
  }
}
export default class Action {

  recordTimeStamp = +new Date();

  constructor(type) {
    this.type = type;
  }

  get redo(){

  }

  get undo(){

  }

  get data() {

  }
}
