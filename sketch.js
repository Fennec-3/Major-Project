// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// temp list of things: cookieCounter, CPS, shopPriceArray, upgradePriceArray, shopCpsArray
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookieButton, shopButton, upgradeButton, playButton;
let cookieImage, clickedCookieImage, shopImage, clickedShopImage, buyImage, clickedBuyImage, upgradeImage, clickedUpgradeImage, playImage, clickedPlayImage;
let backgroundMusic, buySound, popSound, clickSound, cheatMusic;
let cookieCounter = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0; //aka Cps
let minHeightWidth, shopHeight, shopWidth;
let isTitleScreen = true;
let isShop = false;
let isUpgrade = false;
let shopLocation = 10;
let buyButtonArray = [];
let shopItemArray = ["Cookie Oven", "Cookie Farm", "Cookie Mine", "Cookie Factory", "Cookie Embezzlement", "Cookie Laundering", "Cookie Corporation"];
let shopPriceArray = [15, 100, 1100, 12000, 130000, 1400000, 20000000];
let shopCpsArray = [0.1, 1, 8, 47, 260, 1400, 7800];
let upgradeItemArray = ["Stronger Fingers", "More Farmers", "Cookie Drills", "OSHA Approved Factory", "Slight of Hand", "Smooth Criminal", "Political Influence"];
let upgradeDescriptionArray = ["2x Cookies Per Click", "New farms are twice as efficient", "New mines are twice as efficient", "New factories are twice as efficient", "Embezzle twice as many cookies", "New Laundering facilities are twice as efficient", "New corporations are twice as efficient"];
let upgradePriceArray = [100, 1000, 11000, 120000, 1300000, 14000000, 200000000];
let managerWasPurchased = false;
let cpsTime = 1000;
let priceMultiplier = 1.15;
let upgradePriceMultiplier = 10;

function preload() { //loads images, music, and sounds
  cookieImage = loadImage("assets/Cookie.png");
  clickedCookieImage = loadImage("assets/Cookie.png");
  shopImage = loadImage("assets/Shop.png");
  clickedShopImage = loadImage("assets/Shop.png");
  buyImage = loadImage("assets/Buy Button.png");
  clickedBuyImage = loadImage("assets/Buy Button.png");
  upgradeImage = loadImage("assets/Upgrade Button.png");
  clickedUpgradeImage = loadImage("assets/Upgrade Button.png");
  playImage = loadImage("assets/Play Button.png");
  clickedPlayImage = loadImage("assets/Clicked Play Button.png");
  cheatButtonImage = loadImage("assets/pog champ.png");
  clickedCheatImage = loadImage("assets/pog champ.png");

  backgroundMusic = loadSound("assets/Lay Low.mp3");
  buySound = loadSound("assets/Coins_sound.mp3");
  popSound = loadSound("assets/Pop_sound.ogg");
  clickSound = loadSound("assets/Click_sound.mp3");
  cheatMusic = loadSound("assets/cheat music.mp3");
}

function setup() { //resizes images, sets buttons, and sets shop size
  createCanvas(windowWidth, windowHeight);
  minHeightWidth = min(height, width);
  shopWidth = width/5;
  shopHeight = height/1.4;

  if (getItem("cookies") !== null) {
    cookieCounter = getItem("cookies");
    cookiesPerSecond = getItem("cps");
    cookiesPerClick = getItem("cpc");
    shopPriceArray = getItem("shopPrices");
    upgradePriceArray = getItem("upgradePrices");
    shopCpsArray = getItem("cpsArray");
  }

  cookieImage.resizeNN(minHeightWidth/3, minHeightWidth/3);
  clickedCookieImage.resizeNN(minHeightWidth/3-10, minHeightWidth/3-10);
  shopImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedShopImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  buyImage.resizeNN(buyImage.width*1.7, buyImage.height*1.7);
  upgradeImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedUpgradeImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  playImage.resizeNN(minHeightWidth/4, minHeightWidth/8);
  clickedPlayImage.resizeNN(minHeightWidth/4-10, minHeightWidth/8-10);
  cheatButtonImage.resize(minHeightWidth/5, 0);
  clickedCheatImage.resize(minHeightWidth/8-10, minHeightWidth/8-10);

  cookieButton = new CircleButton(width/2, height/2, cookieImage, clickedCookieImage);
  shopButton = new SquareButton(width-50, 50, shopImage, clickedShopImage, shopImage.width, shopImage.height);
  upgradeButton = new SquareButton(shopButton.x, shopButton.y*3, upgradeImage, clickedUpgradeImage, upgradeImage.width, upgradeImage.height);
  cheatButton = new SquareButton(upgradeButton.x, upgradeButton.y+110, cheatButtonImage, clickedCheatImage, shopImage.width, shopImage.height);
  playButton = new SquareButton(cookieButton.x, cookieButton.y+250, playImage, clickedPlayImage, playImage.width, playImage.height);
  newGameButton = new SquareButton(cookieButton.x, playButton.y+100, playImage, clickedPlayImage, playImage.width, playImage.height)
  buyButtonSetup();
}

