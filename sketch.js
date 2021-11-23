// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cookie, shop, upgrade, cookieImg;
let cookieCounter = 0;

function preload() {
  cookieImg = loadImage("assets/pixil-frame-0.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cookie = new Button(width/2, height/2, cookieImg);
  // shop = new Button(width-50, 50, 40);
  // upgrade = new Button(width-50, 160, 40);
}

function draw() {
  background(220);
  cookie.display();
  // shop.display();
  // upgrade.display();

  displayText(width/2, height/2-150, "Cookies: " + cookieCounter, 50);
}

class Button {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.radius = theImage.width/2;
    this.image = theImage;
    this.image.resize(width/3, width/3);
  }

  display() {
    imageMode(CENTER);
    circle(this.x, this.y, 200);
    image(this.image, this.x, this.y);
    
  }

  mouseDetected() {
    if (mouseX > this.x - this.radius && mouseX < this.x + this.radius && mouseY > this.y - this.radius && mouseY < this.y + this.radius) {
      return true;
    } else {
      return false;
    }
  }
}

function mousePressed() {
  if (cookie.mouseDetected()) {
    cookieCounter++;
  }
}

function displayText(x, y, words, sizeOfText) {
  textAlign(CENTER, CENTER);
  textSize(sizeOfText);
  text(words, x, y);
}