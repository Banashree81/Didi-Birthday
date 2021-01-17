var player, ghost1, ghost2;

var score = 0;

var gameState = "play";

var h1, h2,h3;
var lives = [];
var counter = 1;
var mazeGroup;


function preload(){

  girl_dancing = loadAnimation("sprites/tile000.png","sprites/tile001.png","sprites/tile002.png",
  "sprites/tile003.png",  "sprites/tile004.png","sprites/tile005.png","sprites/tile006.png",
  "sprites/tile007.png","sprites/tile008.png");

  ghost_flying = loadAnimation("images/ghost.png", "images/ghost1.png",
  "images/ghost2.png", "images/ghost3.png" );

  monster_flying = loadAnimation("images/monster1.png","images/monster2.png","images/monster3.png" )

  giftImg = loadImage("images/gift.png")
  gift1Img = loadImage("images/gift1.png")
  gift2Img = loadImage("images/gift2.png")
  gift3Img = loadImage("images/gift3.png")
  gift4Img = loadImage("images/gift4.png")
  gift5Img = loadImage("images/gift5.png")
  gift6Img = loadImage("images/gift6.png")
  gift7Img = loadImage("images/gift7.png")
  gift8Img = loadImage("images/gift8.png")

  player_lost = loadAnimation("images/player_lost.png");
  player_stand = loadAnimation("images/player_standing.png");
  player_running = loadAnimation("images/player1.png","images/player2.png","images/player3.png", "images/player4.png")
  
  heartImg = loadImage("images/heart.jpg")

  gameOverImg = loadImage("images/gameOver.jpg")

  aduImg = loadImage("images/Adu1.png");
  punkuImg = loadImage("images/Punku.png")

  //sounds
  giftCollectSnd = loadSound("mixkit-winning-a-coin.wav");
  playerLostSnd = loadSound("mixkit-player-losing-or-failing.wav");
  gameOverSnd = loadSound("mixkit-retro-game-over-1947.wav");
  birthdaySng = loadSound("Happy_birthday_song.mp3");
}

