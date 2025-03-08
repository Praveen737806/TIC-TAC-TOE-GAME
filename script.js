document.addEventListener("DOMContentLoaded", () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const statusDisplay = document.getElementById("status");
    const cells = document.querySelectorAll(".cell");
    const winnerPopup = document.getElementById("winnerPopup");
    const winnerText = document.getElementById("winnerText");
    const restartButton = document.getElementById("restartButton");
    const popupCloseButton = document.getElementById("popupCloseButton");

    function initializeGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        statusDisplay.innerText = `Player X's turn`;
        cells.forEach(cell => cell.innerText = "");
        winnerPopup.style.display = "none"; // Hide popup
    }

    function makeMove(index) {
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cells[index].innerText = currentPlayer;
            if (checkWinner()) {
                showWinnerPopup(`Player ${currentPlayer} Wins! 🎉`);
                gameActive = false;
                return;
            }
            if (board.every(cell => cell !== "")) {
                showWinnerPopup("It's a Draw! 🤝");
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            return board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]];
        });
    }

    function showWinnerPopup(message) {
        winnerText.innerText = message;
        winnerPopup.style.display = "flex";
    }

    function resetGame() {
        initializeGame();
    }

    // Attach event listeners
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => makeMove(index));
        cell.addEventListener("touchstart", () => makeMove(index)); // Mobile touch support
    });

    restartButton.addEventListener("click", resetGame);
    popupCloseButton.addEventListener("click", resetGame);

    initializeGame();
});
