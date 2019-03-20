'use strict';

class Point {
  constructor (x, y) {
    this.bias = 1;
    if (!x) {
      this.x = random(-1, 1);
      this.y = random(-1, 1);
      this.label = this.y < f(this.x) ? 1 : -1;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  get pixelX () {
    return map(this.x, -1, 1, 0, width);
  }

  get pixelY () {
    return map(this.y, 1, -1, 0, height);
  }

  set pixelX (x) {
    this.x = map(x, 0, width, -1, 1);
  }
  
  set pixelY (y) {
    this.y = map(y, 0, height, 1, -1);
  }

  show () {
    stroke(0);
    if (this.label === 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(this.pixelX, this.pixelY, 16);
  }
}