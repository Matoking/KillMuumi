function Nuke(x, y) {
    this.sprite = game.make.sprite(x, y, "nuke");
    
    this.sprite.animations.add("idle", [0,1,2,3], 8, true);
    this.sprite.animations.play("idle");
    
    var state = game.state.getCurrentState();
    state.levelObstacles.add(this.sprite);
}