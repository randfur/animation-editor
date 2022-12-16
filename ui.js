const registered = new Set();

export class Ui extends HTMLElement {
  static tag = null;

  static create(initParams) {
    if (!registered.has(this)) {
      console.assert(!customElements.get(this.tag));
      customElements.define(this.tag, this);
      registered.add(this);
    }
    const instance = document.createElement(this.tag);
    instance.init(initParams);
    return instance;
  }
}

export function createElement({tag='div', text='', children}) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (children) {
    element.append(...children);
  }
  return element;
}
