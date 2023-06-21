// variabelen
let winner;
const markX = 'X'
const markO = 'O'
const gameboard = document.querySelectorAll(".cell");
const diagonal1 = [gameboard[0], gameboard[4], gameboard[8]]
const diagonal2 = [gameboard[2], gameboard[4], gameboard[6]]
const winCombinations = [
document.querySelectorAll(".row1"),
document.querySelectorAll(".row2"),
document.querySelectorAll(".row3"),
document.querySelectorAll(".column1"),
document.querySelectorAll(".column2"),
document.querySelectorAll(".column3"),
  diagonal1,
  diagonal2
]
let emptyCells = [];
let playerMark = "X";
let computerMark = "O";
let grid = document.getElementById('grid');
let msg = document.querySelector('.message');
let chooser = document.querySelector('form');
let cell;

// stelt het bord in om te kunnen spelen
function setupGrid() {
  for (let i = 0; i < gameboard.length; i++) {
    gameboard[i].classList.add("empty");
    gameboard[i].classList.add("cell");
    gameboard[i].addEventListener('click', function () {
      playerMove(this);
    }
    );
  }
}

// reset de tekstinhoud van alle cellen en reset de klassen. daarna wordt het rooster opnieuw ingesteld
function reset() {
  for (let i = 0; i < gameboard.length; i++) {
    gameboard[i].innerHTML = "";
    gameboard[i].className = "";
  }
  setupGrid();
}

// wisselt de mark voor de computer
function switchMark(mark) {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
  return mark;
}

// checkt of het spelbord leeg is door naar textcontent te kijken in elke cell
function boardIsEmpty() {
  let bool = true;
  for (let i = 0; i < gameboard.length; i++) {
    if (gameboard[i].innerHTML !== "") {
      bool = false;
      break;
    }
  }
  return bool;
}

// veranderd playermark-variable begint onclick
function chooseMark() {
  if (!boardIsEmpty()) {
    alert("Spel loopt! Mark kan niet worden gewijzigd.")
    return;
  }
  mark = prompt("Kies uw mark: X of O in hoofdletters");
  if (mark !== "O" && mark !== "X") {
    alert("Ongeldig! Probeer het opnieuw.")
  }
  else {
    playerMark = mark;
    computerMark = switchMark(mark);
  }
}


// krijgt willekeurig cijfer tussen waarden ingevoerd in parameters zodat de computercel verder kan gaan
function randomInt(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// computer doet een zet op een willekeurige cel
function computerMove() {
  emptyCells = document.querySelectorAll(".empty")
  if (emptyCells.length > 0) {
    let randomNumber = randomInt(0, emptyCells.length - 1);
    let cell = emptyCells[randomNumber];
    cell.innerHTML = computerMark;
    cell.classList.remove("empty");
    cell.classList.add("computerMarked")
  }

}

// speler doet een zet in een gekozen cell, als er een winnaar is, gebruiken we het sleutelwoord "return" om de functie te verlaten zodat de volgende regels code niet worden uitgevoerd
function playerMove(cell) {
  if (cell.innerHTML === "") {
    cell.innerHTML = playerMark;
    cell.classList.remove("empty")
    cell.classList.add("playerMarked")
    if (checkWinner("player")) {
      return;
    }
    computerMove();
    if (checkWinner("computer")) {
      return;
    }
  }
}


// controleert op een winnaar door te zien of een van de winnende combinaties volledig overeenkomt met de cellen van de speler (mens of computer) 
function checkWinner(player) {
  let cells = [...document.querySelectorAll(`.${player}Marked`)];
  for (let i = 0; i < winCombinations.length; i++) {
    let winnerFound = true;
    let winCombo = winCombinations[i];
    for (let j = 0; j < 3; j++) {
      if (!cells.includes(winCombo[j])) {
        winnerFound = false;
        break
      }
    }
    if (winnerFound) {
      winner = `${player}`;
      // time-out zodat de celverandering naar "X" plaatsvindt voor de alert
      setTimeout(function () {
        alert(`${winner} has won.`);
      }, 0);

      emptyCells = document.querySelectorAll(".empty")
      for (let i = 0; i < emptyCells.length; i++) {
        emptyCells[i].innerHTML = " ";
      }
      return true;
    }
  }
}



// roep de setup-functie hier aan zodat het spel werkt
setupGrid();