// History Stack for undo/redo
/**
 * options.maxStack : max length limit in history stack
 * options.change : callback on redo/undo action
 */

export default class History {
  constructor(options) {
    this.clear();
    this.options = Object.assign(
      {
        maxStack: 100,
        change: function() {
          return;
        },
      },
      options
    );

    this.lastRecord = +new Date();
  }

  /**
   * Clear Current Stack
   */
  clear() {
    this.stack = {
      undo: [],
      redo: [],
    };
  }

  /**
   * Get anti-action for current action
   * @param {*} delta
   * @param {*} oldDelta used fro anti-action
   */
  getUndoAction(delta, oldDelta) {
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

  //modify history item in undo stack
  transform(delta) {
    this.stack.undo.push(delta);
  }

  //record user action
  record(delta, oldDelta) {
    this.stack.redo = []; // clear redo list on an new record point.

    let undoDelta = this.getUndoAction(delta, oldDelta);

    this.stack.undo.push({
      redo: delta,
      undo: undoDelta,
    });

    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift();
    }
    this.lastRecord = +new Date();
  }

  //handle undo/redo actions
  change(source, dest) {
    if (this.stack[source].length === 0) return;

    let delta = this.stack[source].pop();
    if (!delta[source]) return;
    this.options.change.call(this, {
      action: source.toUpperCase(),
      delta: delta[source],
    });

    this.lastRecorded = 0;
    this.stack[dest].push(delta);
  }

  //redo action
  redo() {
    this.change('redo', 'undo');
  }

  //undo action
  undo() {
    this.change('undo', 'redo');
  }
}
