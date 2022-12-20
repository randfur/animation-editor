export class AnimationInstance {
  constructor(animationPack, animationName, startMilliseconds) {
    this.animationPack = animationPack;
    this.animationName = animationName;
    this.startMilliseconds = startMilliseconds;
    this.currentMilliseconds = startMilliseconds;
    this.currentFrame = 0;

    this.animation = animationPack.animations[animationName];

    this.layerInstances = this.animation.layers.map(layer => {
      return {
        // TODO: Timing stuff.
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
    this.currentMilliseconds = newMilliseconds;
    const oldFrame = this.currentFrame;
    const elaspedSeconds = (this.currentMilliseconds - this.startMilliseconds) / 1000;
    this.currentFrame = Math.floor(elaspedSeconds / this.animation.framesPerSecond);

    let allAtEnd = false;
    let endFrame = 0;
    for (const layerInstance of this.layerInstances) {
      // TODO: Increment keyframe index and end frame.
      // TODO: Set endFrame if layer is at end.
      if (this.currentFrame > layerInstance.keyframeEndFrame) {
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
