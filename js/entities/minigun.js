function Minigun(x, y) {
    Phaser.Sprite.call(this, game, x, y, "minigun");
    
    this.animations.add("idle", [0,1,2,3,4,5], 8, true);
    this.animations.play("idle");
    
    game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
    
    this.powerupType = "minigun";
}

Minigun.prototype = Object.create(Phaser.Sprite.prototype);
Minigun.prototype.constructor = Minigun;