const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colorBtn = document.querySelectorAll(".controls__color");
const range = document.querySelector("#jsRange");
const modeBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const defualtColor = colorBtn[0].style.backgroundColor;


canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = defualtColor;
ctx.fillStyle = defualtColor;
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
    cavasCilck();
}

function mouseMove(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColor() {
    ctx.strokeStyle = this.style.backgroundColor;
    ctx.fillStyle = this.style.backgroundColor;
}

function changeBrushSize() {
    ctx.lineWidth = range.value;
}

function changeMode() {
    let text = modeBtn.innerText;
    if (text === "FILL"){
        modeBtn.innerText = "PAINT";      
    } else if(text === "PAINT") {
        modeBtn.innerText = "FILL"
    }
}

function cavasCilck() {
    if (modeBtn.innerText === "PAINT") {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function saveImage() {
    const img = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = img;
    link.download = "PaintJS[🎨]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",mouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
} 

colorBtn.forEach( color => color.addEventListener("click",changeColor));

if(range) {
    range.addEventListener("input",changeBrushSize);
}

if(modeBtn) {
    modeBtn.addEventListener("click",changeMode);
}

if(saveBtn) {
    saveBtn.addEventListener("click",saveImage);
}