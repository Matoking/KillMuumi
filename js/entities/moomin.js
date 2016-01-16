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
    this.followTimer = 0;
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
        
        // Following
        var yDistance = Math.abs(state.player.sprite.y - this.sprite.y);
        var xDistance = Math.abs(state.player.sprite.x - this.sprite.x);
        
        if (xDistance < 400 && yDistance < 150) {
            this.followTimer = game.time.now;
            
            if (this.direction === "left") {
                this.sprite.body.velocity.x = -250;
            } else {
                this.sprite.body.velocity.x = 250;
            }
            
            if (((this.sprite.body.blocked.left && this.direction === "left") ||
                 (this.sprite.body.blocked.right && this.direction === "right")) &&
                 this.sprite.body.blocked.down) {
                this.sprite.body.velocity.y = -280;
            }
        } else {
            // Keep moving for a while even if the player is lost
            if (this.followTimer > game.time.now - 800) {
                this.sprite.body.velocity.x = 0;
            }
        }
        
        // Shooting
        if (game.time.now > this.gunTimer + 200 && yDistance < 80) {
            var bullet = game.make.sprite(this.sprite.x, this.sprite.y, "bullets", 0);
            
            state.enemyBullets.add(bullet);
            
            bullet.body.allowGravity = false;
            
            if (this.direction === "right") {
                bullet.body.velocity.x = 800;
            } else {
                bullet.body.velocity.x = -800;
            }
            
            this.gunTimer = game.time.now;
        }
    }
};