function setup(){
createCanvas(1000,500);


mazeGroup = new Group();

player = createSprite(random(430,560),270,20,20);

player.addAnimation("standing", player_stand);
player.addAnimation("running", player_running);
player.addAnimation("sitting", player_lost);

//player.debug= true;
player.scale = 0.25;

//creating the heart animations to show the number of lives the player has left
h1 = createSprite(50,30,10,10);
h1.addImage(heartImg);
h1.scale = 0.2;
h2 = createSprite(68,30,10,10);
h2.addImage(heartImg);
h2.scale = 0.2;
h3 = createSprite(86,30,10,10);
h3.addImage(heartImg);
h3.scale = 0.2;
// h4 = createSprite(104,30,10,10);
// h4.addImage(heartImg);
// h4.scale = 0.2;
lives = [h1,h2,h3];

//create the gifts
gift = createSprite(100,100)
gift.addImage(giftImg);
gift.scale = 0.4;

gift1 = createSprite(900,400)
gift1.addImage(gift1Img);
gift1.scale = 0.4;

gift2 = createSprite(906,90)
gift2.addImage(gift2Img);
gift2.scale = 0.4;

gift3 = createSprite(350,110)
gift3.addImage(gift3Img);
gift3.scale = 0.4;

gift4 = createSprite(350,320)
gift4.addImage(gift4Img);
gift4.scale = 0.4;

gift5 = createSprite(630,110)
gift5.addImage(gift5Img);
gift5.scale = 0.4;

gift6 = createSprite(710,400)
gift6.addImage(gift6Img);
gift6.scale = 0.4;

gift7 = createSprite(100,305)
gift7.addImage(gift7Img);
gift7.scale = 0.4;

gift8 = createSprite(95,400)
gift8.addImage(gift8Img);
gift8.scale = 0.4;

//top and bottom outer walls
wall1 = createSprite(500,50,908,10);
mazeGroup.add(wall1)
wall2 = createSprite(500,450,908,10);
mazeGroup.add(wall2)

//left and right outer walls
wall3 = createSprite(51,250,10,400);
mazeGroup.add(wall3)
wall4 = createSprite(949,250,10,400);
mazeGroup.add(wall4)

//innermost box walls
innerBottomWall = createSprite(500,290,194,10)
mazeGroup.add(innerBottomWall)
innerTopWall1  = createSprite(440,225,73,10)
mazeGroup.add(innerTopWall1)
innerTopWall2  = createSprite(560,225,73,10)
mazeGroup.add(innerTopWall2)
innerLeftWall = createSprite(408,255,10,65)
mazeGroup.add(innerLeftWall)
innerRightWall  = createSprite(592,255,10,65)
mazeGroup.add(innerRightWall)

//LHS maze walls
maze1 = createSprite(145,155,10,80)
maze2 = createSprite(145,350,10,80)
maze3 = createSprite(100,155,90,10)
maze4 = createSprite(100,350,90,10)
mazeGroup.add(maze1)
mazeGroup.add(maze2)
mazeGroup.add(maze3)
mazeGroup.add(maze4)


//RHS maze walls
maze5 = createSprite(855,155,10,80)
maze6 = createSprite(855,350,10,80)
maze7 = createSprite(900,155,90,10)
maze8 = createSprite(900,350,90,10)
mazeGroup.add(maze5)
mazeGroup.add(maze6)
mazeGroup.add(maze7)
mazeGroup.add(maze8)

//Inner lhs top plus sign
mazeLT1 = createSprite(310,155,10,100)
mazeLT2 = createSprite(310,155,160,10)
mazeGroup.add(mazeLT1)
mazeGroup.add(mazeLT2)

//Inner lhs bottom plus sign
mazeLB1 = createSprite(310,350,10,100)
mazeLB2 = createSprite(310,350,160,10)
mazeGroup.add(mazeLB1)
mazeGroup.add(mazeLB2)

//Inner rhs top plus sign
mazeRT1 = createSprite(675,155,10,100)
mazeRT2 = createSprite(675,155,160,10)
mazeGroup.add(mazeRT1)
mazeGroup.add(mazeRT2)

//Inner lhs bottom plus sign
mazeRB1 = createSprite(675,350,10,100)
mazeRB2 = createSprite(675,350,160,10)
mazeGroup.add(mazeRB1)
mazeGroup.add(mazeRB2)


//lhs 3 walls between the maze and plus
midLeftWallT = createSprite(220,78,10,50)
midLeftWallM = createSprite(220,250,10,80)
midLeftWallB = createSprite(220,422,10,50)
mazeGroup.add(midLeftWallT)
mazeGroup.add(midLeftWallM)
mazeGroup.add(midLeftWallB)

//rhs 3 walls between the maze and plus
midRightWallT = createSprite(765,78,10,50)
midRightWallM = createSprite(765,250,10,80)
midRightWallB = createSprite(765,422,10,50)
mazeGroup.add(midRightWallT)
mazeGroup.add(midRightWallM)
mazeGroup.add(midRightWallB)


//top T sign
topVertical = createSprite(495,130,10,80)
topHorizontal = createSprite(495,90,80,10)
mazeGroup.add(topVertical)
mazeGroup.add(topHorizontal)

//bottom T sign
bottomVertical = createSprite(495,370,10,80)
bottomHorizontal = createSprite(495,410,80,10)
mazeGroup.add(bottomVertical)
mazeGroup.add(bottomHorizontal)

mazeGroup.setColorEach("purple")

ghost1 = createSprite(884,250,10,10);
ghost1.addAnimation("flying", ghost_flying);
ghost1.scale= 0.5;
ghost1.setVelocity(3,1.4);
//ghost1.debug= true

ghost2 = createSprite(88,250,10,10);
ghost2.addAnimation("mflying", monster_flying);
ghost2.scale= 0.4;
ghost2.setVelocity(3,-1.5);
//ghost2.debug = true;

gameOver = createSprite(500,250);
gameOver.addImage(gameOverImg);
gameOver.scale = 1.5;
gameOver.visible = false;


bg1 = createSprite(500,250, width, height)
bg1.shapeColor = "orange";
bg1.visible = false;

p1 = createSprite(500,250);
p1.addAnimation("dancing", girl_dancing);
p1.visible = false;

ground = createSprite(500,400,1000,20);
ground.visible = false;

obj1 = createSprite(300, 350,10,10);
obj1.addImage(aduImg)
obj1.scale = 0.3;
obj1.visible = false;

obj2 = createSprite(700, 350,10,10);
obj2.addImage(punkuImg)
obj2.scale = 0.2;
obj2.visible = false;

}

