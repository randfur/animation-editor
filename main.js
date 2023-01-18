import {sampleAnimationPack} from './sample-animation.js';
import {loadAnimationPack} from './animation-loader.js';
import {AnimationInstance} from './animation-instance.js';
import {TransformStack} from './transform-stack.js';
import {Ui, createElement} from './ui.js';
import {Mat3} from './mat3.js';

const TAU = Math.PI * 2;
function createRotate(angle) {
  return {x: Math.cos(angle), y: Math.sin(angle)};
}

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
    context.imageSmoothingEnabled = false;

    await loadAnimationPack(sampleAnimationPack);

    const animationInstance = new AnimationInstance(sampleAnimationPack, 'dog', performance.now());
    const transformStack = new TransformStack();
    transformStack.current().transformJson({
      translate: {x: 100, y: 100},
      rotate: createRotate(TAU * 0.01),
    });
    while (true) {
      const time = await new Promise(requestAnimationFrame);
      transformStack.current().reset();
      transformStack.current().transformJson({
        translate: {x: 100, y: 100},
        // rotate: createRotate(time),
      });
      animationInstance.update(time);
      animationInstance.draw(context, transformStack);
    }
  }
}

async function main() {
  document.body.appendChild(TestStuff.create());
}

main();