

// inseriamo il punteggio iniz
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

//timer
const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;

// inseriamo il bug in una cella via JS
const cells = document.querySelectorAll('.cell');


// valore di velocità iniziale
let bugSpeed = 800;

// logica per randomizzare il bug
function randomBug() {
    // da fare; pulire le celle prima di randomizzarne un'altra
    removeBug();

    //aumentiamo la difficoltà
if (score === 20) {
    bugSpeed = bugSpeed / 2;
    
}


    //randomizza una cella a caso
    const randomNumber = Math.floor(Math.random() * cells.length);
    const cell = cells[randomNumber];
    cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug() {
    for (let i = 0; i < cells.length; i++){
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
    
}

// diamo modo all'utente di cliccare il bug

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function() {
        if(cell.classList.contains('bug')){
            score++;
            scoreDisplay.innerText = score;

            cell.classList.remove('bug');
            cell.classList.add('splat');
            playSplat();

            setTimeout(function(){
                cell.classList.remove('splat');
            }, 200);

        }        
    });
    
}

const timer = setInterval(countDown, 1000);

function countDown() {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if(timeLeft === 0){
        clearInterval(timer);
        clearInterval(bugMovement);
        removeBug();
        showAlert(`GAME OVER! 
        Punti: ${score}`);
    }
}

const splatAudio = new Audio('../common/splat.mp3');

function playSplat() {
    const splatAudio = new Audio('../common/splat.mp3');
    splatAudio.play();
    
}


// tasto rigioca
/* const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', function(){
    window.location.reload();
}) */

