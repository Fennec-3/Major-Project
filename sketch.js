// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookieButton, shopButton, upgradeButton;
let cookieImage, clickedCookieImage, shopImage, clickedShopImage, buyImage;
let cookieCounter = 0;
let minHW, shopHeight, shopWidth;
let isShop = false;
let isUpgrade = false;
let shopLocation = 10;
let buyButtonArray = [];
let shopTextArray = ["Grandma", "CookieBot 9000", "Cookie Farm", "Cookie Mine", "Cookie Plantation", "Cookie Pyramid Scheme", "Cookie Laundering"];

function preload() { //loads images
  cookieImage = loadImage("assets/Cookie.png");
  clickedCookieImage = loadImage("assets/Cookie.png");
  shopImage = loadImage("assets/Shop.png");
  clickedShopImage = loadImage("assets/Shop.png");
  buyImage = loadImage("assets/Buy Button.png");
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

  cookieButton = new CircleButton(width/2, height/2, cookieImage, clickedCookieImage);
  shopButton = new SquareButton(width-50, 50, shopImage, clickedShopImage, shopImage.width, shopImage.height);
  // upgrade = new Button(width-50, 160);

  buyButtonSetup();
}

function draw() { //displays buttons and text
  background(15, 155, 219);
  cookieButton.display();
  shopButton.display();
  // upgrade.display();

  displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.5, "Cookies: " + cookieCounter, min(height, width)/14, "white");
  showShop();
}

class CircleButton { //class for all the buttons
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

class SquareButton extends CircleButton {
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

function mousePressed() { //this determines what happens when you interact with the buttons
  if (cookieButton.mouseDetected()) {
    cookieCounter++;
    cookieButton.buttonPressed();
  }
  if (shopButton.mouseDetected()) {
    shopButton.buttonPressed();
    isShop = !isShop;
    isUpgrade = false;
  }
}

function buyButtonSetup() {
  for (let i=0; i<shopHeight; i+=shopHeight/8) {
    let buyButton = new SquareButton(shopWidth-10, i+shopHeight/8, buyImage, buyImage, buyImage.width, buyImage.height);
    buyButtonArray.push(buyButton);
  }
}

function displayText(x, y, words, sizeOfText, theColor) { //displays text
  fill(theColor);
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
      fill("white");
      rect(shopLocation, shopLocation+i, shopWidth, shopHeight/8);
      buyButtonArray[floor(i/(shopHeight/8))].display();
      displayText(shopWidth/4, i+shopHeight/16, shopTextArray[i/(shopHeight/8)], 15, "black");
    }
  }
}