export const sampleAnimationPack = {
  animations: {
    dog: {
      framesPerSecond: 10,
      totalFrames: 4,
      loop: true,
      transform: { origin: { x: 20, y: 80 } },
      layers: [{
        keyframes: [{
          frameCount: 2,
          elements: [{
            type: 'image',
            imageSource: 'dog0.png',
          }],
        }, {
          frameCount: 2,
          elements: [{
            type: 'image',
            imageSource: 'dog1.png',
          }],
        }],
      }, {
        transform: { translate: { x: -5, y: 40 } },
        keyframes: [{
          frameCount: 4,
          elements: [{
            type: 'ref',
            subAnimationName: 'spark0',
          }],
        }],
      }, {
        transform: { translate: { x: 45, y: -5 } },
        keyframes: [{
          frameCount: 4,
          elements: [{
            type: 'ref',
            subAnimationName: 'spark1',
          }],
        }],
      }, {
        transform: { translate: { x: 105, y: 15 } },
        keyframes: [{
          frameCount: 4,
          elements: [{
            type: 'ref',
            subAnimationName: 'spark2',
          }],
        }],
      }],
      subAnimations: {
        spark0: {
          animationName: 'spark',
          restart: false,
          skipSeconds: 0,
        },
        spark1: {
          animationName: 'spark',
          restart: false,
          skipSeconds: 0.2,
        },
        spark2: {
          animationName: 'spark',
          restart: false,
          skipSeconds: 0.6,
        },
      },
    },
    spark: {
      framesPerSecond: 2,
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
