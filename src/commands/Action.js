/**
 * enum of action type
 */
const ActionType = {
  translate: 'translate',
  add: 'add',
  remove: 'remove',
  scale: 'scale',
  typing: 'typing',
};

/**
 * Action of redo-undo history
 */
export default class Action {
  recordTimeStamp = +new Date();
  _redo = null;
  _undo = null;
  _hot = 0; // 操作热度计数

  constructor(delta, oldDelta = null) {
    this.type = delta.type;
    this._redo = {};
  }

  /**
   * Get undo-action for current action
   * @param {Object} delta
   * @param {Object} oldDelta used fro anti-action
   */
  _calcUndo(delta, oldDelta) {
    let hash = delta.data;
    switch (delta.action) {
      case 'ADD':
        return Object.assign({}, delta, {
          action: 'DELETE',
        });
      case 'DELETE':
        return Object.assign({}, delta, {
          action: 'ADD',
        });
      case 'MOVE':
        let { x, y } = hash.offset;
        return {
          action: 'MOVE',
          data: {
            ids: hash.ids,
            offset: { x: -x, y: -y },
          },
        };
      case 'SCALE':
        let { sx, sy, basePoint } = hash.scale;
        return {
          action: 'SCALE',
          data: {
            ids: hash.ids,
            scale: {
              sx: 1 / sx,
              sy: 1 / sy,
              basePoint,
            },
          },
        };
      case 'TYPING':
        return {
          action: 'TYPING',
          data: {
            id: hash.id,
            value: hash.lastTypedText,
          },
        };
    }
    return null;
  }

  get redo() {
    return this._redo;
  }
  get undo() {
    return this._undo;
  }
}
