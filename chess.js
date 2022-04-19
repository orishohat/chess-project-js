const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';


const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let selectedCell;
let pieces = [];
let table1;

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }


getPossibleMoves() {
  // Get relative moves
  let relativeMoves;
  if (this.type === PAWN) {
    relativeMoves = this.getPawnRelativeMoves();
  } else if (this.type === ROOK) {
    relativeMoves = this.getRookRelativeMoves();
  } else if (this.type === KNIGHT) {
    // TODO: Get moves
  } else if (this.type === BISHOP) {
    // TODO: Get moves
  } else if (this.type === KING) {
    relativeMoves = this.getKingRelativeMoves();
  } else if (this.type === QUEEN) {
    // TODO: Get moves
  } else {
    console.log("Unknown type", type)
  }
  console.log('relativeMoves', relativeMoves);

  // Get absolute moves
  let absoluteMoves = [];
  for (let relativeMove of relativeMoves) {
    const absoluteRow = this.row + relativeMove[0];
    const absoluteCol = this.col + relativeMove[1];
    absoluteMoves.push([absoluteRow, absoluteCol]);
  }
  // console.log('absoluteMoves', absoluteMoves);

  // Get filtered absolute moves
  let filteredMoves = [];
  for (let absoluteMove of absoluteMoves) {
    const absoluteRow = absoluteMove[0];
    const absoluteCol = absoluteMove[1];
    if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
      filteredMoves.push(absoluteMove);
    }
  }
  console.log('filteredMoves', filteredMoves);
  return filteredMoves;
}

getPawnRelativeMoves() {
  // TODO: Give different answer to black player
  return [[1, 0]];
}

getRookRelativeMoves() {
  let result = [];
  for (let i = 1; i < BOARD_SIZE; i++) {
    result.push([i, 0]);
    result.push([-i, 0]);
    result.push([0, i]);
    result.push([0, -i]);
  }
  return result;
}
}

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  getPiece(row, col) {
  }
}

function getInitialBoard() {
  let result = [];
  addPieces(result, 0, WHITE_PLAYER);
  addPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  return result;
}


function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, DARK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, DARK_PLAYER));
  }
  return result;
}


function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER))
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER))
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER))
  result.push(new Piece(0, 4, "king", WHITE_PLAYER))
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER))
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 7, "rook", WHITE_PLAYER))
  result.push(new Piece(1, 0, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 1, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 2, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 3, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 4, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 5, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 6, "pawn", WHITE_PLAYER))
  result.push(new Piece(1, 7, "pawn", WHITE_PLAYER))

  result.push(new Piece(7, 0, "rook", DARK_PLAYER))
  result.push(new Piece(7, 1, "knight", DARK_PLAYER))
  result.push(new Piece(7, 2, "bishop", DARK_PLAYER))
  result.push(new Piece(7, 3, "queen", DARK_PLAYER))
  result.push(new Piece(7, 4, "king", DARK_PLAYER))
  result.push(new Piece(7, 5, "bishop", DARK_PLAYER))
  result.push(new Piece(7, 6, "knight", DARK_PLAYER))
  result.push(new Piece(7, 7, "rook", DARK_PLAYER))
  result.push(new Piece(6, 0, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 1, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 2, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 3, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 4, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 5, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 6, "pawn", DARK_PLAYER))
  result.push(new Piece(6, 7, "pawn", DARK_PLAYER))
  return result;
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'chess-pins/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  console.log('row', row);
  console.log('col', col);
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table1.rows[i].cells[j].classList.remove('possible-move');
    }
  }
  
  
  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
      table1.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }

  // const piece = boardData.getPiece(row, col);
  // if (piece !== undefined) {
  //   let possibleMoves = piece.getPossibleMoves();
  //   for (let possibleMove of possibleMoves) {
  //     const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
  //     cell.classList.add('possible-move');
  //   }
  // }

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


// function onCellClick(e) {
//   console.log(e.currentTarget);
//   if (selectedCell !== undefined){
//     selectedCell.classList.remove('selected');
//   }

//   selectedCell = e.currentTarget;
//   e.currentTarget.classList.add('selected');
//   console.log('I was clicked ;)');
// }

function chessBoard() {
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
  pieces = getInitialBoard();
  pieces[0].getPossibleMoves();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', chessBoard);




