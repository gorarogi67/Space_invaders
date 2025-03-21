class Invader {
    constructor(x, y) {
        this.width = 40;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.direction = 1;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed * this.direction;

        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.direction *= -1;
            this.y += 20;
        }
    }
}

function spawnInvaders() {
    invaders = [];
    const rows = 5;
    const cols = 8;
    const spacing = 60;
    const startX = (canvas.width - cols * spacing) / 2;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            invaders.push(new Invader(startX + j * spacing, i * 40 + 50));
        }
    }
}

