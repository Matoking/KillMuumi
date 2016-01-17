function Dynamiitti(x, y, direction) {
    Phaser.Sprite.call(this, game, x, y, "dynamiitti");
    
    this.animations.add("idle", [0,1,2,3,4], 8, true);
    this.animations.play("idle");
    
    game.physics.arcade.enable(this);
    
    if (direction === "right") {
        this.body.velocity.x = 250 + (Math.random() * 75);
    } else {
        this.body.velocity.x = -250 - (Math.random() * 75);
    }
    
    this.body.velocity.y = -300 + (Math.random() * 150);
    
    this.body.angle = Math.random() * 180;
    
    this.body.angularVelocity = 220;
};

Dynamiitti.prototype = Object.create(Phaser.Sprite.prototype);
Dynamiitti.prototype.constructor = Dynamiitti;

Dynamiitti.prototype.resetDynamiitti = function(x, y, direction) {
    this.revive();
    
    this.x = x;
    this.y = y;
    
    if (direction === "right") {
        this.body.velocity.x = 250 + (Math.random() * 75);
    } else {
        this.body.velocity.x = -250 - (Math.random() * 75);
    }
    
    this.body.velocity.y = -200 - (Math.random() * 150);
    
    this.body.angle = Math.random() * 180;
    
    this.body.angularVelocity = 220;
}

Dynamiitti.prototype.blowUp = function() {
    var state = game.state.getCurrentState();
    
    var explosion = state.explosions.getFirstExists(false);
    
    if (explosion !== null) {
        explosion.revive();
        explosion.x = this.x - 32;
        explosion.y = this.y - 32;
    } else {
        explosion = game.make.sprite(this.x - 32, this.y - 32, "explosion");
        state.explosions.add(explosion);
    }
    
    explosion.scale.x = 2;
    explosion.scale.y = 2;
    explosion.animations.add("blow_up", [0,1,2,3], 12, false);
    explosion.animations.play("blow_up", 12, false, true);
    
    explosion.body.allowGravity = false;
    explosion.body.immovable = true;
    
    this.kill();
};