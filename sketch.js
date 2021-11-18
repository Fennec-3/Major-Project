// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cookie, shop, upgrade;
let cookieCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cookie = new Button(width/2, height/2, 75);
  shop = new Button(width-50, 50, 40);
  upgrade = new Button(width-50, 160, 40);
}

function draw() {
  background(220);
  cookie.display();
  shop.display();
  upgrade.display();

  textSize(50);
  text(cookieCounter, width/2, height/2-200);
}

class Button {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    // this.image = theImage;
  }

  display() {
    fill("blue");
    circle(this.x, this.y, this.radius*2);
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