import Action from './Action';
import emittable from '../decorators/emitter';
// History Stack for undo/redo
/**
 * options.maxStack : max length limit in history stack
 * options.enableKeyboard : If enable keyboard to redo-undo actions. (e.g. ctrl + z)
 *
 * methods:
 *  redo: replay last action.
 *  undo: cancel last action.
 *  record: record action in history stack.
 *  clear: clear current history stack.
 */
//TODO: 返回undo stack 和 redo stack 为空的callback，方便UI展示按钮的disable状态


const defaultOptions = {
  maxStack: 300,
  enableKeyboard: true,
};

interface History {
  emit: (name: string, data: any) => void
}

@emittable()
class History {
  private stack: any;
  private options: typeof defaultOptions;
  public lastRecorded = 0;
  // private emit: (eventName: string, args: Object) => void;

  constructor(options = {}) {
    this.clear();
    this.options = Object.assign({}, defaultOptions, options);
  }

  /**
   * Clear Current Stack
   */
  clear() {
    this.stack = { undo: [], redo: [] };
    this.emit('change', { stackLength: [0, 0] });
  }

  /**
   * Record changed and store to stack
   * @param delta
   */
  record(delta: object) {
    if (!delta) throw TypeError('Invalid record point.');
    // clear redo list on an new record point.
    this.stack.redo = [];

    const action = new Action(delta);
    this.stack.undo.push(action);

    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift();
    }
  }

  /**
   * handle undo/redo actions
   * @param source, "undo" or "redo"
   * @param dest, "redo" or "undo"
   */
  change(source: "redo" | "undo", dest: "redo" | "undo") {
    if (!this.options.enableKeyboard) return;
    if (this.stack[source].length === 0) return;

    let delta = this.stack[source].pop();
    if (!delta[source]) return;

    this.emit('change', {
      action: source.toUpperCase(),
      delta: delta[source],
      stackLength: [this.stack.redo.length, this.stack.undo.length],
    });

    this.lastRecorded = 0;
    this.stack[dest].push(delta);
  }

  /**
   * Redo last undo action.
   */
  redo() {
    this.change('redo', 'undo');
  }

  /**
   * undo last record action.
   */
  undo() {
    this.change('undo', 'redo');
  }
}

export default History;
