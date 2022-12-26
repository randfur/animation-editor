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

    let allAtEnd = true;
    let endFrame = 0;
    for (const layerInstance of this.layerInstances) {
      // TODO: Increment keyframe index and end frame.
      // TODO: Set endFrame if layer is at end.
      while (true) {
        // States before & after ignoring loops:
        // A) Still within same keyframe.
        // B) Past end of keyframe into following keyframe.
        // C) Past end of last keyframe.

        if (layerInstance.keyframeIndex >= layerInstance.keyframes.length) {
          endFrame = layerInstance.keyframeEndFrame;
          break;
        }
        if (currentFrame < layerInstance.keyframeEndFrame) {
          allAtEnd = false;
          break;
        }
        const keyframe = layerInstance.keyframes[layerInstance.keyframeIndex];
        // TODO: Increment to next keyframe.
      }
    }

    if (allAtEnd && this.animation.loop) {
      // TODO: Restart all layers with overshoot offsets.
    }
  }

  draw(context, translate) {
    for (const layerInstance of this.layerInstances) {
      // TODO: Draw keyframe elements with appropriate transforming.
    }
  }
}
