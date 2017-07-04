
var wordlist = ["umineko", "dragonball z", "one punch man", "digimon", "madoka", "fullmetal alchemist", "evangelion", "gundam", "hunter x hunter", "attack on titan"];
var wordarr = splitter(wordlist[Math.floor(Math.random()*wordlist.length)]);
var tovictory = wordarr.length;  
var answerarr = create_dash_arr(wordarr, wordarr.length)
var lives = 9;
var gameactive = false;
var guessarr =[" "];




// Function begins listening for a key when document initializes, then activates when a key is pressed
$(document).ready(function(){
  gameactive = true;
  document.getElementById("lives").innerHTML = lives;
  printscreen(answerarr);
  gameplay();

})


//turns correct answer into array
function splitter(word){


  var arr = word.split("")
  return arr;

}

//create a new empty answer array
function create_dash_arr(array, number){
  var dasharr = [ ];

  for (var i = 0; i <= number; i++){
    if(array[i] === " "){
      tovictory = tovictory - 1;
      dasharr.push("&nbsp;");
    }
    else{
      dasharr.push("_");
    }
  }
  return dasharr;

}

//checks answer key and rebuilds answer array
function answercheck(key){
  var correct = 0;
  for(var i = 0; i < answerarr.length; i++){
    if (key === wordarr[i]){
      answerarr[i] = key;
      correct++;
    }
  }

  return correct;  

}

//prints answer array after it is rebuilt
function printscreen(x){

  for (var i = 0; i < wordarr.length; i++){
    document.getElementById("animeanswer").innerHTML += ( " " + x[i]);
  }



}

function gameplay(){
      console.log(tovictory);
  $(document).keypress(function(event){
    console.log(tovictory);
    if (gameactive === true) {
    
      if (lives > 0 && tovictory > 0) {
        var a = event.which;
        if (jQuery.inArray(String.fromCharCode(a), guessarr) === -1){

          newletter(a);
        } 

        if (lives === 0 || tovictory === 0){

          gameactive = false;
          endgame();
        }
      }
    }
    else{

      //resets the game
      wordarr = splitter(wordlist[Math.floor(Math.random()*wordlist.length)]);
      tovictory = wordarr.length;  
      answerarr = create_dash_arr(wordarr, wordarr.length)
      lives = 9;
      guessarr =[" "];
      document.getElementById("guesses").innerHTML = guessarr.toString();
      document.getElementById("lives").innerHTML = lives;      
      document.getElementById("animeanswer").innerHTML = ""; 
      printscreen(answerarr); 
      gameactive = true;


    }
  })
}


function newletter(a){

  var results = 0;
  var results = answercheck(String.fromCharCode(a));
  if (results >= 1){
    tovictory = (tovictory - results)
  }
  else{
    lives--;
    document.getElementById("lives").innerHTML = lives;
  }

  guessarr.push(String.fromCharCode(a));
  document.getElementById("guesses").innerHTML = guessarr.toString();
  document.getElementById("animeanswer").innerHTML = "";
  printscreen(answerarr);

}

function endgame(){

  if (lives === 0){
    document.getElementById("lives").innerHTML = "YOU LOSE. PLAY AGAIN?";
    document.getElementById("animeanswer").innerHTML = "";
    printscreen(wordarr);
  }
  else {
    document.getElementById("lives").innerHTML = "YOU WIN! PLAY AGAIN?";
    document.getElementById("animeanswer").innerHTML = "";
    printscreen(wordarr);    
  }
}

