const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const PIECES = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];

const CHESS_BOARD_ID = 'chess-board';

let game;
let table1;
let selectedPiece;

function tryUpdateSelectedPiece(row, col) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table1.rows[i].cells[j].classList.remove('possible-move');
      table1.rows[i].cells[j].classList.remove('selected');
    }
  }

  const piece = game.boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = game.getPossibleMoves(piece);
    for (let possibleMove of possibleMoves) {
      const cell = table1.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  table1.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

function onCellClick(row, col) {
  if (selectedPiece !== undefined && game.tryMove(selectedPiece, row, col)) {
    selectedPiece = undefined;
    chessBoard(game.boardData);
  } else {
    tryUpdateSelectedPiece(row, col);
  }
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'chess-pins/' + player + '/' + name + '.png';
  image.draggable = false;
  cell.appendChild(image);
}

function chessBoard(boardData) {
  table1 = document.getElementById(CHESS_BOARD_ID);
  if (table1 !== null) {
    table1.remove();
  }

  table1 = document.createElement('table');
  table1.id = CHESS_BOARD_ID;
  document.body.appendChild(table1);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table1.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', () => onCellClick(row, col));
    }
  }

 
  for (let piece of boardData.pieces) {
    const cell = table1.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }

  if (game.winner !== undefined) {
    const winnerPopup = document.createElement('div');
    const winner = game.winner.charAt(0).toUpperCase() + game.winner.slice(1);
    winnerPopup.textContent = winner + ' player wins!';
    winnerPopup.classList.add('winner-dialog');
    table1.appendChild(winnerPopup)
  }

}

function initGame() {
  game = new Game(WHITE_PLAYER);
  chessBoard(game.boardData);
}

window.addEventListener('load', initGame);

