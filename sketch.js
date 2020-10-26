var bananaimg, foodGroup, obsimg, obsGroup, backgrounds, backimg, ground, score;

var monkey, monkeyimg, monkey_collided;

var gameOver, goverimg;

var PLAY, END, gameState;

function preload() {
  bananaimg = loadImage("banana.png");
  
  obsimg = loadImage("stone.png");
  
  backimg = loadImage("jungle.jpg");
  
  monkeyimg = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png");
  
  monkey_collided = loadAnimation("monkey_collided.png");
  
  goverimg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
 
  backgrounds = createSprite(200, 1, 600, 200);
  backgrounds.addImage(backimg);
  backgrounds.x = backgrounds.width/2
  backgrounds.velocityX = -7;
  
  monkey = createSprite(80, 180, 20, 50);
  monkey.addAnimation("monkeyimg", monkeyimg);
  monkey.scale = 0.1;
  
  ground = createSprite(200, 190, 600, 10);
  ground.visible = false;
  
  gameOver = createSprite(300, 100, 10, 10);
  gameOver.addImage(goverimg);
  gameOver.visible = false;
  
  foodGroup = createGroup();
  obsGroup = createGroup();
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
}

function draw() {
  background(220);
    
  
  if (gameState === PLAY) {
        
    switch(score) {
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40:  monkey.scale = 0.18;
        break;
      default: break;
    }
    
    if (backgrounds.x < 100) {
      backgrounds.x = backgrounds.width/2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    if (foodGroup.isTouching(monkey)) {
      score = score + 2;
      foodGroup.destroyEach();
    }
    
    if (obsGroup.isTouching(monkey)){
      gameState = END;
      
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    foods();
    obstacles();
    
  } else if (gameState === END) {
    monkey.changeAnimation("collided", monkey_collided);
    gameOver.visible = true;
    backgrounds.velocityX = 0;
    monkey.velocityY = 0;
    obsGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  monkey.collide(ground);
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
}

function foods() {
  if (frameCount%80 === 0){
    var food = createSprite(600, 100, 10, 10);
    food.scale = 0.05;
    food.addImage(bananaimg);
    food.y = Math.round(random(100, 120));
    food.velocityX = -7;
    food.lifetime = 300;
    food.depth = backgrounds.depth;
    food.depth = food.depth + 1;
    foodGroup.add(food);
  }
}

function obstacles() {
  if (World.frameCount%300 === 0) {
    var rock = createSprite(600, 160, 20, 20);
    rock.scale = 0.15;
    rock.addImage(obsimg);
    rock.velocityX = -7;
    rock.lifetime = 300;
    obsGroup.add(rock);
    
  }
}
