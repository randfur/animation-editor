export class AnimationInstance {
  constructor(animationPack, animationName, startTime) {
    this.animationPack = animationPack;
    this.animationName = animationName;
    this.startTime = startTime;

    this.animation = animationPack.animations[animationName];
    this.layerInstances = this.animation.layers.map(layer => {
      return {
        // TODO: Timing stuff.
      };
    });

    this.subAnimationInstances = {};
    if (this.animation.subAnimations) {
      for (const [subAnimationInstanceName, subAnimation] of Object.entries(this.animation.subAnimations)) {
        this.subAnimationInstances[subAnimationInstanceName] = new AnimationInstance(animationPack, subAnimation.animationName, startTime);
      }
    }
  }

  update(newTime) {
  }

  draw(context, translate) {
  }
}
