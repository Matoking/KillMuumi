GREY = 0;
BROWN = 3;

function Door(x, y, type) {
    type = GREY;
    
    Phaser.Sprite.call(this, game, x, y, "doors");
    
    this.animations.add("idle", [type+2]);
    this.animations.add("open", [type+2, type+1, type], 8, false);
    this.animations.add("opened", [type], 1, true);
    
    this.animations.play("idle", true);
    
    game.physics.arcade.enable(this);
    
    this.body.allowGravity = false;
    this.body.immovable = true;
}

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;
