function Clock(x, y) {
    this.sprite = game.add.sprite(x, y, "clock");
    
    this.sprite.animations.add("idle", [0,1,2,3,4,5], 8, true);
    this.sprite.animations.play("idle");
}