// Cookie Clicker
// Arman Borhan
// 11/17/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//
//resizeNN isn't my creation I found it here: https://gist.github.com/GoToLoop/2e12acf577506fd53267e1d186624d7c

let cookieButton, shopButton, upgradeButton, playButton, cheatButton, newGameButton, statsButton, upArrowButton, downArrowButton;
let cookieImage, clickedCookieImage, shopImage, clickedShopImage, buyImage, clickedBuyImage, upgradeImage, clickedUpgradeImage, playImage, clickedPlayImage, newGameImage, clickedNewGameImage, statsImage, clickedStatsImage, upArrowImage, clickedUpArrowImage, downArrowImage, clickedDownArrowImage;
let buySound, popSound, clickSound, cheatMusic;
let cookieCounter = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0; //aka Cps
let minHeightWidth, shopHeight, shopWidth, shopLocation;
let isTitleScreen = true;
let isShop = false;
let isUpgrade = false;
let secondShopPage = false;
let secondUpgradePage = false;
let isStats = false;
let totalCookiesMade = 0;
let totalCookiesSpent = 0;
let timesClicked = 0;
let buildingsPurchased = 0;
let upgradesPurchased = 0;
let statNameArray = ["Total Cookies Made: ", "Cookies Spent: ", "Times Clicked: ", "Buildings Purchased: ", "Upgrades Purchased: "];
let statArray = [];
let buyButtonArray = [];
let shopItemArray = ["Cookie Oven", "Cookie Farm", "Cookie Mine", "Cookie Factory", "Cookie Embezzlement", "Cookie Laundering", "Cookie Corporation"];
let secondShopItemArray = ["Cookie Space Program", "Cookie Spaceship", "Cookie Moon Colony", "Cookie Planet", "Cookie Solar System", "Cookie Galaxy", "Cookieverse"];
let shopPriceArray = [15, 100, 1100, 12000, 130000, 1400000, 20000000];
let secondShopPriceArray = [330000000, 5100000000, 75000000000, 1000000000000, 14000000000000, 170000000000000, 2100000000000000];
let shopCpsArray = [0.1, 1, 8, 47, 260, 1400, 7800];
let secondShopCpsArray = [44000, 260000, 1600000, 10000000, 65000000, 430000000, 2900000000];
let upgradeItemArray = ["Stronger Fingers", "More Farmers", "Cookie Drills", "OSHA Approved Factory", "Slight of Hand", "Smooth Criminal", "Political Influence"];
let secondUpgradeItemArray = ["Space Race", "Hydrazine Thrusters", "Space Capitalism", "Chocolate Chip Pumps", "Star Destroyer", "Galactic Federation", "Infinite Multiverse"];
let upgradeDescriptionArray = ["2x Cookies Per Click", "New farms are 2x as efficient", "New mines are 2x as efficient", "New factories are 2x as efficient", "Embezzle 2x as many cookies", "Launder cookies 2x as fast", "New corporations are 2x as efficient"];
let secondUpgradeDescriptionArray = ["Space Programs are 2x as fast", "Spaceships travel 2x as fast", "Moon Colonies are 2x as efficient", "Planets have 2x as much coco", "Solar Systems are 2x as efficient", "Galaxies are 2x as efficient", "Cookieverses are 2x as efficient"];
let upgradePriceArray = [100, 1000, 11000, 120000, 1300000, 14000000, 200000000];
let secondUpgradePriceArray = [3300000000, 51000000000, 750000000000, 10000000000000, 140000000000000, 1700000000000000, 21000000000000000];
let cpsTime = 1000;
let priceMultiplier = 1.15;
let upgradePriceMultiplier = 5;
let instructions = "Welcome to Cookie Clicker! In this game, cookies are EVERYTHING, so get as many as you can by clicking the massive cookie  on your screen. Once you've made some cookies, use them to buy buildings from the Shop, these buildings will then make cookies for you on their own. Buy Upgrades to make your buildings more efficient."

