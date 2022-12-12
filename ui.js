function inheritsFrom(TypeA, TypeB) {
  return TypeA === TypeB || TypeA.prototype instanceof TypeB;
}

class CreateUi {
  constructor(uiType, initParams={}) {
    console.assert(inheritsFrom(uiType, Ui));
    this.uiType = uiType;
    this.initParams = initParams;
  }
}

function appendFlattened(destination, element, isContainer) {
  if (isContainer) {
    for (const child of element.children) {
      destination.appendChild(child);
    }
  } else {
    destination.appendChild(element);
  }
}

function renderTemplate(template, refs) {
  if (template === null) {
    const element = document.createElement('div');
    element.style.display = 'none';
    return {
      element,
      isContainer: false,
    };
  }

  if (typeof template === 'string') {
    const element = document.createElement('div');
    element.textContent = template;
    return {
      element,
      isContainer: false,
    };
  }

  if (template instanceof CreateUi) {
    const {uiType, initParams} = template;
    if (!customElements.get(uiType.tag)) {
      customElements.define(uiType.tag, uiType);
    }
    const element = document.createElement(uiType.tag);
    element.init(initParams);
    return {
      element,
      isContainer: false,
    };
  }

  if (template instanceof Array) {
    const container = document.createElement('div');
    for (const item of template) {
      const {element, isContainer} = renderTemplate(item, refs);
      appendFlattened(container, element, isContainer);
    }
    return {
      element: container,
      isContainer: true,
    };
  }

  console.assert(template instanceof Object);
  const container = document.createElement('div');
  for (const [key, value] of Object.entries(template)) {
    const {element} = renderTemplate(value, refs);
    element.id = key;
    refs[key] = element;
    container.appendChild(element);
  }
  return {
    element: container,
    isContainer: true,
  };
}

export class Ui extends HTMLElement {
  render(template) {
    this.refs = {};
    const {element, isContainer} = renderTemplate(template, this.refs);
    appendFlattened(this, element, isContainer);
  }
}

export function createUi(uiType, initParams) {
  return new CreateUi(uiType, initParams);
}

export function runUi(uiType, initParams) {
  document.body.appendChild(renderTemplate(createUi(uiType, initParams), {}).element);
}
