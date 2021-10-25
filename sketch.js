var heartImg, bgImg, shooterImg, shootingImg, zombieImg; 

var heart1, heart2, heart3, bg, shooter, shooting, zombie;

var zombieGrp, bulletGrp;

var score = 0;

var life = 3;

var bulletCount = 70;

var gameState = 'fight';

var lose, win, explosion;

function preload(){
heartImg = loadImage("Images/heart_1.png");

bgImg = loadImage("Images/bg.jpeg");

shooterImg = loadImage("Images/shooter_2.png");
shootingImg = loadImage("Images/shooter_3.png");

zombieImg = loadImage("Images/zombie.png");

lose = loadSound('Sounds/lose.mp3');

win  = loadSound('Sounds/win.mp3');

explosion = loadSound('Sounds/explosion.mp3');

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  zombieGrp = new Group();

  bulletGrp = new Group();

  bg = createSprite(displayWidth/2-20, displayHeight/2-20, 20, 20);
  bg.scale = 1.1;
  bg.addImage(bgImg);

  shooter = createSprite(displayWidth-1200, displayHeight-300, 20, 20);
  shooter.scale = 0.5;
  shooter.addImage(shooterImg);

  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.addImage(heartImg);
  heart1.scale = 0.5;
  heart1.visible = false;

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.addImage(heartImg);
  heart2.scale = 0.5;
  heart2.visible = false;
  
  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.addImage(heartImg);
  heart3.scale = 0.5;
}

function draw() {
  background(255,255,255); 

  if(gameState === 'fight'){
    
    if(life === 3){
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if(life === 2){
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }

    if(life === 1){
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }

    if(life === 0){
      gameState = 'lost';

      lose.play();
    }

    if(score === 100){
      gameState = 'won';

      win.play();
    }

    if(keyWentDown('space')){
      bullet = createSprite(displayWidth-1200, shooter.y-30, 20, 10);
      bullet.velocityX = 10;
      bulletGrp.add(bullet);
      shooter.addImage(shootingImg);
      explosion.play();
      bulletCount = bulletCount-1;
      
    }

    else if(keyWentUp('space')){
      shooter.addImage(shooterImg);

    }

    if(bulletCount === 0){
      gameState = 'bullet';
      lose.play();
    }

    if(bulletGrp.isTouching(zombieGrp)){
      zombieGrp.destroyEach();
      score = score+1;
    }

    if(zombieGrp.isTouching(shooter)){
      life = life-1;

    }

    if(gameState === 'lost'){

      textSize(100);
      text("You Lost!!", 400, 400);
      zombieGrp.destroyEach();
      shooter.destroy();
    }

    else if(gameState === 'won'){

      textSize(100);
      text("You Won!!", 400, 400);
      zombieGrp.destroyEach();
      shooter.destroy();
    }
    
    else if(gameState === 'bullet'){

      textSize(50);
      text("You Ran Out of Bullets!!", 400, 400);
      zombieGrp.destroyEach();
      shooter.destroy();
      bulletGroup.destroyEach();
    }

    if(keyDown("up")){
      shooter.y = shooter.y-30;

    }

    if(keyDown("down")){
      shooter.y = shooter.y+30;

    }
  }


  
  spawnEnemy();

  drawSprites();

  textSize(20);
  fill("white");
  text("Score: " + score, displayWidth-200, displayHeight/2-220);

  text("Lives: " + life, displayWidth-200, displayHeight/2-250);

  text("Bullets Left: " + bulletCount, displayWidth-200, displayHeight/2-280);
}

function spawnEnemy(){

  if(frameCount % 80 === 0){

    zombie = createSprite(random(500, 1100), random(100, 500), 20, 20);
    zombie.scale = 0.2;
    zombie.addImage(zombieImg);
    zombie.velocityX = -3;
    zombie.lifetime = 400;
    zombieGrp.add(zombie);

  }
}