function preload() { //loads images, music, and sounds
  cookieImage = loadImage("assets/Cookie.png");
  clickedCookieImage = loadImage("assets/Cookie.png");
  shopImage = loadImage("assets/Shop.png");
  clickedShopImage = loadImage("assets/Shop.png");
  buyImage = loadImage("assets/Buy_Button.png");
  clickedBuyImage = loadImage("assets/Buy_Button.png");
  upgradeImage = loadImage("assets/Upgrade_Button.png");
  clickedUpgradeImage = loadImage("assets/Upgrade_Button.png");
  playImage = loadImage("assets/Play_Button.png");
  clickedPlayImage = loadImage("assets/Clicked_Play_Button.png");
  newGameImage = loadImage("assets/New_Game_Button.png");
  clickedNewGameImage = loadImage("assets/New_Game_Button.png");
  cheatButtonImage = loadImage("assets/Pog_Champ.png");
  clickedCheatImage = loadImage("assets/Pog_Champ.png");
  statsImage = loadImage("assets/Stats_Image.png");
  clickedStatsImage = loadImage("assets/Stats_Image.png");
  upArrowImage = loadImage("assets/Up_Arrow.png");
  clickedUpArrowImage = loadImage("assets/Up_Arrow.png");
  downArrowImage = loadImage("assets/Down_Arrow.png");
  clickedDownArrowImage = loadImage("assets/Down_Arrow.png");

  buySound = loadSound("assets/Coins_sound.mp3");
  popSound = loadSound("assets/Pop_sound.ogg");
  clickSound = loadSound("assets/Click_sound.mp3");
  cheatMusic = loadSound("assets/cheat_music.mp3");
}

function setup() { //resizes images, sets buttons and shop size, loads save data
  createCanvas(windowWidth, windowHeight);
  minHeightWidth = min(height, width);
  shopWidth = width/5;
  shopHeight = height/1.4;
  shopLocation = 10;

  //loading save data
  if (getItem("cookies") !== null) {
    cookieCounter = getItem("cookies");
    cookiesPerSecond = getItem("cps");
    cookiesPerClick = getItem("cpc");
    shopPriceArray = getItem("shopPrices");
    upgradePriceArray = getItem("upgradePrices");
    shopCpsArray = getItem("cpsArray");

    totalCookiesMade = getItem("totalCookies");
    totalCookiesSpent = getItem("cookiesSpent");
    timesClicked = getItem("timesClicked");
    buildingsPurchased = getItem("buildingsPurchased");
    upgradesPurchased = getItem("upgradesPurchased");
  }

  //resizing images
  cookieImage.resizeNN(minHeightWidth/2.5, minHeightWidth/2.5);
  clickedCookieImage.resizeNN(minHeightWidth/2.5-10, minHeightWidth/2.5-10);
  shopImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedShopImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  buyImage.resizeNN(buyImage.width*1.7, buyImage.height*1.7);
  upgradeImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedUpgradeImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  playImage.resizeNN(minHeightWidth/4, minHeightWidth/8);
  clickedPlayImage.resizeNN(minHeightWidth/4-10, minHeightWidth/8-10);
  newGameImage.resizeNN(minHeightWidth/4-20, minHeightWidth/8-20);
  clickedNewGameImage.resizeNN(minHeightWidth/4-30, minHeightWidth/8-30);
  cheatButtonImage.resize(minHeightWidth/5, 0);
  clickedCheatImage.resize(minHeightWidth/2, minHeightWidth/8);
  statsImage.resizeNN(minHeightWidth/8, minHeightWidth/8);
  clickedStatsImage.resizeNN(minHeightWidth/8-10, minHeightWidth/8-10);
  upArrowImage.resizeNN(minHeightWidth/16, minHeightWidth/16);
  clickedUpArrowImage.resizeNN(minHeightWidth/16-10, minHeightWidth/16-10);
  downArrowImage.resizeNN(minHeightWidth/16, minHeightWidth/16);
  clickedDownArrowImage.resizeNN(minHeightWidth/16-10, minHeightWidth/16-10);

  //button setup
  cookieButton = new CircleButton(width/2, height/2, cookieImage, clickedCookieImage);
  shopButton = new SquareButton(width-50, 50, shopImage, clickedShopImage, shopImage.width, shopImage.height);
  upgradeButton = new SquareButton(shopButton.x, shopButton.y*3, upgradeImage, clickedUpgradeImage, upgradeImage.width, upgradeImage.height);
  cheatButton = new SquareButton(upgradeButton.x, upgradeButton.y+110, cheatButtonImage, clickedCheatImage, shopImage.width, shopImage.height);
  playButton = new SquareButton(cookieButton.x, cookieButton.y+cookieButton.radius*1.5, playImage, clickedPlayImage, playImage.width, playImage.height);
  newGameButton = new SquareButton(cookieButton.x, playButton.y+90, newGameImage, clickedNewGameImage, newGameImage.width, newGameImage.height);
  statsButton = new SquareButton(50, height-50, statsImage, clickedStatsImage, statsImage.width, statsImage.height);
  upArrowButton = new SquareButton(shopWidth*1.15, shopHeight-upArrowImage.height*1.3, upArrowImage, clickedUpArrowImage, upArrowImage.width, upArrowImage.height);
  downArrowButton = new SquareButton(shopWidth*1.15, shopHeight-downArrowImage.height/3, downArrowImage, clickedDownArrowImage, downArrowImage.width, downArrowImage.height);
  buyButtonSetup();
}

