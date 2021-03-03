var PLAY = 1;
var END = 0;
var gameState = PLAY;
  
  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var food,foodGroup,obstacle,obstacleGroup;
  var score;
  var background,backgroundImage;
  
  var score = 0;

  function preload(){

  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage ("backgroundi.jpg");
  }
  function setup() {
  createCanvas(600, 300);
    
  background = createSprite(300,150,700,20);
  background.addImage(backgroundImage);

  monkey = createSprite(50,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  invisibleground = createSprite(300,290,700,20);
  invisibleground.visible=false;
  obstacleGroup = new Group();
  bananaGroup = new Group();
  }
  function draw() {
  
  if(gameState === PLAY){
  background.velocityX = -3;
  if (background.x < +100){
  background.x = background.width/2;
  }
  if(keyDown("space")&& monkey.y >= 220) {
  monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleground);
  if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
  score=score+2;
  monkey.scale += 0.04;
  }
//   if(obstacleGroup.isTouching(monkey)){
//   monkey.scale=0.1;
//   }


  spawnFood();
  spawnobstacle();

  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
  }
  }

else if (gameState === END) {
      background.velocityX = 0;
      monkey.visible=false;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      textSize(30);
      text("Game Over!",300,150);
}

  drawSprites();
  fill ("green")
   textSize(20);
   text("score: "+score,500,50);

//   switch(score){
//   case  4 :monkey.scale=0.12;
//         break;
//   case  6 :monkey.scale=0.14;
//         break;
//   case  8 :monkey.scale=0.16;
//         break;
//   case  10 :monkey.scale=0.18;
//         break;
//   default: break;
//   }
//    var survibleTime=0; 
//   stroke("black");
//   textSize(20);
//   fill("black");
//   survibleTime = Math.ceil(frameCount/frameRate());
//   text("survible Time: "+survibleTime,200,50);
  }
  function spawnFood(){
  if (frameCount % 100 === 0) {
  var banana = createSprite(600,120,40,10);
  banana.y = Math.round(random(100,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  //assign lifetime to the variable
  banana.lifetime = 200;
  bananaGroup.add(banana);
  }}

function spawnobstacle(){
  if (frameCount % 300 === 0) {
   var obstacle = createSprite(600,270,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.setCollider("circle",0,0,250);
    //assign lifetime to the variable
    obstacle.lifetime = 200;
    //add each cloud to the group
    obstacleGroup.add(obstacle);
    }}
