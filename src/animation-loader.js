// import {AnimationPack} from './animation-pack.d.ts';

// loadingImages: Map<string, Promise<Image>>;
const loadingImages = new Map();

// loadImage: (imageSource: string) => Promise<Image>;
async function loadImage(imageSource) {
  if (!loadingImages.has(imageSource)) {
    loadingImages.set(imageSource, new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', event => {
        resolve(image);
      });
      image.src = imageSource;
    }));
  }
  return loadingImages.get(imageSource);
}

// loadAnimationPack: (directoryPath) => Promise<AnimationPack>;
export async function loadAnimationPack(directoryPath) {
  const animationPack = await (await fetch(`${directoryPath}/animation-pack.json`)).json();
  const promises = [];
  for (const [animationName, animation] of Object.entries(animationPack.animations)) {
    for (const layer of animation.layers) {
      for (const keyframe of layer.keyframes) {
        for (const element of keyframe.elements) {
          if (element.type === 'image' && !element.image) {
            promises.push((async () => {
              element.image = await loadImage(`${directoryPath}/${element.imageSource}`);
            })());
          }
        }
      }
    }
  }
  await Promise.all(promises);
  return animationPack;
}