function draw() { //displays buttons and text, adds cps, and saves items to local storage
  background(15, 155, 219);
  cookieButton.display();

  if (isTitleScreen) {
    playButton.display();
    newGameButton.display();
    displayText(width/2, cookieButton.y-cookieButton.radius*1.5, "Welcome to Cookie Clicker!", minHeightWidth/14, "white", CENTER, CENTER);

    displayInstructions();
  }

  else {
    shopButton.display();
    upgradeButton.display();
    cheatButton.display();
    statsButton.display();

    displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.5, "Cookies: " + floor(cookieCounter).toLocaleString() , minHeightWidth/14, "white", CENTER, CENTER);
    displayText(cookieButton.x, cookieButton.y-cookieButton.radius*1.15, "Cps: " + cookiesPerSecond.toFixed(1), minHeightWidth/28, "white", CENTER, CENTER);
  }

  if (millis() >= cpsTime) {
    cpsTime += 1000;
    cookieCounter +=  cookiesPerSecond;
    totalCookiesMade += cookiesPerSecond;
  }

  openWindow();

  storeItem("cookies", cookieCounter);
  storeItem("cps", cookiesPerSecond);
  storeItem("cpc", cookiesPerClick);
  storeItem("shopPrices", shopPriceArray);
  storeItem("upgradePrices", upgradePriceArray);
  storeItem("cpsArray", shopCpsArray);
  
  storeItem("totalCookies", totalCookiesMade);
  storeItem("cookiesSpent", totalCookiesSpent);
  storeItem("timesClicked", timesClicked);
  storeItem("buildingsPurchased", buildingsPurchased);
  storeItem("upgradesPurchased", upgradesPurchased);

  statArray = [totalCookiesMade, totalCookiesSpent, timesClicked, buildingsPurchased, upgradesPurchased];
}

function buyButtonSetup() { //creates the buy buttons for the shops
  for (let i=0; i<shopHeight; i+=shopHeight/7) {
    let buyButton = new SquareButton(shopWidth-20, i+shopHeight/7.4, buyImage, clickedBuyImage, buyImage.width, buyImage.height);
    buyButtonArray.push(buyButton);
  }
}

