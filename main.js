import {sampleAnimationPack} from './sample-animation.js';
import {loadAnimationPack} from './animation-loader.js';
import {AnimationInstance} from './animation-instance.js';
import {TransformStack} from './transform-stack.js';
import {Ui, createElement} from './ui.js';
import {Mat3} from './mat3.js';

class TestStuff extends Ui {
  static tag = 'test-stuff';

  async init() {
    this.setStyle({
      display: 'block',
      backgroundColor: 'black',
    });
    this.canvas = createElement({tag: 'canvas'});
    this.append(this.canvas);

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.imageRendering = 'pixelated';

    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;

    await loadAnimationPack(sampleAnimationPack);

    this.animationInstance = new AnimationInstance(sampleAnimationPack, 'dog', performance.now());
    this.transformStack = new TransformStack();

    this.run();
  }

  async run() {
    while (true) {
      const time = await new Promise(requestAnimationFrame);
      this.transformStack.current().reset();
      this.transformStack.current().applyToContext(this.context);

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.transformStack.current().transformJson({
        translate: {x: 100, y: 200},
      });
      this.animationInstance.update(time);
      this.animationInstance.draw(this.context, this.transformStack);
    }
  }
}

async function main() {
  document.body.appendChild(TestStuff.create());
}

main();