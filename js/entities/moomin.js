function Moomin(x, y, type) {
    this.type = typeof type !== 'undefined' ? type : 0;
    
    var state = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, x, y, "moomins", type);
    //this.sprite = game.make.sprite(x, y, "moomins", type);
    this.health = 50;
    this.anchor.setTo(0.5, 0.5);
    this.direction = "right";
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    
    state.moomins.add(this);
    
    this.gunTimer = 0;
    this.followTimer = 0;
    
    this.destroyed = false;
}

Moomin.prototype = Object.create(Phaser.Sprite.prototype);
Moomin.prototype.constructor = Moomin;

Moomin.prototype.die = function() {
    var state = game.state.getCurrentState();

    state.moominGibs.x = this.x + 16;
    state.moominGibs.y = this.y + 16;

    state.moominGibs.start(true, 4500, 0, 10);

    this.kill();
    this.destroyed = true;
};
    
Moomin.prototype.update = function() {
    if (this.destroyed) {
        return;
    }

    if (this.health <= 0) {
        this.die();
        return;
    }

    var state = game.state.getCurrentState();

    if (state.player.sprite.x <= this.x) {
        this.direction = "left";
        this.scale.x = 1;
    } else {
        this.direction = "right";
        this.scale.x = -1;
    }

    // Following
    var yDistance = Math.abs(state.player.sprite.y - this.y);
    var xDistance = Math.abs(state.player.sprite.x - this.x);

    if (xDistance < 400 && yDistance < 150) {
        this.followTimer = game.time.now;

        if (this.direction === "left") {
            this.body.velocity.x = -250;
        } else {
            this.body.velocity.x = 250;
        }

        if (((this.body.blocked.left && this.direction === "left") ||
             (this.body.blocked.right && this.direction === "right")) &&
             this.body.blocked.down) {
            this.body.velocity.y = -280;
        }
    } else {
        // Keep moving for a while even if the player is lost
        if (this.followTimer > game.time.now - 800) {
            this.body.velocity.x = 0;
        }
    }

    // Shooting
    if (game.time.now > this.gunTimer + 200 && yDistance < 80) {
        var bullet = game.make.sprite(this.x, this.y, "bullets", 0);

        state.enemyBullets.add(bullet);

        bullet.body.allowGravity = false;

        if (this.direction === "right") {
            bullet.body.velocity.x = 500;
        } else {
            bullet.body.velocity.x = -500;
        }

        this.gunTimer = game.time.now;
    }
};