function mousePressed() { //this determines what happens when you interact with the buttons
  timesClicked++;

  if (isTitleScreen) {
    if (playButton.mouseDetected()) { //starts game
      playButton.buttonPressed();
      isTitleScreen = false;
    }

    if (newGameButton.mouseDetected()) { //clears save data and starts game
      newGameButton.buttonPressed();
      cookieCounter = 0;
      cookiesPerSecond = 0;
      cookiesPerClick = 1;
      shopPriceArray = [15, 100, 1100, 12000, 130000, 1400000, 20000000];
      upgradePriceArray = [100, 1000, 11000, 120000, 1300000, 14000000, 200000000];
      shopCpsArray = [0.1, 1, 8, 47, 260, 1400, 7800];

      totalCookiesMade = 0;
      totalCookiesSpent = 0;
      timesClicked = 0;
      buildingsPurchased = 0;
      upgradesPurchased = 0;

      isTitleScreen = false;
    }

  } else {
    if (cookieButton.mouseDetected()) { //adds cookies to counter
      cookieCounter += cookiesPerClick;
      totalCookiesMade += cookiesPerClick;
      cookieButton.buttonPressed();
      clickSound.play();
    }

    if (shopButton.mouseDetected()) { //opens/closes building shop
      shopButton.buttonPressed();
      isShop = !isShop;
      isUpgrade = false;
      isStats = false;
      popSound.play();
    }

    if (upgradeButton.mouseDetected()) { //opens/closes upgrade shop
      upgradeButton.buttonPressed();
      isUpgrade = !isUpgrade;
      isShop = false;
      isStats = false;
      popSound.play();
    }

    if (cheatButton.mouseDetected()) { //makes game a little easier
      cheatButton.buttonPressed();
      cookieCounter += 1000000000000000000;
      cookiesPerSecond = 69420;
      cookiesPerClick = 21;
      if (!cheatMusic.isLooping()) {
        cheatMusic.loop();
      }
    }

    if (statsButton.mouseDetected()) { //opens stat window
      statsButton.buttonPressed();
      isStats = !isStats;
      isShop = false;
      isUpgrade = false;
      popSound.play();
    }

    if (upArrowButton.mouseDetected() && (isShop || isUpgrade)) {
      upArrowButton.buttonPressed();
      if (isShop) {
        secondShopPage = false;
      } else {
        secondUpgradePage = false;
      }
      clickSound.play();
    }

    if (downArrowButton.mouseDetected() && (isShop || isUpgrade)) {
      downArrowButton.buttonPressed();
      if (isShop) {
        secondShopPage = true;
      } else {
        secondUpgradePage = true;
      }
      clickSound.play();
    }

    for (let i=0; i<7; i++) { //checks buy buttons from both shops for any purchases
      if (buyButtonArray[i].mouseDetected()) {
        if (cookieCounter >= shopPriceArray[i] && isShop) {
          if (secondShopPage === false) {
            //First Shop page
            buySound.play();
            buyButtonArray[i].buttonPressed();
            cookieCounter -= shopPriceArray[i];
            totalCookiesSpent += shopPriceArray[i];
            cookiesPerSecond += shopCpsArray[i];
            shopPriceArray[i] *= priceMultiplier;
            buildingsPurchased++;
          }

          //Second Shop page
          else if (secondShopPage && cookieCounter >= secondShopPriceArray[i]){
            buySound.play();
            buyButtonArray[i].buttonPressed();
            cookieCounter -= secondShopPriceArray[i];
            totalCookiesSpent += secondShopPriceArray[i];
            cookiesPerSecond += secondShopCpsArray[i];
            secondShopPriceArray[i] *= priceMultiplier;
            buildingsPurchased++;
          }
        }

        if (cookieCounter >= upgradePriceArray[i] && isUpgrade) {
          if (secondUpgradePage === false) {
            //First Upgrade page
            buySound.play();
            buyButtonArray[i].buttonPressed();
            cookieCounter -= upgradePriceArray[i];
            totalCookiesSpent += upgradePriceArray[i];
            upgradePriceArray[i] *= upgradePriceMultiplier;
            upgradesPurchased++;
            switch (true) {
              case i<1:
                cookiesPerClick *= 2;
                break;
              case i<7:
                shopCpsArray[i] *= 2;
                break;
            }
          }

          //Second Upgrade page
          else if (secondUpgradePage && cookieCounter >= secondUpgradePriceArray[i]){
            buySound.play();
            buyButtonArray[i].buttonPressed();
            cookieCounter -= secondUpgradePriceArray[i];
            totalCookiesSpent += secondUpgradePriceArray[i];
            secondUpgradePriceArray[i] *= upgradePriceMultiplier;
            upgradesPurchased++;
            secondShopCpsArray[i] *= 2;
          }
        }
      }
    }
  }
}

