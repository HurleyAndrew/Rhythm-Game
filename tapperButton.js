class tapperButton {
  constructor(xPos, yPos, size, hue, railID) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.hue = hue;
    this.railID = railID;
  }


  isOverlapping(x, y) {
    if ((x < this.xPos + this.size && x > this.xPos - this.size) && (y < this.yPos + this.size && y > this.yPos - this.size)) {

      return true;
    } else {
      return false;
    }

  }
  isTapped() {
    //   if x and y are within the circle
    //     if mouse x is less then this.x+width and greater then x-this.size
    if ((mouseX < this.xPos + this.size && mouseX > this.xPos - this.size) && (mouseY < this.yPos + this.size && mouseY > this.yPos - this.size)) {

      return railID;
    }
  }

  update() {

  }

  display() {
    push();
    strokeWeight(5);
    colorMode(HSB, 360, 100, 100);
    fill(10, 100, 54);
    ellipse(this.xPos, this.yPos, this.size, this.size);
    pop();
  }
}