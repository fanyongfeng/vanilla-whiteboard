const INTERVAL = 1000;

/**
 * Runtime Context of current playback.
 */
class Pointer {
  _clientStartTime = 0; //客户端时间用于和playback时间戳计算偏移量。
  currentStamp = 0;
  index = 0;
  constructor() {
    this._clientStartTime = +new Date();
  }
  next() {}
}

class Snapshot {
  videos = [];
  whiteboard = [];
  chat = [];
  constructor() {}
}

class SnapshotProvider {
  cached = {};
  get() {}
}

class EventPlayer {
  events = [];
  members = [];
  roomInfo = null;
  _pointer = null;

  _timer = 0;
  _currentTime = 0;
  _startTime = 0;
  _duration = 0;

  constructor(logs) {
    this._preprocess(logs);
    this.snapshotProvider = new SnapshotProvider();
  }

  _preprocess({ head, events }) {
    this.members = head.minfo.map(item => JSON.parse(item));
    this.roomInfo = typeof head.rinfo === 'string' ? JSON.parse(head.rinfo) : head.rinfo;
    console.log(events.length);

    let lastPointTS = 0;
    for (let i = 0, len = events.length; i < len; i++) {
      let _event = events[i];

      if (_event.sid === 7 && _event.ssid === 11) continue;
      if (_event.sid === 4 && _event.ssid === 22) {
        if (lastPointTS === _event.ts) continue;
        lastPointTS = _event.ts;
      }
      let { body, ...rest } = _event;
      // this.events.push({ ...rest, body : JSON.parse(body) });
      this.events.push({ ...rest, body: body });
    }
  }

  get pointer() {
    if (this._pointer) return this._pointer;
    return (this._pointer = new Pointer());
  }

  _tickAction() {
    this.pointer.next();
  }

  seek(time) {
    if (time > 10000000000) time /= 100; // mill-seconds -> seconds
    let snapshot = this.snapshotProvider.get(time);
    if (!snapshot) {
      snapshot = this.calcSnapShot();
    }
  }

  play() {
    this._timer = window.setInterval(() => {
      this._tickAction();
    }, INTERVAL);

    this._tickAction();
  }

  pause() {
    window.clearInterval(this._timer);
  }
}

export default EventPlayer;
