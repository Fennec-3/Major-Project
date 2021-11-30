// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookie, shop, upgrade;
let cookieImg, clickedCookie, shopImg;
let cookieCounter = 0;

function preload() {
  cookieImg = loadImage("assets/Cookie.png");
  clickedCookie = loadImage("assets/Cookie.png");
  shopImg = loadImage("assets/Shop.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cookieImg.resizeNN(min(height, width)/3, min(height, width)/3);
  clickedCookie.resizeNN(min(height, width)/3-10, min(height, width)/3-10);

  cookie = new Button(width/2, height/2, cookieImg, clickedCookie);
  shop = new Button(width-50, 50, shopImg);
  // upgrade = new Button(width-50, 160);

}

function draw() {
  background(15, 155, 219);
  cookie.display();
  shop.display();
  // upgrade.display();

  displayText(width/2, cookie.y-cookie.radius*1.5, "Cookies: " + cookieCounter, min(height, width)/14);
}

class Button {
  constructor(x, y, theImage, clickedImage) {
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.theClickedImage = clickedImage;
    this.radius = theImage.width/2;
    this.clickTime;
  }

  display() {
    imageMode(CENTER);
    if (millis() < this.clickTime + 100) {
      image(this.theClickedImage, this.x, this.y);
      console.log("hi");
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

function mousePressed() {
  if (cookie.mouseDetected()) {
    cookieCounter++;
    cookie.buttonPressed();
  }
}

function displayText(x, y, words, sizeOfText) {
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(sizeOfText);
  text(words, x, y);
}