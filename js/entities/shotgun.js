function Shotgun(x, y) {
    Phaser.Sprite.call(this, game, x, y, "shotgun");
    
    this.animations.add("idle", [0,1,2,3,4], 8, true);
    this.animations.play("idle");
    
    game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
    
    this.powerupType = "shotgun";
}

Shotgun.prototype = Object.create(Phaser.Sprite.prototype);
Shotgun.prototype.constructor = Shotgun;