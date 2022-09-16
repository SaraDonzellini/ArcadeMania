const grid = document.querySelector('#grid');

const size = 15;
const rxc = size * size;

const cells = [];
const speed = 400;

const scoreEl = document.querySelector('#score');
let score = 0;
scoreEl.innerText = score;

for (let i = 0; i < rxc; i++) {
    const cell = document.createElement('div');
// cell.innerText = i;
    cells.push(cell);
    grid.appendChild(cell);
}

function checkHumanWin() {
    if(aliensKilled.length === aliens.length){
        showAlert('Human Wins');
        clearInterval(alienMoveIntVal);
    }
    
}

function checkForAlienWin() {
    for (let i = 0; i < aliens.length; i++) {
        if(
            !aliensKilled.includes(aliens[i]) && 
            aliens[i] >= spaceshipIdx
        ) {
            showAlert('Aliens Win')
            clearInterval(alienMoveIntVal);
        
    }}
}

const aliens = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39

    
]

const aliensKilled =[];
let alienMoveIntVal = null;


function drawAliens() {
    for (let i = 0; i < aliens.length; i++) {

        if(!aliensKilled.includes(i)) {
           cells[aliens[i]].classList.add('alien');
    
        }
    }
}

function removeAliens() {
    for (let i = 0; i < aliens.length; i++) {
        cells[aliens[i]].classList.remove('alien');
    
    }
}

//mov alieni
let step = 1;
let direction = 'forward'; //backward


function moveAliens() {
    const leftEdge = aliens[0] % size === 0;
    const rightEdge = aliens[aliens.length - 1] % size === size - 1;


    removeAliens();

    if (direction === 'forward' && rightEdge) {
        for(let i = 0; i < aliens.length; i++) {
        //scalare di una riga
        aliens[i] = aliens[i] + size + 1;
        //invertire senso di marcia
        step = -1;
        //cambiare direzione
        direction = 'backward';
        }
    }

    if (direction === 'backward' && leftEdge) {
        for(let i = 0; i < aliens.length; i++) {
        //scalare di una riga
        aliens[i] = aliens[i] + size - 1;
        //invertire senso di marcia
        step = +1;
        //cambiare direzione
        direction = 'forward';
        }
        
        
    }

    for (let i = 0; i < aliens.length; i++) {
        aliens[i] = aliens[i] + step;        
    }
    
    checkForAlienWin();
    drawAliens();
}

drawAliens();

setInterval(moveAliens, speed);


let spaceshipIdx = 217;
cells[spaceshipIdx].classList.add('ship');

function moveSpaceship(event) {
    const leftEdge = spaceshipIdx % size === 0;
    const rightEdge = spaceshipIdx % size === size - 1;

    cells[spaceshipIdx].classList.remove('ship');


    if(event.code === "ArrowLeft" && !leftEdge) {
        //sinistra
        spaceshipIdx--;
    } else if(event.code === "ArrowRight" && !rightEdge) {
        //destra
        spaceshipIdx++;
    }

    cells[spaceshipIdx].classList.add('ship');

    console.log('move!', event);
    
}

document.addEventListener('keydown', moveSpaceship);

function shoot(event) {
    if(event.code !=="Space") return;

    let laserIdx = spaceshipIdx;
    let laserIntVal = null;

    function moveLaser() {
        cells[laserIdx].classList.remove('laser');    
        laserIdx = laserIdx - size;

        if(laserIdx <0) {
            clearInterval(laserIntVal);
            return;
        }

        if(cells[laserIdx].classList.contains('alien')) {
            
            clearInterval(laserIntVal);
            cells[laserIdx].classList.remove('alien', 'laser');
            cells[laserIdx].classList.add('boom');

            
            setTimeout(function() {
                cells[laserIdx].classList.remove('boom');
            }, 200);

            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push(killed);

            checkHumanWin();
            score++; 
            scoreEl.innerText = score;
            console.log(score);


            return;
        }

        cells[laserIdx].classList.add('laser');
    }

    laserIntVal = setInterval(moveLaser, 200);
    
    
}



document.addEventListener('keydown', shoot);