function draw() { //displays buttons and text
  background(15, 155, 219);
  cookieButton.display();

  if (isTitleScreen) {
    playButton.display();
    newGameButton.display();
    displayText(width/2, cookieButton.y-cookieButton.radius*2, "Welcome to Cookie Clicker!", minHeightWidth/14, "white", CENTER, CENTER);
  } 
  else {
    shopButton.display();
    upgradeButton.display();
    cheatButton.display();

    displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.5, "Cookies: " + floor(cookieCounter).toLocaleString() , minHeightWidth/14, "white", CENTER, CENTER);
    if (managerWasPurchased) {
      displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.15, "Cps: " + ((cookiesPerSecond + (cookiesPerSecond/4)).toFixed(1)).toLocaleString(), minHeightWidth/28, "white", CENTER, CENTER);
    } else {
      displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.15, "Cps: " + cookiesPerSecond.toFixed(1), minHeightWidth/28, "white", CENTER, CENTER);
    }
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

  storeItem("cookies", cookieCounter);
  storeItem("cps", cookiesPerSecond);
  storeItem("cpc", cookiesPerClick);
  storeItem("shopPrices", shopPriceArray);
  storeItem("upgradePrices", upgradePriceArray);
  storeItem("cpsArray", shopCpsArray);
}

function buyButtonSetup() {
  for (let i=0; i<shopHeight; i+=shopHeight/7) {
    let buyButton = new SquareButton(shopWidth-20, i+shopHeight/7.4, buyImage, clickedBuyImage, buyImage.width, buyImage.height);
    buyButtonArray.push(buyButton);
  }
}

function mousePressed() { //this determines what happens when you interact with the buttons
  if (isTitleScreen) {
    if (playButton.mouseDetected()) { //starts game
      playButton.buttonPressed();
      backgroundMusic.loop();
      isTitleScreen = false;
    }
  } else {
    if (cookieButton.mouseDetected()) { //adds cookies to counter
      cookieCounter += cookiesPerClick;
      cookieButton.buttonPressed();
      clickSound.play();
    }

    if (shopButton.mouseDetected()) { //opens/closes shop
      shopButton.buttonPressed();
      isShop = !isShop;
      isUpgrade = false;
      popSound.play();
    }

    if (upgradeButton.mouseDetected()) { //opens/closes upgrade shop
      upgradeButton.buttonPressed();
      isUpgrade = !isUpgrade;
      isShop = false;
      popSound.play();
    }

    if (cheatButton.mouseDetected()) { //makes game a little easier
      cheatButton.buttonPressed();
      cookieCounter += 1000000000;
      cookiesPerSecond = 69420;
      cookiesPerClick = 21;
      backgroundMusic.stop();
      if (!cheatMusic.isLooping()) {
        cheatMusic.loop();
      }
    }

    for (let i=0; i<7; i++) { //checks buy buttons from both shops for any purchases
      if (buyButtonArray[i].mouseDetected()) {
        if (cookieCounter >= shopPriceArray[i] && isShop) {
          buySound.play();
          buyButtonArray[i].buttonPressed();
          cookieCounter -= shopPriceArray[i];
          cookiesPerSecond += shopCpsArray[i];
          shopPriceArray[i] *= priceMultiplier;
        }

        if (cookieCounter >= upgradePriceArray[i] && isUpgrade) {
          buySound.play();
          buyButtonArray[i].buttonPressed();
          cookieCounter -= upgradePriceArray[i];
          upgradePriceArray[i] *= upgradePriceMultiplier;
          switch (true) {
            case i<1:
              cookiesPerClick *= 2;
              break;
            case i<7:
              shopCpsArray[i] *= 2;
              break;
          }
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
      displayText(shopLocation+10, shopLocation+i+25, "Price: " + floor(shopPriceArray[i/(shopHeight/7)]).toLocaleString(), 13, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+40, "Cps: " + shopCpsArray[i/(shopHeight/7)], 12, "black", LEFT, TOP);
    }
  }

  if (isUpgrade) {
    for (let i=0; i<shopHeight; i+=shopHeight/7) {
      fill("white");
      rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
      buyButtonArray[floor(i/(shopHeight/7))].display();
      displayText(shopLocation+10, shopLocation+i+10, upgradeItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+30, "Price: " + upgradePriceArray[i/(shopHeight/7)].toLocaleString(), 13, "black", LEFT, TOP);
      displayText(shopLocation+10, shopLocation+i+45, upgradeDescriptionArray[i/(shopHeight/7)], 13, "black", LEFT, TOP);
    }
  }
}