function Burana(x, y) {
    Phaser.Sprite.call(this, game, x, y, "burana");
    
    this.animations.add("idle", [0,1,2,3], 8, true);
    this.animations.play("idle");
    
    game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
    
    this.powerupType = "burana";
}

Burana.prototype = Object.create(Phaser.Sprite.prototype);
Burana.prototype.constructor = Burana;