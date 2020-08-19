//Create variables here
var dog, goodDog, happyDog, database, foodS ,foodStock;
var feed, addFood;
var lastFed;
var food;

function preload()
{
  //load images here
  goodDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  
  imageMode(CENTER);
  //image(goodDog, 100, 250, 0.5, 0.5);
  //image(happyDog, 400, 250, 200, 200);

  dog = createSprite(250, 250, 20, 20);
  dog.scale = 0.25;
  dog.addImage(goodDog);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  food = new Food();
  
}


function draw() {  
background (46, 139, 87)

fill (255, 255, 254);
textFont('Georgia');
stroke(4);
textSize(20);
if(lastFed>=12) {
   text("Last Fed : "+ lastFed%12 + "PM", 340, 40);
}else if(lastFed == 0) {
  text("Last Fed : 12 AM", 340, 40);
}else{
  text("Last Fed : "+ lastFed + "AM", 340, 40);
}

  /*if(keyWentDown (UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDog);
  }
  
  if(keyWentUp (UP_ARROW)) {
    dog.addImage(goodDog);
  }*/

feed = createButton("Feed the dog");
feed.position(670, 95);
feed.mousePressed(feedDog);

addFood = createButton("Add food");
addFood.position(770, 95);
addFood.mousePressed(addFoods);

food.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data) {
  lastFed = data.val();
});

  drawSprites();
  //add styles here
  textSize(20);
  textFont('Georgia');
  stroke(4);
  text("foodStock : " + foodS, 370, 20);

}

function readStock(data) {

 foodS = data.val();

}

function writeStock(x) {
 
 if(x <= 0) {
    x = 0
 }else {
   x = x-1
 }
 
  database.ref('/').update({
   Food:x
 })
}

function feedDog() {
  feedDog.addImage(happyDog);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food : food.getFoodStock(),
    FeedTime: hour ()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}