const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark';


const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

var piecesInitOrder = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK]

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
  
  let relativeMove = this.getRelativeMoves();
  let absoluteMoves = this.getabsoluteMoves(relativeMove);
  let filteredMoves= this.getfilteredMoves(absoluteMoves);  
  return filteredMoves;
 }
  

  getRelativeMoves() {
    let relativeMoves;
    if (this.type === 'pawn') {
      relativeMoves = this.getPawnRelativeMoves();
    } else if (this.type === 'rook') {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === 'knight') {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === 'bishop') {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === 'king') {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === 'queen') {
      relativeMoves = this.getQueenRelativeMoves();
    } else {
      console.log("Unknown type", type)
    }
    return relativeMoves;
  }

  getabsoluteMoves(relativeMoves){
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
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


  getPawnRelativeMoves() {
    let result = [];
    if (this.player===WHITE_PLAYER) {
      result.push([1, 0]);
      return result;
    }else if (this.player===DARK_PLAYER ) {
      result.push([-1, 0]);
      return result;
    }
    else 
      return (undefined, console.log ("unknown player: "+ this.player))
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKnightRelativeMoves() {
    let result = [];
      result.push([-2, 1]);
      result.push([-1, 2]);
      result.push([1, 2]);
      result.push([2, 1]);
      result.push([2, -1]);
      result.push([1, -2]);
      result.push([-1, -2]);
      result.push([-2, -1]);
     
    return result;
  }

  getBishopRelativeMoves() {
    let result = [];
      for (let i=1; i<8; i++){
        result.push([i, i]);
        result.push([-i, i]);
        result.push([i, -i]);
        result.push([-i, -i]);
      }
    return result;
  }

  getKingRelativeMoves() {
    let result = [];
      for (let i=-1; i<2; i++)
        for (let j=-1; j<2; j++)
          if (!(i===0 && j===0))
           result.push([i, j]);
    return result;
  }

  getQueenRelativeMoves() {
    let result = [];
    for (let i=1; i<8; i++){
      result.push([i, i]);
      result.push([-i, i]);
      result.push([i, -i]);
      result.push([-i, -i]);
    }
    for (let j = 1; j < 8; j++) {
      result.push([j, 0]);
      result.push([-j, 0]);
      result.push([0, j]);
      result.push([0, -j]);
      }
    return result;
  }
} 

class BoardData {
  constructor() {
    this.data = getInitialPiecesBoard();
  }
  
  getPiece(row, col) {
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
  let boardData = new BoardData(); 
  pieces = boardData.data;


  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', chessBoard);




