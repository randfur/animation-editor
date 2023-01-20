let destructedSet = null;

function maybeDestruct(property, value) {
  if (value instanceof Raii && !property.endsWith('Ref')) {
    value.destructor();
  }
}

const raiiHandler = {
  set(target, property, value, receiver) {
    const existing = Reflect.get(target, property, receiver);
    maybeDestruct(property, existing);
    return Reflect.set(target, property, value, receiver);
  }
};

let inCreate = false;

export class Raii {
  static create(...args) {
    inCreate = true;
    const value = new this(...args);
    console.assert(value instanceof Raii);
    inCreate = false;
    return new Proxy(value, raiiHandler);
  }

  constructor() {
    console.assert(inCreate);
  }

  destructor() {
    let destructionRoot = !destructedSet;
    if (destructionRoot) {
      destructedSet = new Set();
      destructedSet.add(this);
    } else if (destructedSet.has(this)) {
      return;
    }

    for (const [property, value] of Object.entries(this)) {
      maybeDestruct(property, value);
    }

    this.customDestructor?.();

    if (destructionRoot) {
      destructedSet = null;
    }
  }
}

export async function raiiRoot(run) {
  let root = Raii.create();
  await run(root);
  root.destructor();
}
