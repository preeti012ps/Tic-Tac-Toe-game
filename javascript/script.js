let btnRef = document.querySelectorAll(".button"); 
let restartBtn = document.getElementById("restart");
let popupRef = document.querySelector(".popup");
let msgRef = document.getElementById("message");
let newgameBtn = document.getElementById("new-game");

let audioturn = new Audio("/sounds/drop.mp3")
let gameover = new Audio("/sounds/game over.wav")



//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


//Player 'X' plays first
let xTurn = true; //initially turn on onclick is X.
let count = 0; // initially count is 0 , count increase on every onclick..


//Disable All Buttons for show the popup  page..when game is draw, wining of x/0, 
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};


//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};




//Function for draw. if count going to be more then 9 then its draw.for draw disable button page and show popup page..
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  gameover.play();
};


//New Game. means i am on popup page we press newgame button then show button page and count of clicks is 0..
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});


restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});


//Display X/O on click.here elemment is variable.
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {// means turn will be empty or 0, then display X and xturn false means its x turn .
      xTurn = false;
      //Display X
          element.innerText = "X";
          element.disabled = true;
        } else {
          xTurn = true;// means x turn is done and its turn to 0..
          //Display Y
          element.innerText = "O";
          element.disabled = true;
        }
        //Increment count on each click, when we doing 0/X..
        count += 1;
        audioturn.play();
        if (count == 9) {// if count is 9 so it means its a draw then call draw function..
          drawFunction();
        }
    //Check for win on every click
    winChecker();// after putting 0/X then check it is wining pattern or not ..
  });
});

//This function is executed when a player wins... , here winfonction is func name and letter its variable.
const winFunction = (letter) => {
  disableButtons();//if player win then disable button page and show popup page..
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";// if letter X wins then execute this line.
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";// if letter 0 wins then execute this line. 
  }
};

//Win Logic, create winchecker empty function. .
const winChecker = () => {
  //Loop through all win patterns, any row or column or diagonals are same then call win function..
  for (let i of winningPattern) {
    let [element1, element2, element3] = [ //variable element1,2,3 is taken i[0], i[1], i[2] 
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
        
      }
    }
  }
};

//Enable Buttons and disable popup on page load...
window.onload = enableButtons;