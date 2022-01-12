var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position, balloonPosition;

function preload(){
   bg = loadImage("cityImage.png");
   balloonImage1 = loadAnimation("hotairballoon1.png");
   balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloonPosition = createSprite(250,450,150,150);
  balloonPosition.addAnimation("hotAirBalloon",balloonImage1);
  balloonPosition.scale = 0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloonPosition.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloonPosition.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloonPosition.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    balloonPosition.scale = balloonPosition.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloonPosition.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,10);
    balloonPosition.scale = balloonPosition.scale +0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
}

function readHeight(data){
    position = data.val();
    balloonPosition.x = height.x;
    balloonPosition.y = height.y;
}

function showError(){
    console.log("esta dando error");
}