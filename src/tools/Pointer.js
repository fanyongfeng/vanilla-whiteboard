import Image from '../graphic/shape/Image';

export default class Pointer {
  constructor() {
    this.pointer = new Image();
  }
  onMouseMove({ point }) {
    this.pointer.position = point;
  }
}
