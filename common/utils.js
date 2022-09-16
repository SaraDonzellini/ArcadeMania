/* const splatAudio = new Audio('splat.mp3');

function playSplat() {
    const splatAudio = new Audio('splat.mp3');
    splatAudio.play();
    
} */

function showAlert(message){
    const gameArea = document.querySelector(".game-area");

    const alertMessaage = `
    <div class="game-alert">
        <div class="game-alert-message">${message}</div>
    </div>
    `;

    gameArea.innerHTML = gameArea.innerHTML + alertMessaage;
}

const restartButton = document.getElementById('restart');

restartButton.addEventListener('click', function(){
    window.location.reload();
})