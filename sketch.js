var coins, coinsImg;
var goombas, goombasImg;
var thwomps, thwompsImg;
var bombs, bombsImg;
var coinsG, goombasG, thwompsG, bombsG;
var road, roadImg;
var gameOver, gameOverImg;
var PLAY = 1;
var END = 0;
var coinCollection = 0;
var gameState = PLAY;
var luigi, luigiImg;

function preload() {
  roadImg = loadImage("Road.png");
  coinsImg = loadImage("coins.png");
  goombasImg = loadImage("Goomba.png");
  thwompsImg = loadImage("Thwomp.png");
  bombsImg = loadImage("bomb.png");
  gameOverImg = loadAnimation("gameOver.png");
  luigiImg = loadImage("luigi.png");
}


function setup() {
  createCanvas(400, 400);
  
  road = createSprite(200, 200);
  road.addImage(roadImg);
  road.velocityY = 5;
  
  luigi = createSprite(70, 330, 20, 20);
  luigi.addImage("luigiRunning", luigiImg);
  luigi.scale = 0.03;
  
   gameOver = createSprite(200, 200);
   gameOver.addAnimation("over", gameOverImg);
  gameOver.scale = 0.7;
  
  coinsG = new Group();
  goombasG = new Group();
  thwompsG = new Group();
  bombsG = new Group();
}



function draw() {
  
  background(0);
  luigi.x = World.mouseX;

  edges = createEdgeSprites();
  luigi.collide(edges);
  
  if (road.y > 400) {
    road.y = height / 2;
  }
  
  if (gameState === PLAY) {

    gameOver.visible = false;

    createCoins();
    createGoombas();
    createThwomps();
    createBombs();

    if (coinsG.isTouching(luigi)) {
      coinsG.destroyEach();
      coinCollection = coinCollection + 50;
    } else if (goombasG.isTouching(luigi)) {
      gameState = END;
    } else if (thwompsG.isTouching(luigi)) {
      gameState = END;
    } else {
      if (bombsG.isTouching(luigi)) {
       gameState = END;

      }

    }
    
  }

  if (gameState === END) {
    coinsG.destroyEach();
    coinsG.setVelocityYEach(0);
    goombasG.destroyEach();
    goombasG.setVelocityYEach(0);
    thwompsG.destroyEach();
    thwompsG.setVelocityYEach(0);
    bombsG.destroyEach();
    bombsG.setVelocityYEach(0);
    road.velocityY = 0;
    luigi.destroy();
    gameOver.visible = true;
  }
  drawSprites();
  textSize(20);
  fill("black");
  text("Coins Collected: " + coinCollection, 120, 30);

}

function createCoins() {
  if (World.frameCount % 80 == 0) {
    var coins = createSprite(Math.round(random(50, 350), 40, 10, 10));
    coins.addImage(coinsImg);
    coins.scale = 0.03;
    coins.velocityY = 3;
    coins.lifetime = 150;
    coinsG.add(coins);
  }
}

function createGoombas() {
  if (World.frameCount % 80 == 0) {
    var goombas = createSprite(Math.round(random(50, 350), 40, 10, 10));
    goombas.addImage(goombasImg);
    goombas.scale = 0.13;
    goombas.velocityY = 3;
    goombas.lifetime = 150;
    goombasG.add(goombas);
  }
}

function createThwomps() {
  if (World.frameCount % 150 == 0) {
    var thwomps = createSprite(Math.round(random(50, 350), 40, 10, 10));
    thwomps.addImage(thwompsImg);
    thwomps.scale = 0.1;
    thwomps.velocityY = 3;
    thwomps.lifetime = 150;
    thwompsG.add(thwomps);
  }
}

function createBombs() {
  if (World.frameCount % 150 == 0) {
    var bombs = createSprite(Math.round(random(50, 350), 40, 10, 10));
    bombs.addImage(bombsImg);
    bombs.scale = 0.1;
    bombs.velocityY = 3;
    bombs.lifetime = 150;
    bombsG.add(bombs);
  }
}