const DEFAULT_COLOR = '#373737';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 24;

let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
let size = DEFAULT_SIZE;
let showgrid = true;

const grid = document.getElementById('sketch-box');
const colorPicker = document.getElementById('colorPicker');
const btnColor = document.getElementById('btn-color');
const btnRainbow = document.getElementById('btn-rainbow');
const btnErase = document.getElementById('btn-erase');
const btnClear = document.getElementById('btn-clear');
// const btnGrid = document.getElementById('btn-grid');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

colorPicker.onchange = (e) => setColor(e.target.value);
btnColor.onclick = () => setMode('color');
btnRainbow.onclick = () => setMode('rainbow');
btnErase.onclick = () => setMode('eraser');
btnClear.onclick = () => resetGrid();
// btnGrid.onclick = () => setMode('toggleGrid');
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onclick = (e) => changeSize(e.target.value); 

let elements=0;


// Sketch grid creation - Using Flex aproach

function createGrid (size) {  
    elements=0; //Reset de identifier countdown after grid update
    for (let i=1; i<=size ; i++){
        createRows(i); 
    } 
}

function createRows(row){
    const gridRow = document.createElement('div');
    gridRow.className = 'rows';
    grid.appendChild(gridRow);

    for (let i=1; i<=size; i++){
        createRowElements(gridRow,elements++,row);
    }
}

function createRowElements(gridRow,filler,row){
    const rowElements = document.createElement('div');
    rowElements.className = 'row-Elements';
    rowElements.setAttribute('data-rowElement',elements);
    rowElements.addEventListener('mousedown', draw);
    rowElements.addEventListener('mouseover', draw);
    
    if(showgrid){
        rowElements.classList.add('grid');
    } else{
        rowElements.classList.remove('grid');
    }
    
    
    // if (elements=1){
    //     let topLCorner = document.querySelector('div[data-rowElement=1]');
    //     topLCorner.classList.add('roundCorners');
    //     console.log(topLCorner);
    // }else if (elements==size){

    // }else if (elements==((size*size)-(size+1))){

    // }else if (elements==(size*size)){

    // }

    gridRow.appendChild(rowElements); 
    
    if ((row=size)&&(i=size)){
        makeRoundCorners(size);
    } 
}

function resetGrid() {
    clearGrid ();
    createGrid (size);
}

function clearGrid() {
    grid.innerHTML='';
}


//Sketch drawing

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function draw(e){
    if (e.type === 'mouseover' && !mouseDown) return;
    console.log(e.target);
    if (mode === 'rainbow') {
        const randomR = Math.floor(Math.random() * (245 - 35) + 35); //To not have to dark or to light colors
        const randomG = Math.floor(Math.random() * (245 - 35) + 35);
        const randomB = Math.floor(Math.random() * (245 - 35) + 35);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
      } else if (mode === 'color') {
        e.target.style.backgroundColor = color;
      } else if (mode === 'eraser') {
        e.target.style.backgroundColor = 'rgb(228, 228, 228)';
      }
}

//Sketch options and features

function changeSize(value) {
    setSize(value);
    updateSizeValue(value);
    resetGrid();
}

function setColor(newColor) {
    color = newColor;
}

function setMode(newMode) {
    toggleButtons(newMode);
    mode = newMode;
}

function setSize(newSize) {
    size = newSize;
} 

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function toggleButtons(newMode) {
    if (mode === 'rainbow') {
        btnRainbow.classList.remove('active')
    } else if (mode === 'color') {
        btnColor.classList.remove('active')
    } else if (mode === 'eraser') {
        btnErase.classList.remove('active')
    } 
    
    // else if (mode === 'toggleGrid') {
    //    showgrid=false;
    //    resetGrid();
    // }    
    


    if (newMode === 'rainbow') {
      btnRainbow.classList.add('active')
    } else if (newMode === 'color') {
      btnColor.classList.add('active')
    } else if (newMode === 'eraser') {
      btnErase.classList.add('active')
    } 
    
    // else if (newMode === 'toggleGrid') {
    //     showgrid=true;
    //     resetGrid();
    // }   
}

function makeRoundCorners(size){
    

    let topRCorner = size;
    let bottomRCorner = size*size;
    let bottomLCorner = (size*size)-(size-1);


}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    toggleButtons(DEFAULT_MODE);
}