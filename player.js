class Player {
    constructor() {
        this.width = 50;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 60;
        this.speed = 5;
        this.movingLeft = false;
        this.movingRight = false;

        document.addEventListener("touchmove", (e) => {
            this.x = e.touches[0].clientX - this.width / 2;
        });

        document.addEventListener("touchstart", () => this.shoot());

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.movingLeft = true;
            if (e.key === "ArrowRight") this.movingRight = true;
            if (e.key === " ") this.shoot();
        });

        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft") this.movingLeft = false;
            if (e.key === "ArrowRight") this.movingRight = false;
        });
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    shoot() {
        bullets.push(new Bullet(this.x + this.width / 2, this.y));
    }

    update() {
        if (this.movingLeft) this.x -= this.speed;
        if (this.movingRight) this.x += this.speed;

        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }
}