function draw(){
  background(0);

  fill("white")
  textSize(20)
  //line(500,50,500,450)
  textFont("Courier New")
  

  //text(mouseX + ' , '+mouseY, mouseX,mouseY)

  if(gameState=== "play") {

    player.scale = 0.25;

    //make the player animation move only when right or left arrow key is pressed
    player.changeAnimation("standing", player_stand);

    //make player move with the help of the arrow keys
    if(keyDown(UP_ARROW)){
     
      player.y = player.y -7;
    }
    if(keyDown(DOWN_ARROW)){
  
      player.y = player.y + 7;
    }
    if(keyDown(LEFT_ARROW)){
     
      player.changeAnimation("running", player_running);
      player.mirrorX(-1)
      player.x = player.x -7;
    }
    if(keyDown(RIGHT_ARROW)){
    
      player.changeAnimation("running", player_running);
      player.mirrorX(1)
      player.x = player.x + 5;
    }

       
    //increase score if player touches the gifts
    if(player.isTouching(gift) || player.isTouching(gift1)|| player.isTouching(gift2) || player.isTouching(gift3)
    || player.isTouching(gift4)|| player.isTouching(gift5)|| player.isTouching(gift6) || player.isTouching(gift7)
    || player.isTouching(gift8)){
      score+=50;
      giftCollectSnd.play();

      if(player.isTouching(gift)){    
        gift.x = 43;
        gift.y = 480;
      }
      if(player.isTouching(gift1)){
        gift1.x = 93;
        gift1.y = 480;
      }
      if(player.isTouching(gift2)){
        
        gift2.x = 143;
        gift2.y = 480;
      }
      if(player.isTouching(gift3)){
        
        gift3.x = 193;
        gift3.y = 480;
      }
      if(player.isTouching(gift4)){
       
        gift4.x = 243;
        gift4.y = 480;
      }
      if(player.isTouching(gift5)){
        
        gift5.x = 293;
        gift5.y = 480;
      }
      if(player.isTouching(gift6)){
        
        gift6.x = 343;
        gift6.y = 480;
      }
      if(player.isTouching(gift7)){
       
        gift7.x = 393;
        gift7.y = 480;
      }
      if(player.isTouching(gift8)){
     
        gift8.x = 443;
        gift8.y = 480;
      }
  
    }
    
    //stop the game if player touches the ghost
    if(player.isTouching(ghost1) || player.isTouching(ghost2)){    
      
      //decreasing the number of lives when ghost touches player
      if(lives.length > 0){
        lives[lives.length-1].destroy();
        lives.pop();
      }
        
      //End the game if all lives are lost
      if(lives.length === 0){
        gameState = "over";
        gameOverSnd.play();
      }else {
        gameState = "end";   
        playerLostSnd.play();  
      }
      
      
    }

    //end the game if player collects all the gifts
    if(score === 450){     
      gameState = "win";    
      birthdaySng.play();
    }

  } //end of gamestate play

 else if(gameState === "win"){          
    
    ghost1.destroy();
    ghost2.destroy();
    player.destroy();
    bg1.visible = true;
    
    p1.visible = true;
    //p1.debug = true;
    obj1.visible = true;
    obj2.visible = true;
    
    
    if(obj1.collide(ground)){
      obj1.velocityY = -16;
    }

    obj1.velocityY = obj1.velocityY + random(0.3,0.8);    
    
    
    if(obj2.collide(ground)){
      obj2.velocityY = -16;
    }

    obj2.velocityY = obj2.velocityY + random(0.4,0.8);  ;
    

 }
 else if(gameState === "end"){  
   
    ghost1.setVelocity(0,0);
    ghost2.setVelocity(0,0);
    player.scale = 0.3
    player.changeAnimation("sitting",player_lost); 

    textSize(20)
    text("Aww, Please try again. Press 'R' to restart.", 200,26);      


  }else if(gameState === "over"){
   
    ghost1.destroy();
    ghost2.destroy();

    gameOver.visible= true;
  }

  if(keyDown("r")&& gameState === "end"){
    gameState = "play";
    counter++;   
    
    player.changeAnimation("standing", player_stand);
    player.x = random(430,560);
    player.y = 270;
    ghost1.setVelocity(3,1.4);
    ghost2.setVelocity(3,-1.5);
    
  }


  //make player bounce off all the walls and maze

  player.bounceOff(innerBottomWall)
  player.bounceOff(innerTopWall1)
  player.bounceOff(innerTopWall2)
  player.bounceOff(innerLeftWall)
  player.bounceOff(innerRightWall)

  player.bounceOff(wall1)
  player.bounceOff(wall2)
  player.bounceOff(wall3)
  player.bounceOff(wall4)

  player.bounceOff(maze1)
  player.bounceOff(maze2)
  player.bounceOff(maze3)
  player.bounceOff(maze4)

  player.bounceOff(maze5)
  player.bounceOff(maze6)
  player.bounceOff(maze7)
  player.bounceOff(maze8)

  player.bounceOff(mazeLT1)
  player.bounceOff(mazeLT2)
  player.bounceOff(mazeLB1)
  player.bounceOff(mazeLB2)

  player.bounceOff(mazeRT1)
  player.bounceOff(mazeRT2)
  player.bounceOff(mazeRB1)
  player.bounceOff(mazeRB2)

  player.bounceOff(midLeftWallT)
  player.bounceOff(midLeftWallM)
  player.bounceOff(midLeftWallB)
  player.bounceOff(midRightWallT)
  player.bounceOff(midRightWallM)
  player.bounceOff(midRightWallB)

  
  player.bounceOff(topVertical)
  player.bounceOff(topHorizontal)
  player.bounceOff(bottomVertical)
  player.bounceOff(bottomHorizontal)


  //make ghost turn when it bounces off the side walls
  if(ghost1.bounceOff(wall3)){
    ghost1.mirrorX(-1)
  }
  if(ghost1.bounceOff(wall4)){
    ghost1.mirrorX(1)
  }
  
  ghost1.bounceOff(wall1)
  ghost1.bounceOff(wall2)
  

  ghost2.bounceOff(wall1);
  ghost2.bounceOff(wall2);
  ghost2.bounceOff(wall3);
  ghost2.bounceOff(wall4);
 

  drawSprites();

  text("Score: "+score, 850,30)

  if(gameState === "win"){
    textSize(80);
    textFont("Brush Script MT");
    fill(255,0,50)
    text("Happy", 50,90);
    text("Birthday!", 650,450)
  }
}

function moveGhost(newGhost){
  if(newGhost.collide(mazeGroup)){
    var rand = Math.round(random(1,4));
     if(rand ===1){
        newGhost.velocityX = 5;
       newGhost.velocityY = 0;
     }else if(rand ===2){
       newGhost.velocityX = -5;
       newGhost.velocityY = 0;
       
     }else if(rand ===3){
       newGhost.velocityX = 0;
       newGhost.velocityY = 5;
       
     }else if(rand ===4){
       newGhost.velocityX = 0;
       newGhost.velocityY = -5;
     }
   }
   
 }