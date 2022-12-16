import {Ui, createElement} from './ui.js';

class App extends Ui {
  static tag = 'test-bark';
  init() {
    this.text = createElement({text: 'dog'});

    this.uiButton = createElement({
      tag: 'button',
      text: 'click me',
      events: {
        click: () => this.text.textContent = 'bark',
      },
    });

    this.append(
      this.text,
      this.uiButton,
    );
  }
}

async function main() {
  document.body.appendChild(App.create());
}

main();