function displayInstructions() { //displays instructions message on title screen
  push();
  //text box
  strokeWeight(10);
  stroke(0);
  fill(0, 90);
  rect(shopLocation, height-(shopHeight/2.5 + shopLocation), shopWidth, shopHeight/2.5);

  //text
  noStroke();
  textSize(minHeightWidth/46);
  fill(255);
  textWrap(WORD);
  text(instructions, shopLocation*2, height-(shopHeight/2.5), shopWidth-shopLocation);
  pop();
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

function openWindow() { //opens a window when a button is pressed
  if (isShop || isUpgrade) {
    strokeWeight(10);
    stroke(220);
    rect(shopLocation, shopLocation, shopWidth, shopHeight);
    strokeWeight(2);
    upArrowButton.display();
    downArrowButton.display();
  }

  if (isShop) {
    if (secondShopPage === false) {
      //First shop page
      for (let i=0; i<shopHeight; i+=shopHeight/7) {
        if (cookieCounter >= shopPriceArray[i/(shopHeight/7)]) {
          fill("white");
        } else {
          fill(160);
        }
        rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
        buyButtonArray[floor(i/(shopHeight/7))].display();
        displayText(shopLocation+10, shopLocation+i+10, shopItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
        displayText(shopLocation+10, shopLocation+i+25, "Price: " + floor(shopPriceArray[i/(shopHeight/7)]).toLocaleString(), 13, "black", LEFT, TOP);
        displayText(shopLocation+10, shopLocation+i+40, "Cps: " + shopCpsArray[i/(shopHeight/7)].toLocaleString(), 12, "black", LEFT, TOP);
      }
    } 

    //Second shop page
    else {
      for (let i=0; i<shopHeight; i+=shopHeight/7) {
        if (cookieCounter >= secondShopPriceArray[i/(shopHeight/7)]) {
          fill("white");
        } else {
          fill(160);
        }
        rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
        buyButtonArray[floor(i/(shopHeight/7))].display();
        displayText(shopLocation+10, shopLocation+i+10, secondShopItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
        displayText(shopLocation+10, shopLocation+i+25, "Price: " + floor(secondShopPriceArray[i/(shopHeight/7)]).toLocaleString(), 13, "black", LEFT, TOP);
        displayText(shopLocation+10, shopLocation+i+40, "Cps: " + secondShopCpsArray[i/(shopHeight/7)].toLocaleString(), 12, "black", LEFT, TOP);
      }      
    }
  }

  if (isUpgrade) {
    if (secondUpgradePage === false) {
      //First upgrade page
      for (let i=0; i<shopHeight; i+=shopHeight/7) {
        if (cookieCounter >= upgradePriceArray[i/(shopHeight/7)]) {
          fill("white");
        } else {
          fill(160);
        }
        rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
        buyButtonArray[floor(i/(shopHeight/7))].display();
        displayText(shopLocation*2, shopLocation+i+10, upgradeItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
        displayText(shopLocation*2, shopLocation+i+30, "Price: " + upgradePriceArray[i/(shopHeight/7)].toLocaleString(), 13, "black", LEFT, TOP);
        displayText(shopLocation*2, shopLocation+i+45, upgradeDescriptionArray[i/(shopHeight/7)], 13, "black", LEFT, TOP);
      }
    }

    //Second upgrade page
    else {
      for (let i=0; i<shopHeight; i+=shopHeight/7) {
        if (cookieCounter >= secondUpgradePriceArray[i/(shopHeight/7)]) {
          fill("white");
        } else {
          fill(160);
        }
        rect(shopLocation, shopLocation+i, shopWidth, shopHeight/7);
        buyButtonArray[floor(i/(shopHeight/7))].display();
        displayText(shopLocation*2, shopLocation+i+10, secondUpgradeItemArray[i/(shopHeight/7)], 16, "black", LEFT, TOP);
        displayText(shopLocation*2, shopLocation+i+30, "Price: " + secondUpgradePriceArray[i/(shopHeight/7)].toLocaleString(), 13, "black", LEFT, TOP);
        displayText(shopLocation*2, shopLocation+i+45, secondUpgradeDescriptionArray[i/(shopHeight/7)], 13, "black", LEFT, TOP);
      }
    }
  }

  if (isStats) {
    strokeWeight(10);
    stroke(220);
    fill("white");
    rect(shopLocation, shopLocation, shopWidth, shopHeight/4);
    for (let i=0; i<statArray.length; i++) {
      displayText(shopLocation+10, shopLocation+(i+1)*20, statNameArray[i]+floor(statArray[i]).toLocaleString(), 13, "black", LEFT, TOP);
    }
  }
}