function Nuke(x, y) {
    Phaser.Sprite.call(this, game, x, y, "nuke");
    
    this.animations.add("idle", [0,1,2,3,4,5], 8, true);
    this.animations.play("idle");
    
    game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
    
    this.powerupType = "nuke";
}

Nuke.prototype = Object.create(Phaser.Sprite.prototype);
Nuke.prototype.constructor = Nuke;