import {Ui} from './ui.js';

function createResolvablePromise() {
  let resolve;
  const promise = new Promise(r => resolve = r);
  promise.resolve = resolve;
  return promise;
}

async function main() {
  document.body.appendChild(new class extends Ui {
    constructor() {
      super({
        dogs: 'woof woof',
      });
    }
  }().element);
}

main();