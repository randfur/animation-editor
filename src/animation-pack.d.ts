interface AnimationPack {
  animations: Record<AnimationName, Animation>;
}

type AnimationName = string;

interface Animation {
  framesPerSecond: number;
  totalFrames: number;
  loop: boolean;
  transform: TransformJson;
  layers: Array<Layer>;
  subAnimations: Record<SubAnimationName, SubAnimation>;
}

interface TransformJson {
  origin: Vec2Json;
  scale: Vec2Json;
  rotate: Vec2Json;
  translate: Vec2Json;
}

interface Vec2Json {
  x: number;
  y: number;
}

interface Layer {
  transform: TransformJson;
  keyframes: Array<Keyframe>;
}

interface Keyframe {
  frameCount: number;
  transform: TransformJson;
  elements: Array<Element>;
}

type Element = {
  type: 'image';
  imageSource: string;
  image?: Image;
} | {
  type: 'subAnimation';
  subAnimationName: SubAnimationName;
};

type SubAnimationName = string;

interface SubAnimation {
  animationName: AnimationName;
  restart: boolean;
  skipSeconds: number;
}
