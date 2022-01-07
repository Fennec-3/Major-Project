// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookieButton, shopButton, upgradeButton;
let cookieImage, clickedCookieImage, shopImage, clickedShopImage, buyImage, clickedBuyImage, upgradeImage, clickedUpgradeImage;
let cookieCounter = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0; //aka Cps
let minHeightWidth, shopHeight, shopWidth;
let isShop = false;
let isUpgrade = false;
let shopLocation = 10;
let buyButtonArray = [];
let shopItemArray = ["Cookie Oven", "Cookie Farm", "Cookie Mine", "Cookie Plantation", "Cookie Factory", "Cookie Laundering", "Cookie Corporation"];
let shopPriceArray = [15, 100, 1100, 12000, 130000, 1400000, 20000000];
let cpsArray = [0.1, 1, 8, 47, 260, 1400, 7800];
let upgradeItemArray = ["Stronger Fingers", "Harder Clicks", "Big Hands", "Cookie Boxing", "More Farmers", "Cookie Drills", "Cookie Manager"];
let upgradeDescriptionArray = ["2x Cookies Per Click", "2x Cookies Per Click", "2x Cookies Per Click", "2x Cookies Per Click", "New farms are twice as efficient", "New mines are twice as efficient", "Cps increased by 25%"];
let upgradePriceArray = [100, 500, 10000, 100000, 1000, 11000, 1000000];
let managerWasPurchased = false;
let cpsTime = 1000;
let priceMultiplier = 1.15;

function preload() { //loads images
  cookieImage = loadImage("assets/Cookie.png");
  clickedCookieImage = loadImage("assets/Cookie.png");
  shopImage = loadImage("assets/Shop.png");
  clickedShopImage = loadImage("assets/Shop.png");
  buyImage = loadImage("assets/Buy Button.png");
  clickedBuyImage = loadImage("assets/Buy Button.png");
  upgradeImage = loadImage("assets/Upgrade Button.png");
  clickedUpgradeImage = loadImage("assets/Upgrade Button.png");
}

function setup() { //resizes images, sets buttons, and sets shop size
  createCanvas(windowWidth, windowHeight);
  minHeightWidth = min(height, width);
  shopWidth = width/5;
  shopHeight = height/1.4;

  cookieImage.resizeNN(minHeightWidth/3, minHeightWidth/3);
  clickedCookieImage.resizeNN(minHeightWidth/3-10, minHeightWidth/3-10);
  shopImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedShopImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  buyImage.resizeNN(buyImage.width*1.7, buyImage.height*1.7);
  upgradeImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedUpgradeImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);


  cookieButton = new CircleButton(width/2, height/2, cookieImage, clickedCookieImage);
  shopButton = new SquareButton(width-50, 50, shopImage, clickedShopImage, shopImage.width, shopImage.height);
  upgradeButton = new SquareButton(width-50, shopButton.y*3, upgradeImage, clickedUpgradeImage, upgradeImage.width, upgradeImage.height);
  buyButtonSetup();
}

function draw() { //displays buttons and text
  background(15, 155, 219);
  cookieButton.display();
  shopButton.display();
  upgradeButton.display();

  displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.5, "Cookies: " + floor(cookieCounter) , minHeightWidth/14, "white", CENTER, CENTER);
  if (managerWasPurchased) {
    displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.15, "Cps: " + (cookiesPerSecond + (cookiesPerSecond/4)).toFixed(1), minHeightWidth/28, "white", CENTER, CENTER);
  } else {
    displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.15, "Cps: " + cookiesPerSecond.toFixed(1), minHeightWidth/28, "white", CENTER, CENTER);
  }

  if (millis() >= cpsTime) {
    cpsTime += 1000;
    if (managerWasPurchased) {
      cookieCounter +=  cookiesPerSecond + (cookiesPerSecond/4);
    } else {
      cookieCounter +=  cookiesPerSecond
    }
  }

  showShop();
}

function buyButtonSetup() {
  for (let i=0; i<shopHeight; i+=shopHeight/7) {
    let buyButton = new SquareButton(shopWidth-20, i+shopHeight/7.4, buyImage, clickedBuyImage, buyImage.width, buyImage.height);
    buyButtonArray.push(buyButton);
  }
}

function mousePressed() { //this determines what happens when you interact with the buttons
  if (cookieButton.mouseDetected()) {
    cookieCounter += cookiesPerClick;
    cookieButton.buttonPressed();
  }

  if (shopButton.mouseDetected()) {
    shopButton.buttonPressed();
    isShop = !isShop;
    isUpgrade = false;
  }

  if (upgradeButton.mouseDetected()) {
    upgradeButton.buttonPressed();
    isUpgrade = !isUpgrade;
    isShop = false;
  }

  for (let i=0; i<7; i++) {
    if (buyButtonArray[i].mouseDetected()) {
      if (cookieCounter >= shopPriceArray[i] && isShop) {
        buyButtonArray[i].buttonPressed();
        cookieCounter -= shopPriceArray[i];
        cookiesPerSecond += cpsArray[i];
        shopPriceArray[i] *= priceMultiplier;
      }

      if (cookieCounter >= upgradePriceArray[i] && isUpgrade) {
        cookieCounter -= upgradePriceArray[i];
        switch (true) {
          case i<4:
            cookiesPerClick *= 2;
            buyButtonArray[i].buttonPressed();
            break;
          case i<5:
            cpsArray[1] *= 2;
            buyButtonArray[i].buttonPressed();
            break;
          case i<6:
            cpsArray[2] *= 2;
            buyButtonArray[i].buttonPressed();
            break;
          case i<7:
            managerWasPurchased = true;
            buyButtonArray[i].buttonPressed();
            break;
        }
      }
    }
  }
}

function displayText(x, y, words, sizeOfText, theColor, horiAlign, vertiAlign) { //displays text
  push();
  fill(theColor);
  strokeWeight(0);
  textAlign(horiAlign, vertiAlign);
  textSize(sizeOfText);
  text(words, x, y);
  pop();
}

function showShop() { //displays building shop or upgrade shop when their button is pressed
  if (isShop || isUpgrade) {
    strokeWeight(10);
    stroke(220);
    rect(shopLocation, shopLocation, shopWidth, shopHeight);
    strokeWeight(2);
  }

  if (isShop) {
    for (let i=0; i<shopHeight; i+=shopHeight/7) {
      fill("white");
      rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
      buyButtonArray[floor(i/(shopHeight/7))].display();
      displayText(shopLocation+10, shopLocation+i+10, shopItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+25, "Price: " + floor(shopPriceArray[i/(shopHeight/7)]), 13, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+40, "Cps: " + cpsArray[i/(shopHeight/7)], 12, "black", LEFT, TOP);
    }
  }

  if (isUpgrade) {
    for (let i=0; i<shopHeight; i+=shopHeight/7) {
      fill("white");
      rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
      buyButtonArray[floor(i/(shopHeight/7))].display();
      displayText(shopLocation+10, shopLocation+i+10, upgradeItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+30, "Price: " + upgradePriceArray[i/(shopHeight/7)], 13, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+45, upgradeDescriptionArray[i/(shopHeight/7)], 13, "black", LEFT, TOP);
    }
  }
}