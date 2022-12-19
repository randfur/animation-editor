const loadingImages = new Map();

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

export async function loadAnimationPack(animationPack) {
  const promises = [];
  for (const [animationName, animation] of Object.entries(animationPack.animations)) {
    for (const layer of animation.layers) {
      for (const keyframe of layer.keyframes) {
        for (const element of keyframe.elements) {
          if (element.type === 'image' && !element.image) {
            promises.push((async () => {
              element.image = await loadImage(element.imageSource);
            })());
          }
        }
      }
    }
  }
  return Promise.all(promises);
}