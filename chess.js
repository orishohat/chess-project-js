const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';


const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const BOARD_ID = 'chess-board';

var piecesInitOrder = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK]

let selectedCell;
let pieces;
let piece;
let boardData = [];
let table1;
let selectedPiece;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
  
  getOpponent() {
    if (this.player === WHITE_PLAYER) {
      return DARK_PLAYER;
    }
    return WHITE_PLAYER;
  }


  getPossibleMoves(boardData) {
  
  let relativeMove = this.getRelativeMoves();
  let absoluteMoves = this.getabsoluteMoves(relativeMove);
  let filteredMoves= this.getfilteredMoves(absoluteMoves);  
  return filteredMoves;
 }
  

  getRelativeMoves() {
    let relativeMoves;
    if (this.type === 'pawn') {
      relativeMoves = this.getPawnMoves(boardData);
    } else if (this.type === 'rook') {
      relativeMoves = this.getRookMoves(boardData);
    } else if (this.type === 'knight') {
      relativeMoves = this.getKnightMoves(boardData);
    } else if (this.type === 'bishop') {
      relativeMoves = this.getBishopMoves(boardData);
    } else if (this.type === 'king') {
      relativeMoves = this.getKingMoves(boardData);
    } else if (this.type === 'queen') {
      relativeMoves = this.getQueenMoves(boardData);
    } else {
      console.log("Unknown type", type)
    }
    return relativeMoves;
  }

  getabsoluteMoves(relativeMoves){
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = relativeMove[0];
      const absoluteCol = relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }
    return absoluteMoves;
  }

  getfilteredMoves(absoluteMoves){
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }


  
  getPawnMoves(boardData) {
    let result = [];
    let direction = 1;
    if (this.player === DARK_PLAYER) {
      direction = -1;
    }

    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }

    position = [this.row + direction, this.col + direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }

    position = [this.row + direction, this.col - direction];
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position);
    }


    return result;
  }

  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    return result;
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];

    for (let i = 1; i < BOARD_SIZE; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        result.push([row, col]);
        console.log("opponent");
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        console.log("player");
        return result;
      }
    }
    console.log("all empty");
    return result;
  }

  getKnightMoves(boardData) {
    let result = [];
    const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;
  }

  getKingMoves(boardData) {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;
  }

  getQueenMoves(boardData) {
    let result = this.getBishopMoves(boardData);
    result = result.concat(this.getRookMoves(boardData));
    return result;
  }
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player;
  }
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        this.pieces.splice(i, 1);
      }
    }
  }
}


function getInitialPiecesBoard() {
  let result = [];
  getInitialPieces(result, 0, WHITE_PLAYER)

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  getInitialPieces(result, 7, DARK_PLAYER)
  return result;
}


function getInitialPieces(result, row, player) {
  piecesInitOrder.forEach(function (value, i) {
  result.push(new Piece(row, i, value, player));
});
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'chess-pins/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function showMovesForPiece(row, col) {
  console.log('showMovesForPiece');
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table1.rows[i].cells[j].classList.remove('possible-move');
      table1.rows[i].cells[j].classList.remove('selected');
    }
  }

    const piece = boardData.getPiece(row, col);
    if (piece !== undefined) {
      let possibleMoves = piece.getPossibleMoves(boardData);
      for (let possibleMove of possibleMoves) {
        const cell = table1.rows[possibleMove[0]].cells[possibleMove[1]];
        cell.classList.add('possible-move');
      }
    }

    table1.rows[row].cells[col].classList.add('selected');
    selectedPiece = piece;
}

function onCellClick(event, row, col) {
  console.log('row', row);
  console.log('col', col);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table1.rows[i].cells[j].classList.remove('possible-move');
    }
    if (selectedPiece === undefined) {
      showMovesForPiece(row, col);
  }
  else {
    if (tryMove(selectedPiece, row, col)) {
      selectedPiece = undefined;
      chessBoard(boardData);
    } else {
      showMovesForPiece(row, col);
    }
  }
}

function tryMove(piece, row, col) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  for (const possibleMove of possibleMoves) {
    if (possibleMove[0] === row && possibleMove[1] === col) {
      boardData.removePiece(row, col);
      piece.row = row;
      piece.col = col;
      return true;
    }
  }
  return false;
}

function initGame() {
  boardData = new BoardData(getInitialPieces());
  chessBoard(boardData);
}

  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      const cell = table1.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }
  
  
  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
      table1.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }

  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }

  
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
}

function addImageByIndex(cell, player, index) {
  if (index === 0 || index === 7) {
    addImage(cell, player, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, player, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, player, 'bishop');
  } else if (index === 3) {
    addImage(cell, player, 'king');
  } else if (index === 4) {
    addImage(cell, player, 'queen');
  }
}


function chessBoard(boardData) {
  table1 = document.getElementById(BOARD_ID);
  if (table1 !== null) {
    table1.remove();
  }

  table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'light-cell';
      } else {
        cell.className = 'dark-cell';
      }
      cell.addEventListener('click', function (){
        onCellClick(event,i,j)
      });
    }
  }
  
  boardData = new BoardData(getInitialPiecesBoard());

  
  for (let piece of boardData.pieces) {
    const cell = table1.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}


window.addEventListener('load', chessBoard);




