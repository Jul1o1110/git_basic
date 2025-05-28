const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: 50,
    width: 30,
    color: 'blue',
    speed: 5
};

const enemy1 = {
    x: 300,
    y: 300,
    width: 30,
    color: 'red',
    dx: 2,
    dy: 2
};

const enemy2 = {
    x: 100,
    y: 100,
    width: 30,
    color: 'white', 
    dx: 3,
    dy: 3
};

let score = 0;
let lives = 3;
let gameOver = false;

function drawBox(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawBox(player.x, player.y, player.width, player.color); 
    drawBox(enemy1.x, enemy1.y, enemy1.width, enemy1.color); 
    drawBox(enemy2.x, enemy2.y, enemy2.width, enemy2.color); 
}

function updateEnemy(enemy) {
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;

    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) { 
        enemy.dx *= -1;
    }
    if (enemy.y <= 0 || enemy.y + enemy.width >= canvas.height) { 
        enemy.dy *= -1;
    }
}

function checkCollision() {
    const checkEnemyCollision = (enemy) => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.width) { 
            if (enemy === enemy1) {
                loseLife();
            } else if (enemy === enemy2) {
                score++;
                document.getElementById('score').textContent = score;
                enemy.x = Math.random() * (canvas.width - enemy.width); 
                enemy.y = Math.random() * (canvas.height - enemy.width); 
                enemy.dx *= 1.05;
                enemy.dy *= 1.05;
            }
        }
    };

    checkEnemyCollision(enemy1);
    checkEnemyCollision(enemy2); 
}

function loseLife() {
    lives--;
    document.getElementById('lives').textContent = lives;

    if (lives <= 0) {
        document.getElementById('gameOverOverlay').style.display = 'flex'; 
        gameOver = true;
        setTimeout(resetGame, 3000);
    }
}

function update() {
    if (gameOver) return;

    draw();
    updateEnemy(enemy1); 
    updateEnemy(enemy2); 
    checkCollision();

    if (
        player.x < 0 || player.x + player.width > canvas.width || 
        player.y < 0 || player.y + player.width > canvas.height 
    ) {
        loseLife();
        player.x = canvas.width / 2;
        player.y = canvas.height / 2;
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;

    switch (e.key) {
        case 'ArrowUp': player.y -= player.speed; break;
        case 'ArrowDown': player.y += player.speed; break;
        case 'ArrowLeft': player.x -= player.speed; break; 
        case 'ArrowRight': player.x += player.speed; break;
    }
});

function resetGame() {
    score = 0;
    lives = 3;
    player.x = 50;
    player.y = 50;

    enemy1.x = 300;
    enemy1.y = 300;
    enemy1.dx = 2;
    enemy1.dy = 2;

    enemy2.x = 100; 
    enemy2.y = 100;
    enemy2.dx = 3; 
    enemy2.dy = 3;

    gameOver = false;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('gameOverOverlay').style.display = 'none';

    update();
}

update();

