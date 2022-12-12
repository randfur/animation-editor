import {runUi, Ui} from './ui.js';

async function main() {
  runUi(class extends Ui {
    static tag = 'test-bark';
    init() {
      this.render([
        {text: 'dogs'},
      ]);
    }
  });
}

main();