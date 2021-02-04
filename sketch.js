
var monkey , monkey_running,ground,groundImg;
var banana ,bananaImg, obstacle, obstacleImg;
var FoodGroup, obstacleGroup;
var score;
var gameState="PLAY";

function preload(){
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
 groundImg=loadImage("jungle.jpg");
gameOverImg=loadImage("download.png");
  
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  monkey=createSprite(80,350);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.3;
  
  ground=createSprite(windowWidth/2,50,windowWidth,windowHeight);
  ground.addImage(groundImg);
  ground.width=windowWidth;
  ground.height=windowHeight;
  ground.scale=3;
  monkey.depth=ground.depth+1;
  score=0;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  invisibleGround = createSprite(windowWidth/2,windowHeight+200,windowWidth,windowHeight);
  invisibleGround.visible = false;
  
  gameover=createSprite(750,500);
  gameover.addImage(gameOverImg);
  gameover.scale=50;
  gameover.visible=false;
  
  monkey.setCollider("rectangle",0,0,200,monkey.height);
  score=0;

}
function draw() {
background("skyblue");

  
    ground.velocityX=-3;
  if(ground.x<250){
    ground.x=352;
    }
  if(gameState==="PLAY"){
    obstacles();
    food();
  }
   if(keyDown("space")){
      monkey.velocityY=-23;
         }
  camera.position.x=windowWidth/2;
  camera.position.y=monkey.y;
  monkey.velocityY=monkey.velocityY+1.5;
   monkey.collide(invisibleGround);
  score=score+1;
    
  if(monkey.isTouching(obstacleGroup)){
   
    gameState="END";
    gameover.addImage(gameOverImg);
    gameover.visible=true;
    gameover.scale=7;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    }
  
  if(monkey.isTouching(FoodGroup)){
   FoodGroup.destroyEach();
  monkey.scale=0.5;
   score++;
  }

  drawSprites();
  text("Survival Time:"+ score, 200,100);
}
function obstacles() {

  if (frameCount % 100 === 0) {
    var obstacle = createSprite(windowWidth/2,windowHeight-200);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.3;
    obstacle.velocityX = -15;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
  }
function food(){
  if(frameCount%125===0){
    var banana=createSprite(windowWidth/2,windowHeight-300);
    banana.addImage(bananaImg);
    banana.scale=0.2;
    banana.velocityX = -20;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}
