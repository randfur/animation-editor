export const sampleAnimationPack = {
  animations: {
    dog: {
      framesPerSecond: 10,
      transform: {
        origin: {
          x: 20,
          y: 80,
        },
      },
      layers: [{
        keyframes: [{
          frameCount: 1,
          elements: [{
            type: 'image',
            imageSource: 'dog.png',
          }, {
            type: 'ref',
            subAnimation: 'spark',
            transform: {
              translate: {
                x: 10,
                y: 10,
              },
            },
          }],
        }],
      }],
      subAnimations: {
        spark: {
          animationName: 'spark',
        },
      },
    },
    spark: {
      framesPerSecond: 1,
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
