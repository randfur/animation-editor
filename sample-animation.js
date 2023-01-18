export const sampleAnimationPack = {
  animations: {
    dog: {
      framesPerSecond: 10,
      totalFrames: 10,
      loop: true,
      layers: [{
        transform: {
          origin: {
            x: 20,
            y: 80,
          },
        },
        keyframes: [{
          frameCount: 5,
          elements: [{
            type: 'image',
            imageSource: 'dog0.png',
          }],
        }, {
          frameCount: 5,
          elements: [{
            type: 'image',
            imageSource: 'dog1.png',
          }],
        }],
      }, {
        transform: {
          translate: {
            x: 40,
            y: 40,
          },
        },
        keyframes: [{
          frameCount: 10,
          elements: [{
            type: 'ref',
            subAnimation: 'spark',
          }],
        }],
      }],
      subAnimations: {
        spark: {
          animationName: 'spark',
          restart: false,
        },
      },
    },
    spark: {
      framesPerSecond: 1,
      totalFrames: 2,
      loop: true,
      transform: {
        origin: {
          x: 16,
          y: 16,
        },
      },
      layers: [{
        keyframes: [{
          frameCount: 1,
          elements: [{
            type: 'image',
            imageSource: 'spark0.png',
          }],
        }, {
          frameCount: 1,
          elements: [{
            type: 'image',
            imageSource: 'spark1.png',
          }],
        }],
      }],
    },
  },
};
