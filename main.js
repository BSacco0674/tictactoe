//plays some good video game news//
const ff7 = new Audio('audio/FF7_fanfare.mp4');


//shows all winning combos and defines X's and O's//
const X_class = 'x'
const Circle_Class = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]



const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)



//allows the game to start, and whos turn it is//
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_class)
    cell.classList.remove(Circle_Class)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}




//allows for markers to be placed, and checks for a winner after marker is placed//
function handleClick(event) {
  const cell = event.target
  const currentClass = circleTurn ? Circle_Class : X_class
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}



//want to add audio file here but i do not know how to make it work with the button at the same time//
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw! Try again!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} is Winner Winner Chicken Dinner!`
  }
  setTimeout(function(){ff7.play();},1000);
  winningMessageElement.classList.add('show')
}





//outcomes of winner team and or draw shows the winning/draw screen//
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_class) || cell.classList.contains(Circle_Class)
  })
}



function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}



//shows marker palcement of whos turn it is//
function setBoardHoverClass() {
  board.classList.remove(X_class)
  board.classList.remove(Circle_Class)
  if (circleTurn) {
    board.classList.add(Circle_Class)
  } else {
    board.classList.add(X_class)
  }
}

//looks at winning combos to determin a winner//
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

