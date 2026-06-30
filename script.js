// Select all required elements from the DOM
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".btn");
const winnerText = document.querySelector(".winner");

// Initial variables
let turn = "X"; // Game starts with X
let isGameOver = false;
// Defining all possible win patterns by index positions
const winPatterns = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal (top-left to bottom-right)
  [2, 4, 6]  // diagonal (top-right to bottom-left)
];

// Function: change turn
function changeTurn() {
  return turn === "X" ? "O" : "X";
}

// Function to check for a win 
// Function: check for winner
function checkWin() {
  winPatterns.forEach(pattern => {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    // Check if all three boxes are same & not empty
    if (val1 !== "" && val1 === val2 && val2 === val3) {
      winnerText.innerText = `Congratulations ${val1} Won 🎉`;
      isGameOver = true;
      highlightWinnerBoxes(a, b, c);
    }
  });
}
// Function: highlight the winning boxes
function highlightWinnerBoxes(a, b, c) {
  [boxes[a], boxes[b], boxes[c]].forEach(box => {
    box.style.background = "#32cd32"; // green highlight
    box.style.color = "#fff";
  });
}
// Add click event to each box
boxes.forEach(box => {
  box.addEventListener("click", () => {
    // Only allow clicking if box is empty and game not over
    if (box.innerText === "" && !isGameOver) {
      box.innerText = turn;
      checkWin();

      // If no one won yet, change turn
      if (!isGameOver) {
        turn = changeTurn();
        winnerText.innerText = `Turn for ${turn}`;
      }
    }
  });
});
// Reset button logic
resetBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.style.background = "";
    box.style.color = "";
  });
  turn = "X";
  isGameOver = false;
  winnerText.innerText = "Turn for X";
});
