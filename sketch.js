//Create variables here
var db;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feedButton,addFood;
var x,hour,hour1;
var gameState, gameStateReader;
var garden,gardenImage, washroom,washroomImage, bedRoom, bedRoomImage;
var currentTime;

function preload(){
  //load images here
  dogImage1 = loadImage("images/Happy.png");
  dogImage = loadImage("images/Dog.png");
  foodImage = loadImage("images/milk.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(700, 700);

  feedButton = createButton("FEED");
  feedButton.position(570,530);


  addFood = createButton("ADD FOOD");
  addFood.position(570,50);


  //Sprites
  feedButton.mousePressed(function (){


    foodRef = db.ref("Food");
    foodStock = foodStock - 1;
    foodRef.set(foodStock);
    dog.addImage(dogImage1);
  
    getTime();
    
  });

  getHour();

  addFood.mousePressed(function (){

    addFoodRef = db.ref("/Food");
    foodStock = foodStock + 20;
    addFoodRef.set(foodStock);

    })


  dog = createSprite(400,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  //Firebase
  db = firebase.database();

  //Reference for food
  foodRef = db.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);
}


function draw() {  
  eat();
  garden();
  washroom();
  bedRoom();


  getCurrentTime();

  
  if(hour1 - hour < 1 && hour1 - hour >= 0){
    var gameRef = db.ref("gameState").set("garden")
  } else if(hour1 - hour < 2 && hour1 - hour >= 1){
    var gameRef = db.ref("gameState").set("washroom")
  } else if(hour1 - hour < 3 && hour1 - hour >= 2){
    var gameRef = db.ref("gameState").set("bedRoom");
  }
  else {
    var gameRef = db.ref("gameState").set("feed`");
  }

  var gameRef = db.ref("gameState").on("value",function (data){
    gameStateReader = data.val();
    //console.log(gameStateReader);
  });
  
  drawSprites();
  
 
}

function read(data){
  foodStock = data.val();
}

function eat(){
  if(gameStateReader === "feed"){
    background(46, 139, 87);

    x = 30;

    foodRef = db.ref("Food");
    
     for(var i = 0; i< foodStock; i=i+1){
  
      x = x + 30;
  
      if(i<10){
        food = createSprite(x,400,50,50);
        food.addImage(foodImage);
        food.scale = 0.1;
      } else {
        food = createSprite(x,30,50,50);
        food.addImage(foodImage);
        food.scale = 0.1;
      }
     }
      //add styles here
    textSize(32);
    fill("yellow");
    text("Bones AVAILABLE IS/ARE: "+foodStock,50,300);
    textSize(16);
  }
}

function garden(){
  if(gameStateReader === "garden"){
    background(gardenImage);
    feedButton.hide();
    addFood.hide();

  }
}

function washroom(){
  if(gameStateReader === "washroom"){
    background(washroomImage);
    feedButton.hide();
    addFood.hide();

  }
}

function bedRoom(){
  if(gameStateReader === "bedRoom"){
    background(bedRoomImage);
    feedButton.hide();
    addFood.hide();
  }
}



async function getTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  

  var time = datetime.slice(11,16);
  
  var lastFed = db.ref("/lastFed");
  lastFed.set(time);
}

async function getHour(){
  var response2 = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON2 = await response2.json();

  var datetime2 = responseJSON2.datetime;
  
  hour = datetime2.slice(11,13);
}

async function getCurrentTime(){
  var response1 = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON1 = await response1.json();

  var datetime1 = responseJSON1.datetime;
  
  hour1 = datetime1.slice(11,13);
}