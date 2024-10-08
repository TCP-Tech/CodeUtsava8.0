document.addEventListener("contentsLoaded", () => {
    const canvas = document.getElementById('codeutsava-404_page-gameCanvas');
    const ctx = canvas.getContext('2d');
    const startMessage = document.getElementById('codeutsava-404_page-startMessage');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const GRAVITY = 0.6;
    const GROUND_Y = canvas.height * 0.75;
    const MAX_JUMP_COUNT = 3;
    const JUMP_STRENGTH = 15;
    let jumpCount = 0;
    let score = 0;
    let highScore = 0;
    let gameOver = false;
    let gameStarted = false;
    const boxImage = new Image();
    boxImage.src = "../../assets/images/404/box.png";

    const playerImage = new Image();
    playerImage.src = "../../assets/images/404/player.png";

    class Player {
        constructor() {
            this.width = 72.8;
            this.height = 80;
            this.x = 100;
            this.y = GROUND_Y - this.height;
            this.velY = 0;
            this.jumpLimit = MAX_JUMP_COUNT;
            this.frameIndex = 0;
            this.frameSpeed = 8;
            this.frameCounter = 0;
            this.spriteWidth = 72.8;
            this.spriteHeight = 80;
            this.numFrames = 8;
            this.jumping = false; 
        }

        draw() {
            ctx.drawImage(
                playerImage,
                this.frameIndex * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        update() {
            this.velY += GRAVITY; 
            this.y += this.velY;
            if (this.y > GROUND_Y - this.height) {
                this.y = GROUND_Y - this.height;
                this.velY = 0;
                jumpCount = 0; 
                this.jumping = false;
            }
            this.frameCounter++;
            if (this.frameCounter % this.frameSpeed === 0) {
                if (!this.jumping) {
                    this.frameIndex = (this.frameIndex + 1) % this.numFrames;
                } else {
                    this.frameIndex = 5; 
                }
            }

            this.draw();
        }

        jump() {
            if (jumpCount < this.jumpLimit) {
                this.velY = -JUMP_STRENGTH; 
                jumpCount++;
                this.jumping = true;
            }
        }
    }

    class Obstacle {
        constructor() {
            this.width = 50;
            this.height = this.getRandomHeight();
            this.x = canvas.width;
            this.y = GROUND_Y - this.height;
            this.speed = 5;
        }

        getRandomHeight() {
            const heights = [50, 100, 150]; 
            return heights[Math.floor(Math.random() * heights.length)];
        }

        draw() {
            ctx.drawImage(boxImage, this.x, this.y, this.width, this.height);
        }

        update() {
            this.x -= this.speed;
            this.draw();
        }

        isCollidingWith(player) {
            return (
                player.x < this.x + this.width &&
                player.x + player.width > this.x &&
                player.y < this.y + this.height &&
                player.y + player.height > this.y
            );
        }
    }

    let player = new Player();
    let obstacles = [];

    function resetGame() {
        player = new Player();
        obstacles = [];
        score = 0;
        gameOver = false;
        spawnObstacles(); 
        gameLoop(); 
    }

    function spawnObstacles() {
        const interval = Math.random() * 3000 + 1000;
        if (!gameOver) {
            setTimeout(() => {
                obstacles.push(new Obstacle());
                spawnObstacles();
            }, interval);
        }
    }

    function startGame() {
        gameStarted = true;
        startMessage.style.display = 'none';
        canvas.style.display = 'block';
        spawnObstacles();
        gameLoop();
    }

    function jumpPlayer() {
        if (!gameOver && gameStarted) {
            player.jump();
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' && !gameStarted) {
            startGame();
        } else if (e.code === 'Space') {
            jumpPlayer();
            e.preventDefault(); 
        } else if (e.code === 'Enter' && gameOver) {
            resetGame(); 
        }
    });
    window.addEventListener('touchstart', () => {
        if (!gameStarted) {
            startGame();
        } else {
            jumpPlayer();
        }
    });

    function gameLoop() {
        if (gameOver) return; 

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(canvas.width, GROUND_Y);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        player.update();
        obstacles.forEach((obstacle, index) => {
            obstacle.update();
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(index, 1);
                score++; 
            }
            if (obstacle.isCollidingWith(player)) {
                gameOver = true;
                highScore = Math.max(highScore, score); 
                ctx.font = "30px Arial";
                ctx.textAlign = 'center';
                ctx.fillStyle = '#000';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;

                ctx.strokeText("Game Over", canvas.width / 2, canvas.height / 2);
                ctx.strokeText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
                ctx.strokeText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 80);
                ctx.strokeText("Press Enter to restart", canvas.width / 2, canvas.height / 2 + 120);
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
                ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
                ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 80);
                ctx.fillText("Press Enter to restart", canvas.width / 2, canvas.height / 2 + 120);
            }
        });
        
        ctx.font = "20px Arial";
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${score}`, 20, 30);
        ctx.fillText(`High Score: ${highScore}`, 20, 60);

        requestAnimationFrame(gameLoop); 
    }
});
