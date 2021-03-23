//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg,happyDogImg
var feedButton,addButton
var foodObj
var feedTime
var lastFed
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,380,50,50)
  dog.addImage(dogImg)
  foodObj=new Food()
  database=firebase.database()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  dog.scale=0.3
  feed=createButton("Feed your pet")
  feed.position(200,200)
  feed.mousePressed(feedDog)
  add=createButton("Add more food")
  add.position(200,300)
  add.mousePressed(addFood)
}


function draw() {  
  background(46,139,87)
  foodObj.display()
  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  //stroke()
 // text("Note : Press the Up arrow Key To Feed The Dog",50,50)
  text("Food remaining : "+foodS,50,75)
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",250,30)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",250,30)
  }else{
    text("Last Feed : "+lastFed+"AM",250,30)
  }
}
function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref("/").update({Food:x})
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

