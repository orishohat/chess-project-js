let chessBord = document.getElementById('chessBoard');

for(i = 1; i < 9; i++){
    let box1 = document.createElement('div')
    if(i % 2 == 0){
        box1.style.background = 'black'
    }
    else{
        box1.style.background = 'white'
    }
    chessBord.appendChild(box1)
}

for(i = 1; i < 9; i++){
    let box2 = document.createElement('div')
    if(i % 2 == 0){
        box2.style.background = 'white'
    }
    else{
        box2.style.background = 'black'
    }
    chessBord.appendChild(box2)
}

for(i = 1; i < 9; i++){
    let box3 = document.createElement('div')
    if(i % 2 == 0){
        box3.style.background = 'black'
    }
    else{
        box3.style.background = 'white'
    }
    chessBord.appendChild(box3)
}

for(i = 1; i < 9; i++){
    let box4 = document.createElement('div')
    if(i % 2 == 0){
        box4.style.background = 'white'
    }
    else{
        box4.style.background = 'black'
    }
    chessBord.appendChild(box4)
}


for(i = 1; i < 9; i++){
    let box5 = document.createElement('div')
    if(i % 2 == 0){
        box5.style.background = 'black'
    }
    else{
        box5.style.background = 'white'
    }
    chessBord.appendChild(box5)
}


for(i = 1; i < 9; i++){
    let box6 = document.createElement('div')
    if(i % 2 == 0){
        box6.style.background = 'white'
    }
    else{
        box6.style.background = 'black'
    }
    chessBord.appendChild(box6)
}

for(i = 1; i < 9; i++){
    let box7 = document.createElement('div')
    if(i % 2 == 0){
        box7.style.background = 'black'
    }
    else{
        box7.style.background = 'white'
    }
    chessBord.appendChild(box7)
}

for(i = 1; i < 9; i++){
    let box8 = document.createElement('div')
    if(i % 2 == 0){
        box8.style.background = 'white'
    }
    else{
        box8.style.background = 'black'
    }
    chessBord.appendChild(box8)
}

function addimage(cell, type, name){
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png';
    cell.appendChild(image);
  }



function addImageByIndex(cell, type, index) {
    if (index === 0 || index === 7) {
      addImage(cell, type, 'rook');
    } else if (index === 1 || index === 6) {
      addImage(cell, type, 'knight');
    } else if (index === 2 || index === 5) {
      addImage(cell, type, 'bishop');
    } else if (index === 3) {
      addImage(cell, type, 'king');
    } else if (index === 4) {
      addImage(cell, type, 'queen');
    }
  }
  
  function chessBoard() {
    const table1 = document.createElement('table');
    document.body.appendChild(table1);
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = table1.insertRow();
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cell = row.insertCell();
        cell.id = "cell-" + i.toString() + "_" + j.toString();
        if ((i + j) % 2 === 0) {
          cell.className = 'white';
        } else {
          cell.className = 'black';
        }
  
        if (i === 0) {
          addImageByIndex(cell, WHITE_TYPE, j);
        } else if (i === 1) {
          addImage(cell, WHITE_TYPE, 'pawn');
        } else if (i === 6) {
          addImage(cell, DARK_TYPE, 'pawn');
        } else if (i === 7) {
          addImageByIndex(cell, DARK_TYPE, j);
        }
      }
    }
  }