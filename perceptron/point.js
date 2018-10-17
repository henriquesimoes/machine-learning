'use strict';

class Point {
  constructor (x, y) {
    if (!x) {
      this.x = random(0, width);
      this.y = random(0, height);
      this.label = this.x > this.y ? 1 : -1;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  show () {
    stroke(0);
    if (this.label === 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, 16);
  }
}