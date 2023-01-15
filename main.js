import {sampleAnimationPack} from './sample-animation.js';
import {loadAnimationPack} from './animation-loader.js';
import {AnimationInstance} from './animation-instance.js';
import {Ui, createElement} from './ui.js';
import {Mat3} from './mat3.js';

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

    // await loadAnimationPack(sampleAnimationPack);

    // const animationInstance = new AnimationInstance(sampleAnimationPack, 'dog', performance.now());
    // console.log(animationInstance);
    // while (true) {
    //   const time = await new Promise(requestAnimationFrame);
    //   animationInstance.update(time);
    //   animationInstance.draw(context, {x: 50, y: 50});
    // // TODO: Update and draw animation to canvas every frame.
    // }

    const dogImage = new Image();
    dogImage.src = './dog.png';
    while (true) {
      const time = await new Promise(requestAnimationFrame);
      const mat3 = new Mat3();
      mat3.applyTransformJson({
        translate: {x: 100, y: 100},
      });
      mat3.applyTransformJson({
        origin: {x: 64, y: 64},
        scale: {x: 2, y: 1},
      });
      mat3.applyToContext(context);
      context.drawImage(dogImage, 0, 0);
    }
  }
}

async function main() {
  document.body.appendChild(TestStuff.create());
}

main();