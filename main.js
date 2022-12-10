import {Raii, raiiRoot} from './raii.js';

class Element extends Raii {
  constructor({tag, parent, text, onClick}) {
    super();
    this.element = document.createElement(tag);
    this.element.textContent = text;
    if (onClick) {
      this.element.addEventListener('click', onClick);
    }
    parent.appendChild(this.element);
  }

  customDestructor() {
    this.element.remove();
  }
}

function createResolvablePromise() {
  let resolve;
  const promise = new Promise(r => resolve = r);
  promise.resolve = resolve;
  return promise;
}

async function main() {
  await raiiRoot(async root => {
    const clicked = createResolvablePromise();
    root.button = Element.create({
      tag: 'button',
      parent: document.body,
      text: 'click me',
      onClick: clicked.resolve,
    });
    root.text = Element.create({
      tag: 'div',
      parent: document.body,
      text: 'bark bark bark brak',
    });
    await clicked;
  });
}

main();