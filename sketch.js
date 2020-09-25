var PLAY=1;
var END=0;
var gameState=1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var land,land2,land3,Invisibleland

var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400)  
  
  obstacleGroup=new Group();
  FoodGroup=new Group();

monkey=createSprite(50,310,10,10)  
monkey.addAnimation("running",monkey_running)
monkey.scale=0.15  
  
land=createSprite(40,390,2000,20)
land.velocityX=-9
land.shapeColor="green" 
  
land2=createSprite(2200,360,2000,80)
land2.velocityX=-9
land2.shapeColor="green"

land3=createSprite(4350,390,2000,20)
land3.velocityX=-9  
land3.shapeColor="green"
    
  score=0
  survivalTime=0
}


function draw() {
background("skyblue")
monkey.collide(land)
monkey.collide(land2)
monkey.collide(land3)
  
  
 if (gameState === PLAY) {
   
   
  if (land3.x < 0){
   land3.x=land3.width/2 
  }  
   if (keyDown("space") && monkey.y>=245){
 monkey.velocityY=-13
}
  monkey.velocityY=monkey.velocityY+0.8
  if (keyDown("space") && monkey.y>=243){
   monkey.velocityY=-13 
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  if (FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
    score=score+2
  }
   if (frameCount % 5 == 0){
     survivalTime=survivalTime+1
   }
 }
  
  if (gameState === END){
     FoodGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.destroy(monkey); 
   land.velocityX=0
   land2.velocityX=0
   land3.velocityX=0
   
   
   stroke("red")
   fill("red")
   textSize(40)
   textAlign(CENTER)
   text("GAME OVER",300,200)  
    
   
  }

  if (obstacleGroup.isTouching(monkey)){
  gameState=END
  }
  if (monkey.y>400){
   gameState=END 
  }
  
  drawSprites();
  stroke("red")
  fill("blue")
  textSize(20)
  text("Score: "+score,50,20)
  
  stroke("yellow")
  fill("blue")
  textSize(20)
  text("SURVIVAL TIME: "+survivalTime,300,20)
  
  spawnObstacles();
  spawnFood();
 
}

function spawnObstacles(){
  if (frameCount % 200 == 0){
  obstacle=createSprite(400,370,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.collide(land2)  
  obstacle.scale=0.2
  obstacle.velocityX=-9
  obstacle.lifetime=(-1) 
  //obstacle.debug=true 
  obstacle.setCollider("circle",20,20,60)  
    
  obstacleGroup.add(obstacle)  
}
}

function spawnFood(){
  if (frameCount % 80 == 0){
   banana=Math.round(random(120,200))
   banana=createSprite(400,260,10,10) 
  // banana.debug=true 
     banana.setCollider("circle",0,0,60)
     banana.addImage(bananaImage) 
     banana.scale=0.1 
     banana.velocityX=-9
     banana.lifetime=(-1) 
    
   FoodGroup.add(banana) 
  }
}

