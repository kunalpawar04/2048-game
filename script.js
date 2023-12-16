let row = 4;
let column = 4;
let scored = 0;
let board;

//Starting the game on clicking load button
window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  //We don't have the divs created in html file where each block is stored so we will do that here
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let newDiv = document.createElement("div");
      newDiv.id = r.toString() + "." + c.toString();
      let num = board[r][c];
      updateStyle(newDiv, num);
      document.getElementById("main-block").append(newDiv);
    }
  }

  //Initiate 2 twos for the game
  setTwo();
  setTwo();
}

function isEmpty() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] == 0) return true;
    }
  }
  return false;
}

function setTwo() {
  if (!isEmpty()) {
    return;
  }

  let flag = false;
  while (!flag) {
    let randomRow = Math.floor(Math.random() * 4);
    let randomColumn = Math.floor(Math.random() * 4);

    if (board[randomRow][randomColumn] == 0) {
      board[randomRow][randomColumn] = 2;
      let tile = document.getElementById(
        randomRow.toString() + "." + randomColumn.toString()
      );
      tile.innerText = "2";
      tile.classList.add("int-2");
      flag = true;
    }
  }
}

function updateStyle(newDiv, num) {
  newDiv.innerText = "";
  newDiv.classList = "";
  newDiv.classList.add("tile"); // Added "tile" class
  if (num > 0) {
    newDiv.innerText = num;
    if (num <= 4096) {
      newDiv.classList.add("int-" + num.toString());
    } else {
      newDiv.classList.add("int-8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else {
    slideDown();
    setTwo();
  }

  document.getElementById("score").innerText = scored;
});

//Left Arrow Key
function slideLeft() {
  for (let r = 0; r < row; r++) {
    //the logic is we will first remove all zeros in the row
    //Then we will check if adjacent numbers are equal or not? If yes then merge and update the places again
    let currentRow = board[r];
    currentRow = slideL(currentRow);
    board[r] = currentRow;

    for (let c = 0; c < column; c++) {
      let num = board[r][c];
      let eachBlock = document.getElementById(
        r.toString() + "." + c.toString()
      );
      updateStyle(eachBlock, num);
    }
  }
}

function slideL(currentRow) {
  //Remove zeros in the array first
  currentRow = filterZero(currentRow);
  //check the adjacent similar elements
  for (let i = 0; i < currentRow.length - 1; i++) {
    if (currentRow[i] === currentRow[i + 1]) {
      currentRow[i] *= 2;
      currentRow[i + 1] = 0;
      scored += currentRow[i];
    }
  }
  //Again remove the zeros in the updated array
  currentRow = filterZero(currentRow);
  //Now add the zeros in the remaing spaces
  //ex. [4,4] -> [4, 4, 0, 0]
  while (currentRow.length < 4) {
    currentRow.push(0);
  }

  return currentRow;
}

//Right Arrow Key
function slideRight() {
  for (let r = 0; r < row; r++) {
    let currentRow = board[r];
    currentRow = slideR(currentRow);
    board[r] = currentRow;

    for (let c = 0; c < column; c++) {
      let num = board[r][c];
      let eachBlock = document.getElementById(
        r.toString() + "." + c.toString()
      );
      updateStyle(eachBlock, num);
    }
  }
}

function slideR(currentRow) {
  currentRow = filterZero(currentRow);

  for (let i = currentRow.length - 1; i > 0; i--) {
    if (currentRow[i] === currentRow[i - 1]) {
      currentRow[i] *= 2;
      currentRow[i - 1] = 0;
      scored += currentRow[i];
    }
  }
  currentRow = filterZero(currentRow);
  while (currentRow.length < 4) {
    currentRow.unshift(0);
  }

  return currentRow;
}

//Up Arrow Key
function slideUp() {
  for (let c = 0; c < column; c++) {
    //first access all elements of a single column
    let currentColumn = getColumn(board, c);
    //Now slide non-zero tiles upwards
    currentColumn = slideU(currentColumn);

    for (let j = 0; j < currentColumn.length; j++) {
      board[j][c] = currentColumn[j];
    }

    for (let r = 0; r < row; r++) {
      let num = board[r][c];
      let eachBlock = document.getElementById(
        r.toString() + "." + c.toString()
      );
      updateStyle(eachBlock, num);
    }
  }
}

function getColumn(matrix, col) {
  return matrix.map((row) => row[col]);
}

function slideU(currentColumn) {
  currentColumn = filterZero(currentColumn);
  for (let i = 0; i < currentColumn.length; i++) {
    if (currentColumn[i] === currentColumn[i + 1]) {
      currentColumn[i] *= 2;
      currentColumn[i + 1] = 0;
    }
  }

  currentColumn = filterZero(currentColumn);
  while (currentColumn.length < 4) {
    currentColumn.push(0);
  }

  return currentColumn;
}

//Down Arrow Key
function slideDown() {
  for (let c = 0; c < column; c++) {
    //first access all elements of a single column
    let currentColumn = getColumn(board, c);
    //Now slide non-zero tiles upwards
    currentColumn = slideD(currentColumn);

    for (let j = 0; j < currentColumn.length; j++) {
      board[j][c] = currentColumn[j];
    }

    for (let r = 0; r < row; r++) {
      let num = board[r][c];
      let eachBlock = document.getElementById(
        r.toString() + "." + c.toString()
      );
      updateStyle(eachBlock, num);
    }
  }
}

function slideD(currentColumn) {
  currentColumn = filterZero(currentColumn);

  for (let i = currentColumn.length - 1; i > 0; i--) {
    if (currentColumn[i] === currentColumn[i - 1]) {
      currentColumn[i] *= 2;
      currentColumn[i - 1] = 0;
      scored += currentColumn[i];
    }
  }

  currentColumn = filterZero(currentColumn);
  while (currentColumn.length < 4) {
    currentColumn.unshift(0);
  }

  return currentColumn;
}

function filterZero(currentRow) {
  //creating new array excluding the zeros
  return currentRow.filter((num) => num != 0);
}
