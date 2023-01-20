// registered: Set<Ui>;
const registered = new Set();

/*
class Ui extends HTMLElement {
  static tag: string;
  static create(initParams: object);
  abstract init(initParams: object);
  setStyle(style: object);
}
*/
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

  setStyle(style) {
    for (const [property, value] of Object.entries(style)) {
      this.style[property] = value;
    }
  }
}

export function createElement({tag='div', text='', events, children}) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (events) {
    for (const [eventName, handler] of Object.entries(events)) {
      element.addEventListener(eventName, handler);
    }
  }
  if (children) {
    element.append(...children);
  }
  return element;
}
