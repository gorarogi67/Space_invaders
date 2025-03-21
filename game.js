const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

if (!ctx) {
    console.error("Errore: impossibile ottenere il contesto 2D del canvas!");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player, invaders = [], bullets = [];
let score = 0;
let gameOver = false;

function init() {
    player = new Player();
    spawnInvaders();
    gameLoop();
}

function gameLoop() {
    if (gameOver) {
        showGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.update();
    player.draw();

    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    invaders.forEach(invader => {
        invader.update();
        invader.draw();
    });

    checkCollisions();
    drawScore();

    if (invaders.length === 0) {
        levelUp();
    }

    requestAnimationFrame(gameLoop);
}

function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        invaders.forEach((invader, invaderIndex) => {
            if (
                bullet.x < invader.x + invader.width &&
                bullet.x + bullet.width > invader.x &&
                bullet.y < invader.y + invader.height &&
                bullet.y + bullet.height > invader.y
            ) {
                bullets.splice(bulletIndex, 1);
                invaders.splice(invaderIndex, 1);
                score += 10;
            }
        });
    });

    invaders.forEach((invader) => {
        if (
            invader.y + invader.height > player.y &&
            invader.x < player.x + player.width &&
            invader.x + invader.width > player.x
        ) {
            gameOver = true;
        }
    });
}

function showGameOver() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Punteggio: " + score, canvas.width / 2, canvas.height / 2 + 40);
    ctx.font = "20px Arial";
    ctx.fillText("Tocca per ricominciare", canvas.width / 2, canvas.height / 2 + 80);

    document.addEventListener("touchstart", restart, { once: true });
    document.addEventListener("keydown", restart, { once: true });
}

function restart() {
    score = 0;
    gameOver = false;
    bullets = [];
    invaders = [];
    init();
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Punteggio: " + score, 10, 20);
}

function levelUp() {
    spawnInvaders();
}

init();

