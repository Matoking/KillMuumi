function Minigun(x, y) {
    Phaser.Sprite.call(this, game, x, y, "minigun");
    
    this.animations.add("idle", [0,1,2,3,4,5], 8, true);
    this.animations.play("idle");
    
    
}