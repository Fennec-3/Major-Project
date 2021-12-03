// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookie, shop, upgrade;
let cookieImage, clickedCookieImage, shopImage, clickedShopImage;
let cookieCounter = 0;
let minHW, shopHeight, shopWidth;
let isShop = false;
let isUpgrade = false;
let shopLocation = 10;

function preload() { //loads images
  cookieImage = loadImage("assets/Cookie.png");
  clickedCookieImage = loadImage("assets/Cookie.png");
  shopImage = loadImage("assets/Shop.png");
  clickedShopImage = loadImage("assets/Shop.png");
}

function setup() { //resizes images, sets buttons, and sets shop size
  createCanvas(windowWidth, windowHeight);
  minHW = min(height, width);
  shopWidth = width/5;
  shopHeight = height/1.5;

  cookieImage.resizeNN(minHW/3, minHW/3);
  clickedCookieImage.resizeNN(minHW/3-10, minHW/3-10);
  shopImage.resizeNN(minHW/8, minHW/8);
  clickedShopImage.resizeNN(minHW/8-10, minHW/8-10);

  cookie = new Button(width/2, height/2, cookieImage, clickedCookieImage);
  shop = new Button(width-50, 50, shopImage, clickedShopImage);
  // upgrade = new Button(width-50, 160);

}

function draw() { //displays buttons and text
  background(15, 155, 219);
  cookie.display();
  shop.display();
  // upgrade.display();

  displayText(width/2, cookie.y-cookie.radius*1.5, "Cookies: " + cookieCounter, min(height, width)/14);
  showShop();
}

class Button { //class for all the buttons
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

class SquareButton {
  constructor(x, y, theImage, clickedImage, buttonWidth, buttonHeight) {
    this.x = x - x/2;
    this.y = y - y/2;
    this.image = theImage;
    this.theClickedImage = clickedImage;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.clickTime;
  }

  display() {
    if (millis() < this.clickTime + 100) {
      image(this.theClickedImage, this.x, this.y);
    }
    else {
      image(this.image, this.x, this.y);
    }
  }

  mouseDetected() {
    if (mouseX < this.x + this.buttonWidth && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.buttonHeight) {
      return true;
    } else {
      return false;
    }
  }

  buttonPressed() {
    this.clickTime = millis();
  }
}

function mousePressed() { //what happens when you interact with the buttons
  if (cookie.mouseDetected()) {
    cookieCounter++;
    cookie.buttonPressed();
  }
  if (shop.mouseDetected()) {
    shop.buttonPressed();
    isShop = !isShop;
    isUpgrade = false;
  }
}

function displayText(x, y, words, sizeOfText) { //displays text
  fill("white");
  strokeWeight(0);
  textAlign(CENTER, CENTER);
  textSize(sizeOfText);
  text(words, x, y);
}

function showShop() { //displays shop when button is pressed
  if (isShop === true) {
    strokeWeight(10);
    stroke(220);
    rect(shopLocation, shopLocation, shopWidth, shopHeight);
    strokeWeight(2);
    for (let i=0; i<shopHeight; i+=shopHeight/8) {
      rect(shopLocation, shopLocation+i, shopWidth, shopHeight/8);
    }
  }
}