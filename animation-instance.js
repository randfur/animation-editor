export class AnimationInstance {
  constructor(animationPack, animationName, startMilliseconds) {
    this.animationPack = animationPack;
    this.animationName = animationName;
    this.startMilliseconds = startMilliseconds;

    this.animation = animationPack.animations[animationName];

    this.layerInstances = this.animation.layers.map(layer => {
      return {
        keyframes: layer.keyframes,
        keyframeIndex: 0,
        keyframeEndFrame: layer.keyframes[0].frameCount,
      };
    });

    this.subAnimationInstances = {};
    if (this.animation.subAnimations) {
      for (const [subAnimationInstanceName, subAnimation] of Object.entries(this.animation.subAnimations)) {
        this.subAnimationInstances[subAnimationInstanceName] = new AnimationInstance(animationPack, subAnimation.animationName, startMilliseconds);
      }
    }
  }

  update(newMilliseconds) {
    const elaspedSeconds = (newMilliseconds - this.startMilliseconds) / 1000;
    const currentFrame = Math.floor(elaspedSeconds / this.animation.framesPerSecond);

    // for (const layerInstance of this.layerInstances) {
    //   // TODO: Increment keyframe index and end frame.
    //   // TODO: Set endFrame if layer is at end.
    //   while (true) {
    //     // States before & after ignoring loops:
    //     // A) Still within same keyframe.
    //     // B) Past end of keyframe into following keyframe.
    //     // C) Past end of last keyframe.

    //     if (layerInstance.keyframeIndex >= layerInstance.keyframes.length) {
    //       break;
    //     }
    //     if (currentFrame < layerInstance.keyframeEndFrame) {
    //       break;
    //     }
    //     const keyframe = layerInstance.keyframes[layerInstance.keyframeIndex];
    //     // TODO: Increment to next keyframe.
    //   }
    // }

    // for (const subAnimationInstance of Object.values(this.subAnimationInstances)) {
    //   subAnimationInstances.update(newMilliseconds);
    // }
  }

  draw(context, transformStack) {
    transformStack.save().transformJson(this.animation.transform);
    for (const layerInstance of this.layerInstances) {
      if (layerInstance.keyframeIndex >= layerInstance.keyframes.length) {
        continue;
      }

      transformStack.save().transformJson(layerInstance.transform);
      const elements = layerInstance.keyframes[layerInstance.keyframeIndex].elements;
      for (const element of elements) {
        transformStack.save().transformJson(element.transform);
        if (element.type === 'image') {
          transformStack.current().applyToContext(context);
          context.drawImage(element.image, 0, 0);
        } else if (element.type === 'ref') {
          this.subAnimationInstances[element.subAnimation].draw(context, transformStack);
        }
        transformStack.restore();
      }
      transformStack.restore();
    }
    transformStack.restore();
  }
}
