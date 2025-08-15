document.addEventListener("DOMContentLoaded",function(){
    const startButton = document.getElementById("start-button");
    const board = document.querySelector(".board");
    const result = document.getElementById("result");

    // Variáveis de controle do jogo
    let currentPlayer="X";
    let boardArray=["","","","","","","","",""];

    // Função para verificar se alguém venceu
    function checkWinner(){
      // Padrões de vitória (linhas, colunas e diagonais)
    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let pattern of winPatterns){
        const [a, b, c] = pattern;
        if (boardArray[a] && boardArray[a] == boardArray[b] && boardArray[a] == boardArray[c]){
            // Aplica a cor a todas as células vencedoras
            board.children[a].style.backgroundColor = "#c8e6c9"; 
            board.children[b].style.backgroundColor = "#c8e6c9"; 
            board.children[c].style.backgroundColor = "#c8e6c9"; 
            return boardArray[a];
        }
    }

    if (boardArray.includes("")){
        return null;
    }

    return "Tie";
}

    function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(board.children).indexOf(cell);

    if (boardArray[cellIndex] === "" && !checkWinner()) {
      boardArray[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";

      // Verifica se houve vencedor ou empate
      const winner = checkWinner();
      if (winner) {
        if (winner === "Tie") {
          result.textContent = "It's a tie!";
        } else {
          result.textContent = `${winner} wins!`;
        }
      }
    }
  }

    // Função para iniciar/reiniciar o jogo
    function startGame() {
        boardArray = ["", "", "", "", "", "", "", "", ""];
        board.textContent = "";
        result.textContent = "";
        currentPlayer = "X";

        for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        }

        const cells = board.children;
        for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "#eee";
        }
    }

    // Ao clicar no botão Start, inicia o jogo
    startButton.addEventListener("click", startGame);
})
