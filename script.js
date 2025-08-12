document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const board = document.querySelector(".board");
    const result = document.getElementById("result");
    const winningLine = document.getElementById("winning-line");

    let currentPlayer = "X";
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function drawWinningLine(pattern) {
        let angle = 0;
        let posX = 0;
        let posY = 0;

        switch (pattern.join(",")) {
            case "0,1,2": angle = 0; posY = -110; break;
            case "3,4,5": angle = 0; posY = 0; break;
            case "6,7,8": angle = 0; posY = 110; break;
            case "0,3,6": angle = 90; posX = -110; break;
            case "1,4,7": angle = 90; posX = 0; break;
            case "2,5,8": angle = 90; posX = 110; break;
            case "0,4,8": angle = 45; break;
            case "2,4,6": angle = -45; break;
        }

        winningLine.style.width = "320px";
        winningLine.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
                drawWinningLine(pattern);
                return boardArray[a];
            }
        }

        if (boardArray.includes("")) {
            return null;
        }
        return "Tie";
    }

    function handleClick(event) {
        const cell = event.target;
        const cellIndex = Array.from(board.children).indexOf(cell);

        if (cellIndex === 9) return; // evita clicar na linha
        if (boardArray[cellIndex] === "" && !checkWinner()) {
            boardArray[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            const winner = checkWinner();
            if (winner) {
                if (winner === "Tie") {
                    result.textContent = "Empate!";
                } else {
                    result.textContent = `${winner} venceu!`;
                }
            }
        }
    }

    function startGame() {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        board.innerHTML = '<div id="winning-line"></div>';
        winningLine.style.width = "0";
        result.textContent = "";
        currentPlayer = "X";

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        }
    }

    startButton.addEventListener("click", startGame);
});
