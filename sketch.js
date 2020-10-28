var PLAY = 1;
var END = 0;
var gameState = PLAY;



var bg, bgImage, invisibleGround;
var ground, groundImage;
var coinGroup,coinImage;
var robot, robotImage;
var obstaclesGroup;
var obstacle1;
var obstacle2;
var score = 0;
var farmland,farmlandImg; 

localStorage["HighestScore"] = 0;

var restart, restartImage;


function preload() {

  obstacle1 = loadImage("obstacle.png");
  obstacle2 = loadImage("obstacle2.png")
  bgImage = loadImage("sci fi.png");
  groundImage = loadImage("ground2.png");
  robotImage = loadImage("robot.png");
  coinImage = loadImage("coin_gold.png");
  farmlandImg= loadImage("farmland.png");


  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);

      
  bg = createSprite(400, 300, 50, 20);
 bg.addImage("ground", bgImage);
  bg.scale = 2.21;


  invisibleGround = createSprite(300, 410, 600, 20);
  invisibleGround.visible = false;

  robot = createSprite(300, 370, 20, 10);
  robot.addImage(robotImage);
  robot.scale = 0.25;
  robot.setCollider("rectangle",0,0,robot.width,robot.height)
robot.debug=false;
 

  ground = createSprite(200, 400, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3 * score / 100);

  restart = createSprite(300, 140);
  restart.addImage(restartImage);
  restart.scale = 0.1;

  restart.visible = false;

  obstaclesGroup = new Group();
coinGroup = new Group();
}

function draw() {
 
  if(score%20>10){
    bg.addImage("ground", farmlandImg);
  bg.scale = 2.21;
     fill("pink");
  textSize(25);
  textFont("Comic Sans MS")
   text("Score: "+ score, 450,30);
  text("Score: "+ localStorage["HighestScore"], 200,30);
}
 
  
    else{
      bg.addImage("ground", bgImage);
  bg.scale = 2.21;
     fill("teal");
  textSize(25);
  textFont("Comic Sans MS")
   text("Score: "+ score, 450,30);
  text("Score: "+ localStorage["HighestScore"], 200,30);
    }

  text("Score: "+ score, 500,50);
  
    //console.log(robot.y)
  
  if (gameState===PLAY){
   
    restart.visible= false;
    
   
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && robot.y >=256) {
      robot.velocityY = -15;
    }
  
    robot.velocityY = robot.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    robot.collide(invisibleGround);
    
    if(coinGroup.isTouching(robot)){
      coinGroup.destroyEach();
      score= score+2;
    }
    spawnCoin();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(robot)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    robot.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
 
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
    
      if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }
  }
  
  




  drawSprites();

 text("Score: "+ score, 400,30);
  text("High Score: "+ localStorage["HighestScore"], 10,30);
}



function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 370, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);


    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;

      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



function spawnCoin() {
  if (frameCount %100 === 0) {
    var coin = createSprite(600,610,40,10);
    coin.y = Math.round(random(300,100));
   coin.addImage(coinImage);
    coin.scale = 0.5
    coin.velocityX=-(9+3*frameCount/1000);
    
    coin.lifetime = 600;
    
    coinGroup.add(coin);
  }
}



function reset() {
  gameState = PLAY;


  obstaclesGroup.destroyEach();

    
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  



  score = 0;

}