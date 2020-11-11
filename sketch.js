var backgroundimage;
var gameState, form, player, playerCount=0,allplayers=[];
var PlayerRight,PlayerLeft, AIPlayer;
var InvisibleGround,InvisibleGround2;
var GoalRight,GoalLeft;
var Ball;
var Lcr7,LEdisonCavani,LGriezman,LZlatanIbrahimovic;
var Rcr7,REdisonCavani,RGriezman,RZlatanIbrahimovic;
var ballImage;
var title, select, button1,button2;
var box,compimage,gstage=0;
var RightScore = 0;
var LeftScore = 0;
var Goal, Goalimage;
var gameover, overimage, reload,reloadimage;


function preload(){
  backgroundimage = loadImage("Images/bgimage.jpg");
  RZlatanIbrahimovic = loadImage("Images/ZLATAN IBRAHIMOVIC.png");
  RGriezman = loadImage("Images/FLIPPED GRIEZMAN.png")
  ballImage =loadImage("Images/foootball.png");
  compimage =  loadImage("Images/MESSI.png");
  Goalimage = loadImage("Images/goal image.jpg");
  overimage = loadImage("Images/GameOver.png");
  reloadimage = loadImage("Images/RELOAD.png")
}

function setup(){
  createCanvas(displayWidth-100,displayHeight-150);

      
        PlayerRight = createSprite(displayWidth-500,displayHeight/2);
        PlayerRight.addImage(RZlatanIbrahimovic);
        PlayerRight.scale = 0.6
      
        PlayerLeft = createSprite(displayWidth-800,450,50,50);
        PlayerLeft.addImage(RGriezman);
        PlayerLeft.visible=false;
        PlayerLeft.scale = 0.2;
        //PlayerLeft.visible = false;
        Ball = createSprite(displayWidth-680,450,30,30);  
        Ball.addImage(ballImage);
        Ball.scale=0.05;
        InvisibleGround = createSprite(640,550,width,5);
        InvisibleGround.visible = false;
        InvisibleGround2 = createSprite(640,150,width,5);
        InvisibleGround2.visible = false;
        //Ball.visible = false;

        Goal = createSprite(600,166,10,10);
        Goal.scale = 0.5;
        Goal.addImage(Goalimage);
        Goal.visible = false;

        gameover = createSprite(600,150);
        gameover.addImage(overimage);
        gameover.visible = false;
        gameover.scale = 0.3;

        reload = createSprite(600,500);
        reload.addImage(reloadimage);
        reload.visible = false;
        reload.scale = 0.1;

        gameState = "wait"
        form = new Form();
  
}

function draw(){
   

  if(gameState ==="wait"){

    background("green");
    form.display();
    
  }

  else if (gameState ==="Play2"){
    
    form.hideall();
    
    background(backgroundimage);
    PlayerLeft.visible=true;   
    if(keyDown("right")){
      if(PlayerRight.x<1110){
      PlayerRight.x = PlayerRight.x + 5
      }
    }

    if(keyDown("left")){
      if(PlayerRight.x>60){
      PlayerRight.x = PlayerRight.x - 5

      }
    }

    if(keyDown("up")){
      PlayerRight.y = PlayerRight.y - 5
    }

    if(keyDown("down")){
      PlayerRight.y = PlayerRight.y + 5
    }



    //Moving Left Player
    if(keyDown("w")){
      PlayerLeft.y = PlayerLeft.y - 5;
    }
    if(keyDown("s")){
      PlayerLeft.y = PlayerLeft.y + 5;
    }
    if(keyDown("a")){
      if(PlayerLeft.x>60){
      PlayerLeft.x = PlayerLeft.x - 5;
      }
    }
    if(keyDown("d")){
      if(PlayerLeft.x<1100){
      PlayerLeft.x = PlayerLeft.x + 5;
      }
    }
    //moving the  ball

    if(keyDown("space")&& gstage===0){
      Serve();
      gstage = 1;
      Goal.visible = false;
    }


  
    //Colliding Players with Ground
    PlayerRight.collide(InvisibleGround);
    PlayerRight.collide(InvisibleGround2);
    PlayerLeft.collide(InvisibleGround);
    PlayerLeft.collide(InvisibleGround2);
    PlayerRight.collide(PlayerLeft);
    PlayerLeft.collide(PlayerRight);
    Ball.bounceOff(InvisibleGround);
    Ball.bounceOff(InvisibleGround2);
    Ball.bounceOff(PlayerRight);
    Ball.bounceOff(PlayerLeft);

    if(Ball.x > 1110 && (Ball.y > 364 || Ball.y < 480)){
        Goal.visible = true;

          RightScore++
        reset();
        gstage = 0;
    }
    if(Ball.x < 100 && (Ball.y > 364 || Ball.y < 480)){
        LeftScore++
        reset();
        gstage = 0;
    }
    
    if(RightScore === 5 || LeftScore === 5){
      gstage =2;
      Over();
    }
    
    drawSprites();
      
      textSize(50);
      if(gstage===0){
      fill("Black"); 
      text("Press Space to Start the Game", 250, 380);
      
      }
      line(475,45,475,45);
      text("GZ  " + RightScore, 450,50);
      line(475,55,475,55);
      line(775,45,775,45);
      text("LA  " +LeftScore, 780,50);
      line(775,55,775,55);
}
  
}//end of function draw
function Serve(){
  Ball.velocityX = 2;
  Ball.velocityY = -4
}
function reset(){
  Ball.x = displayWidth-680;
  Ball.y = 450;
  Ball.velocityX = 0;
  Ball.velocityY = 0;
}
function Over(){
  gameover.visible = true;
  reload.visible = true;
  if(mousePressedOver(reload)){
    gameState = "wait"
  }
}
