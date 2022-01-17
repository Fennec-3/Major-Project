class CircleButton { //class for all the circle buttons
    constructor(x, y, theImage, clickedImage) {
      this.x = x;
      this.y = y;
      this.image = theImage;
      this.theClickedImage = clickedImage;
      this.radius = max(theImage.width/2, theImage.height/2);
      this.clickTime;
    }
  
    display() {
      imageMode(CENTER);
      if (millis() < this.clickTime + 100) {
        image(this.theClickedImage, this.x, this.y);
      }
      else {
        image(this.image, this.x, this.y);
      }
    }
  
    mouseDetected() {
      if (mouseX > this.x - this.radius && mouseX < this.x + this.radius && mouseY > this.y - this.radius && mouseY < this.y + this.radius) {
        return true;
      } else {
        return false;
      }
    }
  
    buttonPressed() {
      this.clickTime = millis();
    }
  }
  
  class SquareButton extends CircleButton { //class for all the square buttons
    constructor(x, y, theImage, clickedImage, buttonWidth, buttonHeight) {
      super(x, y, theImage, clickedImage);
      this.x = x;
      this.y = y;
      this.image = theImage;
      this.theClickedImage = clickedImage;
      this.buttonWidth = buttonWidth/2;
      this.buttonHeight = buttonHeight/2;
      this.clickTime;
    }
  
    mouseDetected() {
      if (mouseX < this.x + this.buttonWidth && mouseX > this.x - this.buttonWidth && mouseY > this.y - this.buttonHeight && mouseY < this.y + this.buttonHeight) {
        return true;
      } else {
        return false;
      }
    }
  }