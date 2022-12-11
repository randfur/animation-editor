function inheritsFrom(TypeA, TypeB) {
  return TypeA === TypeB || TypeA.prototype instanceof TypeB;
}

function renderTemplate(template, slots) {
  if (template === null) {
    const element = document.createElement('div');
    element.style.display = 'none';
    return element;
  }

  if (typeof template === 'string') {
    const element = document.createElement('div');
    element.textContent = template;
    return element;
  }

  if (inheritsFrom(template, Ui)) {
    return new template().element;
  }

  if (template instanceof Array) {
    const element = document.createElement('div');
    for (const item of template) {
      element.appendChild(renderTemplate(item, slots));
    }
    return element;
  }

  console.assert(template instanceof Object);
  const element = document.createElement('div');
  for (const [key, value] of Object.entries(template)) {
    slots[key] = renderTemplate(value);
    element.appendChild(slots[key]);
  }
  return element;
}

export class Ui {
  constructor(template) {
    this.slots = {};
    this.element = renderTemplate(template, this.slots);
    this.element.model = this;
  }
}

// class AnimationEditor extends Ui {
//   static template = {
//     root: SplashScreen,
//   };
// }

// class SplashScreen extends Ui {
//   static template = {
//     title: text('Animation Editor'),
//     button: button('quit', (target, event) => target.quit()),
//   };

//   constructor() {
//     super();
//   }
// }

// class KeyframeEditor extends Ui {
//   static template = [
//     'canvas',
//     component('timeline', KeyframeTimeline),
//     element({
//       tag: 'div',
//       id: 'dog',
//       classList: ['dogs'],
//       children: [
//         element({tag: 'span', text: 'woof'}),
//       ],
//     }),
//   ];
// }
