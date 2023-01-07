import {Mat3} from './mat3.js';

export class TransformStack {
  constructor() {
    this.stack = [new Mat3()];
    this.currentIndex = 0;
  }

  save() {
    while (this.currentIndex >= this.stack.length) {
      this.stack.push(new Mat3());
    }
    ++this.currentIndex;
    const current = this.stack[currentIndex];
    current.copy(this.stack[currentIndex - 1]);
    return current;
  }

  restore() {
    --this.currentIndex;
    return this.stack[currentIndex];
  }
}