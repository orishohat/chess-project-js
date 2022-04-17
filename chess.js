const BOARD_SIZE = 8;
var prevcolor = "white";
var previd = "cell-0_3";
// let chessBord = document.getElementById('chessBoard');


// for(i = 1; i < 9; i++){
//     let box1 = document.createElement('div')
//     if(i % 2 == 0){
//         box1.style.background = 'black'
//     }
//     else{
//         box1.style.background = 'white'
//     }
//     chessBord.appendChild(box1)
// }

// for(i = 1; i < 9; i++){
//     let box2 = document.createElement('div')
//     if(i % 2 == 0){
//         box2.style.background = 'white'
//     }
//     else{
//         box2.style.background = 'black'
//     }
//     chessBord.appendChild(box2)
// }

// for(i = 1; i < 9; i++){
//     let box3 = document.createElement('div')
//     if(i % 2 == 0){
//         box3.style.background = 'black'
//     }
//     else{
//         box3.style.background = 'white'
//     }
//     chessBord.appendChild(box3)
// }

// for(i = 1; i < 9; i++){
//     let box4 = document.createElement('div')
//     if(i % 2 == 0){
//         box4.style.background = 'white'
//     }
//     else{
//         box4.style.background = 'black'
//     }
//     chessBord.appendChild(box4)
// }


// for(i = 1; i < 9; i++){
//     let box5 = document.createElement('div')
//     if(i % 2 == 0){
//         box5.style.background = 'black'
//     }
//     else{
//         box5.style.background = 'white'
//     }
//     chessBord.appendChild(box5)
// }


// for(i = 1; i < 9; i++){
//     let box6 = document.createElement('div')
//     if(i % 2 == 0){
//         box6.style.background = 'white'
//     }
//     else{
//         box6.style.background = 'black'
//     }
//     chessBord.appendChild(box6)
// }

// for(i = 1; i < 9; i++){
//     let box7 = document.createElement('div')
//     if(i % 2 == 0){
//         box7.style.background = 'black'
//     }
//     else{
//         box7.style.background = 'white'
//     }
//     chessBord.appendChild(box7)
// }

// for(i = 1; i < 9; i++){
//     let box8 = document.createElement('div')
//     if(i % 2 == 0){
//         box8.style.background = 'white'
//     }
//     else{
//         box8.style.background = 'black'
//     }
//     chessBord.appendChild(box8)
// }

chessBoard()

function addImage(cell, type, name){
    const image = document.createElement('img');
    image.src = 'chess-pins/' + type + '/' + name + '.png';
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
        cell.onclick = function(event) {
            alert('chosen' + event.currentTarget.id);
            document.getElementById(previd).style.background = prevcolor;
            prevcolor = document.getElementById(event.currentTarget.id).style.background ;
            previd = event.currentTarget.id;
            document.getElementById(event.currentTarget.id).style.background = "blue";
            
           
         };
        if ((i + j) % 2 === 0) {
          cell.style.backgroundColor = 'white';
        } else {
          cell.style.backgroundColor = 'red';
        }
        cell.style.height = "90px";
        cell.style.width = "90px";
  
        if (i === 0) {
          addImageByIndex(cell, "white" , j);
        } else if (i === 1) {
          addImage(cell, "white", 'pawn');
        } else if (i === 6) {
          addImage(cell, "black", 'pawn');
        } else if (i === 7) {
          addImageByIndex(cell, "black" , j);
        }
      }
    }
  }
  
  