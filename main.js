import {Ui, createElement} from './ui.js';

class UiButton extends Ui {
  static tag = 'ui-button';
  init({text, onClick}) {
    this.button = createElement({
      tag: 'button',
      text,
    });
    this.button.addEventListener('click', onClick);

    this.append(this.button);
  }
}

class App extends Ui {
  static tag = 'test-bark';
  init() {
    this.text = createElement({text: 'dog'});
    this.uiButton = UiButton.create({
      text: 'click me',
      onClick: () => this.text.textContent = 'bark',
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