var aesopFoods = ["Apples", "Pears", "Bananas", "Pizza"];
var currentRequest;
var correct = 0;
var incorrect = 0;

$(document).ready(function(){
  buttonMake();
  setListeners();
});

//we need to pick a selector
function setListeners() {
  $('.container').on('click', '.get-food', foodClicked)



}

function foodClicked(){

  var myFood = $(this).attr("class");
  myFood = myFood.replace(" get-food","");
  $.ajax({
    type: "GET",
    url: "/data/" + myFood,
    success: function(data){
      feedAesopFood(data.food);
    }
  })
 }

function buttonMake(){
  for (var i=0; i < aesopFoods.length; i++){
      $('.container').append('<button class="'+ aesopFoods[i] +' get-food">' + aesopFoods[i] + '</button>');
  }
  // make our display thingy
  $('.container').append('<p class ="correct">He ate it 0 times!</p>');
  $('.container').append('<p class ="incorrect">Yuck 0 times!</p>');
  $('.container').append('<p class ="current">He wants...</p>');


}

var timer = setInterval(aesopWantsFood, 5000);

function aesopWantsFood(){
  currentRequest = aesopFoods[randomNumber(0, aesopFoods.length - 1)];
  console.log(currentRequest);
  $('.current').text("He wants " + currentRequest + "!");

}

function feedAesopFood(food){
  if(food == currentRequest){
    console.log("Number of Correct feeds", correct);
    correct++;
  } else {
    console.log("Number of Inorrect feeds", incorrect);
    console.log(food);
    console.log(currentRequest);
    incorrect++;
  }

  //append or update totals
  $('.correct').text("He ate it " + correct + " times!");
  $('.incorrect').text("Yuck " + incorrect + " times!");


  aesopWantsFood();
  clearInterval(timer);
  timer = setInterval(aesopWantsFood, 5000);
}

var randomNumber = function(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};
