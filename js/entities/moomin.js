function Moomin(x, y, type) {
    type = typeof type !== 'undefined' ? type : 0;
    
    var state = game.state.getCurrentState();
    
    this.sprite = game.make.sprite(x, y, "moomins", type);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.direction = "right";
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    
    state.moomins.add(this.sprite);
    
    this.gunTimer = 0;
}

Moomin.prototype = {
    update: function() {
        var state = game.state.getCurrentState();
        
        if (state.player.sprite.x <= this.sprite.x) {
            this.direction = "left";
            this.sprite.scale.x = 1;
        } else {
            this.direction = "right";
            this.sprite.scale.x = -1;
        }
        
        var xDistance = Math.abs(state.player.sprite.y - this.sprite.y);
        
        if (game.time.now > this.gunTimer + 200 && xDistance < 80) {
            var bullet = game.make.sprite(this.sprite.x, this.sprite.y, "bullets", 0);
            
            state.enemyBullets.add(bullet);
            
            bullet.body.allowGravity = false;
            
            if (this.direction === "right") {
                bullet.body.velocity.x = 800;
            } else {
                bullet.body.velocity.x = -800;
            }
            
            console.log(bullet.body.velocity);
            
            this.gunTimer = game.time.now;
        }
    }
};