// Represents the following matrix shape:
// [a c e]
// [b d f]
// [0 0 1]
// This matches the parameters of HTMLCanvasContext2D.setTransform().
export class Mat3 {
  constructor({a=1, b=0, c=0, d=1, e=0, f=0}={}) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  setIdentity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
  }

  copy(otherMat3) {
    this.a = otherMat3.a;
    this.b = otherMat3.b;
    this.c = otherMat3.c;
    this.d = otherMat3.d;
    this.e = otherMat3.e;
    this.f = otherMat3.f;
  }

  applyTransformJson(transformJson) {
    // interface TransformJson {
    //   origin: Vec2Json;
    //   scale: Vec2Json;
    //   rotate: Vec2Json;
    //   translate: Vec2Json;
    // }

    // The matrix is multiplied on the left of a column vector, we know this because otherwise e and f would pollute the final row.
    // These work, idk why but they do so trust them. We manually tested them.
    // The nice order of thinking is:
    // Apply outer transforms like camera first, then instance transform then part transform.
    // For each transform apply origin, scale, rotate then translate.
    // In reality everything is flipped, idk why.
    const multiplyLeft = false;
    const reverseOrder = true;

    const multiplyWith = (otherMat3) => {
      const [l, r] = multiplyLeft ? [otherMat3, this] : [this, otherMat3];
      // [l.a l.c l.e] * [r.a r.c r.e]
      // [l.b l.d l.f] * [r.b r.d r.f]
      // [  0   0   1] * [  0   0   1]
      this.a = l.a * r.a + l.c * r.b;
      this.b = l.b * r.a + l.d * r.b;
      this.c = l.a * r.c + l.c * r.d;
      this.d = l.b * r.c + l.d * r.d;
      this.e = l.a * r.e + l.c * r.f + l.e;
      this.f = l.b * r.e + l.d * r.f + l.f;
    }

    // Position reference:
    // [a c e]
    // [b d f]
    // [0 0 1]
    const mat3sToMultiply = [
      // origin
      new Mat3({
        e: -(transformJson.origin?.x ?? 0),
        f: -(transformJson.origin?.y ?? 0),
      }),

      // scale
      new Mat3({
        a: transformJson.scale?.x ?? 1,
        d: transformJson.scale?.y ?? 1,
      }),

      // rotate
      // Rotate (x, y) by (rx, ry)
      // (x + iy) * (rx + iry)
      // x*rx - y*ry + i(x*ry + y*rx)
      //
      // Because e and f are on the right we must be multiplying by column vectors.
      // [a c e]   [x]   [ax + cy + e]
      // [b d f] * [y] = [bx + dy + f]
      // [0 0 1]   [1]   [1]
      new Mat3({
        a: transformJson.rotate?.x ?? 1,
        b: transformJson.rotate?.y ?? 0,
        c: -(transformJson.rotate?.y ?? 0),
        d: transformJson.rotate?.x ?? 1,
      }),

      // translate
      new Mat3({
        e: transformJson.translate?.x ?? 0,
        f: transformJson.translate?.y ?? 0,
      }),
    ];

    if (reverseOrder) {
      mat3sToMultiply.reverse();
    }

    for (const mat3 of mat3sToMultiply) {
      multiplyWith(mat3);
    }
  }

  applyToContext(context) {
    context.setTransform(this.a, this.b, this.c, this.d, this.e, this.f);
  }
}
