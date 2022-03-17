

// Sketch grid creation 
const grid = document.getElementById('sketch-box');
let size =12; 
let elements=1;

createGrid(size);

function createGrid (size) {
    for (let i=1; i<size ; i++){
        elements++;
        createRows(i); 
    } 
}

function createRows(i){
    const gridRow = document.createElement('div');
    gridRow.className = 'rows';
    gridRow.setAttribute('data-row',i);
    grid.appendChild(gridRow);

    // console.log(gridRow);
    for (let i=1; i<=size; i++){
        elements++;
        createRowElements(gridRow,elements);
    }
}

function createRowElements(gridRow,elements){
   const rowElements = document.createElement('div');
   rowElements.className = 'row-Elements';
   rowElements.setAttribute('data-rowElement',elements);
   gridRow.appendChild(rowElements);    
}

//Sketch drawing

grid.addEventListener('mouseover', draw)

function draw(e){
    console.log(e.target);

}

