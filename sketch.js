var PLAY = 1;
var END = 0
var gameState = PLAY;

var sword, fruit1, fruit2, fruit3, fruit4, monster1, monster2;
var swordImage, fruit1Image, fruit2Image, fruit3Image, fruit4Image, monster1Image, monster2Image, gameoverImage;
var knifeSwooshSound, gameOverSound;

var score;

function preload() {

  swordImage = loadImage("sword.png");

  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  gameoverImage = loadImage("gameover.png")

  monsterImage = loadImage("alien1.png", "alien2.png");

  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(500, 600);

  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.setCollider("rectangle", 0, 0, 100, 100)
  sword.debug = false;

  fruitGroup = new Group();
  enemyGroup = new Group();

  score = 0;
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    sword.x = World.mouseX;
    sword.y = World.mouseY;

    fruits();
    enemy();

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
      knifeSwooshSound.play();
    } else {
      if (enemyGroup.isTouching(sword)) {
        gameState = END;
        gameOverSound.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();

        fruitGroup.setVelocityEach(0);
        enemyGroup.setVelocityEach(0);

        sword.addImage(gameoverImage);
        sword.x = 200;
        sword.y = 200;
      }
    }
  }



  drawSprites();
  
  text("score: "+score,300,30);
}

function fruits() {
  if (World.frameCount % 80 === 0) {
   
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    
    

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else if (r == 4) {
      fruit.addImage(fruit4Image);
    }

    fruit.Y = Math.round(random(50, 340));

   
    
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
    
     position = Math.round(random(1,2));
   if(position == 1)
   {
      fruit.x=400;
      fruit.velocityX = -(7+(score/4));
   }else
   if(position == 2)
    {
      fruit.x=0;
      fruit.velocityX = (7+(score/4));
    } 
  }
   
  }


function enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.Y = Math.round(random(50, 340));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    enemyGroup.add(monster);
  }
}