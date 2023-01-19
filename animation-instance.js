/*
Using &T to mean T but non-owning.

class AnimationInstance {
  animationPack: &AnimationPack;
  animation: &Animation;

  startMilliseconds: number;
  currentFrame: number;
  currentLoopedFrame: number;

  layerInstances: Array<interface LayerInstance {
    layer: &interface Layer {
      transform: TransformJson;
      keyframes: Array<interface Keyframe {
        frameCount: number;
        transform: TransformJson;
        elements: Array<interface ImageElement {
          type: 'image';
          imageSource: string;
          image: Image;
        } | interface SubAnimationReferenceElement {
          type: 'ref';
          subAnimationName: string;
        }>;
      }>;
    };
    keyframes: &Array<Keyframe>;
    currentKeyframeIndex: number;
    keyframeLoopedEndFrame: number;
  }>;

  subAnimationInstances: interface { [string]: AnimationInstance };

  constructor(animationPack: &AnimationPack, animationName: &string, startMilliseconds: number);
  update(newMilliseconds: number);
  draw(context: HTMLRenderingContext2D, transformStack: TransformStack);
}
*/
export class AnimationInstance {
  constructor(animationPack, animationName, startMilliseconds) {
    this.animationPack = animationPack;
    this.animation = animationPack.animations[animationName];

    this.startMilliseconds = startMilliseconds;
    this.currentFrame = 0;
    this.currentLoopedFrame = 0;

    this.layerInstances = this.animation.layers.map(layer => {
      return {
        layer,
        keyframes: layer.keyframes,
        currentKeyframeIndex: 0,
        keyframeLoopedEndFrame: layer.keyframes[0]?.frameCount,
      };
    });

    this.subAnimationInstances = {};
    if (this.animation.subAnimations) {
      for (const [subAnimationInstanceName, subAnimation] of Object.entries(this.animation.subAnimations)) {
        this.subAnimationInstances[subAnimationInstanceName] = new AnimationInstance(
          animationPack,
          subAnimation.animationName,
          startMilliseconds - (subAnimation.skipSeconds ?? 0) * 1000,
        );
      }
    }
  }

  update(newMilliseconds) {
    if (!this.animation.loop && this.currentFrame > this.animation.totalFrames) {
      return;
    }

    const elaspedSeconds = (newMilliseconds - this.startMilliseconds) / 1000;
    const newFrame = Math.floor(elaspedSeconds * this.animation.framesPerSecond);
    const newLoopedFrame = newFrame % this.animation.totalFrames;

    // Restart animation for loop.
    if (newLoopedFrame < this.currentLoopedFrame) {
      for (const layerInstance of this.layerInstances) {
        layerInstance.currentKeyframeIndex = 0;
        layerInstance.keyframeLoopedEndFrame = layerInstance.keyframes[0]?.frameCount;
      }

      const restartMilliseconds = newMilliseconds - newLoopedFrame * this.animation.framesPerSecond * 1000;
      for (const [subAnimationInstanceName, subAnimationInstance] of Object.entries(this.subAnimationInstances)) {
        const subAnimation = this.animation.subAnimations[subAnimationInstanceName];
        if (subAnimation.restart) {
          subAnimationInstance.startMilliseconds = newMilliseconds - (subAnimation.skipSeconds ?? 0) * 1000;
        }
      }
    }

    // Progress keyframes to current time.
    for (const layerInstance of this.layerInstances) {
      while (true) {
        if (layerInstance.currentKeyframeIndex >= layerInstance.keyframes.length) {
          break;
        }

        if (layerInstance.keyframeLoopedEndFrame > newLoopedFrame) {
          break;
        }

        ++layerInstance.currentKeyframeIndex;
        if (layerInstance.currentKeyframeIndex < layerInstance.keyframes.length) {
          layerInstance.keyframeLoopedEndFrame += layerInstance.keyframes[layerInstance.currentKeyframeIndex].frameCount;
        }
      }
    }

    this.currentFrame = newFrame;
    this.currentLoopedFrame = newLoopedFrame;

    for (const subAnimationInstance of Object.values(this.subAnimationInstances)) {
      subAnimationInstance.update(newMilliseconds);
    }
  }

  draw(context, transformStack) {
    transformStack.save().transformJson(this.animation.transform);
    for (const layerInstance of this.layerInstances) {
      if (layerInstance.currentKeyframeIndex >= layerInstance.keyframes.length) {
        continue;
      }

      transformStack.save().transformJson(layerInstance.layer.transform);

      const keyframe = layerInstance.keyframes[layerInstance.currentKeyframeIndex];
      transformStack.save().transformJson(keyframe.transform);

      const elements = keyframe.elements;
      for (const element of elements) {
        transformStack.save().transformJson(element.transform);
        if (element.type === 'image') {
          transformStack.current().applyToContext(context);
          context.drawImage(element.image, 0, 0);
        } else if (element.type === 'ref') {
          this.subAnimationInstances[element.subAnimationName].draw(context, transformStack);
        }
        transformStack.restore();
      }
      transformStack.restore();
      transformStack.restore();
    }
    transformStack.restore();
  }
}
