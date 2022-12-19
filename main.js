import {sampleAnimationPack} from './sample-animation.js';
import {loadAnimationPack} from './animation-loader.js';
import {startAnimation} from './animation-player.js';
import {Ui, createElement} from './ui.js';

class TestStuff extends Ui {
  static tag = 'test-stuff';

  async init() {
    this.setStyle({
      display: 'block',
      backgroundColor: 'black',
    });
    const canvas = createElement({tag: 'canvas'});
    this.append(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');

    await loadAnimationPack(sampleAnimationPack);

    const animation = startAnimation(sampleAnimationPack, 'dog', performance.now());
    // TODO: Update and draw animation to canvas every frame.
  }
}

async function main() {
  document.body.appendChild(TestStuff.create());
}

main();