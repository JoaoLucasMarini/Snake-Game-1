const mainGame = document.getElementById('mainGame');
const endGame = document.getElementById('endGame');
const snake = document.getElementById('snake');
const fruit = document.getElementById('fruit');
const pointsDisplay = document.getElementById("points");
const endPoints = document.getElementById('totalPoints');
const body = document.body;

let leftPosition = 224;
let topPosition = 230;

let speed = 40;

let points = -1;

snake.style.cssText = `left:${leftPosition}px;top:${topPosition}px;`;

function startGame() {
    leftPosition = 224;
    topPosition = 230;
    points = -1
    speed = 40;
    clearInterval(leftInterval);
    clearInterval(rightInterval);
    clearInterval(upInterval);
    clearInterval(downInterval);
    endGame.style.display = "none";
    mainGame.style.display = "block";
    
    getFruit();
}


function endGameFunc() {
    endPoints.textContent = `Pontuação Final: ${points}`
    endGame.style.display = "block";
    mainGame.style.display = "none";
    leftPosition = 224;
    topPosition = 230;
}

let leftInterval = null;
let rightInterval = null;
let upInterval = null;
let downInterval = null;


document.addEventListener('keydown', (e) => {
    e.preventDefault();

    switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            clearInterval(rightInterval);
            clearInterval(upInterval);
            clearInterval(downInterval);
            if (leftInterval > 1) clearInterval(leftInterval);
            leftInterval = setInterval(() => {
                leftArrow();
            }, speed);            
            break;
        case "ArrowRight":
        case "d":
        case "D":
                clearInterval(leftInterval);
                clearInterval(upInterval);
                clearInterval(downInterval);
                if (rightInterval > 1) clearInterval(rightInterval);
                rightInterval = setInterval(() => {
                rightArrow();
                }, speed);
            break;
        case "ArrowUp":
        case "w":
        case "W":
            clearInterval(leftInterval);
            clearInterval(rightInterval);
            clearInterval(downInterval);
            if (upInterval > 1) clearInterval(upInterval);
            upInterval = setInterval(() => {
                upArrow();
            }, speed);
            break;
        case "ArrowDown":
        case "s":
        case "S":       
            clearInterval(leftInterval);
            clearInterval(rightInterval);
            clearInterval(upInterval)
            if (downInterval > 1) clearInterval(downInterval);
            downInterval = setInterval(() => {
                downArrow();
            }, speed);
            break;
        default:
            break;
    }
});


function leftArrow() { 
    leftPosition -= 5;
    if (leftPosition < 0) {
        endGameFunc();
        return;
    }
    snake.style.cssText = `left:${leftPosition}px;top:${topPosition}px`; 
}


function rightArrow() {
    clearInterval(leftInterval)
    leftPosition += 5;
    if (leftPosition > 463) {
        endGameFunc();
        return;
    }
    snake.style.cssText = `left:${leftPosition}px;top:${topPosition}px`; 
}

function upArrow() {
    topPosition -= 5;
    if (topPosition < 0) {
        endGameFunc();
        return;
    }
    snake.style.cssText = `left:${leftPosition}px;top:${topPosition}px`; 
}

function downArrow() {
    topPosition += 5;
    if (topPosition > 461) {
        endGameFunc();
        return;
    }
    snake.style.cssText = `left:${leftPosition}px;top:${topPosition}px`; 
}


function getFruit() {
    points++
    if (speed <= 1) {
        speed -= 0.1
    }
    speed--
    fruit.style.top = `${getRandomInt(10, 450)}px`;
    fruit.style.left = `${getRandomInt(10, 450)}px`;
    pointsDisplay.textContent = `Pontuação: ${points}`;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function darkMode() {
    if (body.style.backgroundColor === "white" || body.style.backgroundColor === "") {
        body.style.backgroundColor = "black";
        body.style.color = "white"
        return;
    }
    body.style.backgroundColor = "white";
    body.style.color = "black";
}

function verifyColision() {
    const fruitTop = parseFloat(fruit.style.top) || 0;
    const fruitLeft = parseFloat(fruit.style.left) || 0;

    const Xdistance = Math.abs(leftPosition - fruitLeft);
    const Ydistance = Math.abs(topPosition - fruitTop);

    if (Xdistance < 15 && Ydistance < 15) {
        getFruit();
    }
    
    requestAnimationFrame(verifyColision);
}
requestAnimationFrame(verifyColision);

startGame();

