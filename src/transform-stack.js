import {Mat3} from './mat3.js';

/*
class TransformStack {
  stack: Array<Mat3>;
  currentIndex: number;

  constructor();
  current(): Mat3;
  save(): Mat3;
  restore(): Mat3;
}
*/
export class TransformStack {
  constructor() {
    this.stack = [new Mat3()];
    this.currentIndex = 0;
  }

  current() {
    return this.stack[this.currentIndex];
  }

  save() {
    while (this.currentIndex + 1 >= this.stack.length) {
      this.stack.push(new Mat3());
    }
    ++this.currentIndex;
    const current = this.stack[this.currentIndex];
    current.copy(this.stack[this.currentIndex - 1]);
    return current;
  }

  restore() {
    --this.currentIndex;
    return this.stack[this.currentIndex];
  }
}