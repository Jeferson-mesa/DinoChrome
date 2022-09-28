let time = new Date()
let deltaTime = 0;

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1)
} else {
    document.addEventListener("DOMContentLoaded", init)
}

function init() {
    time = new Date()
    start()
    loop()
}

function loop(){
    deltaTime = (new Date() - time) / 1000
    time = new Date
    update()
    requestAnimationFrame(loop)
}

//Game Logic

let floorY = 22;
let SpeedY = 0;
let impulse = 900;
let gravity = 2500;

let dinoPosX = 42;
let dinoPosY = floorY;

let floorX = 0;
let speedScenery = 1280/3;
let gameSpeed = 1;
let score = 0;

let stop = false;
let jumps = false;

let container
let dino
let scoreText
let floor
let gameOver

function start() {
    floor = document.querySelector(".floor")
    container = document.querySelector(".container")
    scoreText = document.querySelector(".score")
    dino = document.querySelector(".dino")
    document.addEventListener("keydown", handleKeyDown)
}

function update() {
    moveFloor();
    moveDino();
    SpeedY -= gravity * deltaTime;
}

function moveFloor() {
    floorX += calculateMove()
    floor.style.left = -(floorX % container.clientWidth) + "px"
}

function calculateMove() {
    return speedScenery * deltaTime * gameSpeed
}

function handleKeyDown(e) {
    if(e.keyCode = 32){
        jump();
    }
}

function jump(){
    if(dinoPosY === floorY) {
        jumps = true;
        SpeedY = impulse;
        dino.classList.remove("dino-running");
    }
}

function moveDino(){
    dinoPosY += SpeedY * deltaTime;

    if(dinoPosY < floorY){
        hitGround();
    }
    dino.style.bottom = dinoPosY + "px";
}

function hitGround() {
    dinoPosY = floorY;
    SpeedY = 0;
    if(jump){
        dino.classList.add("dino-running");
    }
    jumps = false;
}