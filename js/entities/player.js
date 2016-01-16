function Player(x, y) {
    this.direction = "right";
    
    this.sprite = game.add.sprite(x, y, "player");
    this.sprite.anchor.setTo(0.5, 0.5);
    
    game.camera.follow(this.sprite);
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    this.sprite.body.collideWorldBounds = true;
    
    this.laserTimer = 0;
    
    this.lasers = game.add.physicsGroup();
}

Player.prototype = {
    shootLaser: function() {
        var laser = game.make.sprite(this.sprite.x, this.sprite.y, "laser");
        this.lasers.add(laser);
        
        laser.body.allowGravity = false;
        laser.body.velocity.x = this.direction == "right" ? 700 : -700;
        laser.x += this.direction == "right" ? 30 : -20;
        laser.outOfBoundsKill = true;
    },
    
    laserMapOverlap: function(laser, map) {
        laser.kill();
    },
    
    update: function() {
        var state = game.state.getCurrentState();
        
        game.physics.arcade.collide(this.lasers, state.mapLayer, this.laserMapOverlap, null, this);
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.sprite.body.velocity.x = -400;
            this.sprite.scale.x = -1;
            this.direction = "left";
        } else if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.sprite.body.velocity.x = 400;
            this.sprite.scale.x = 1;
            this.direction = "right";
        } else {
            this.sprite.body.velocity.x = 0;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.UP) && 
           (this.sprite.body.touching.down || this.sprite.body.onFloor())) {
            this.sprite.body.velocity.y = -280;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.X) && game.time.now > this.laserTimer + 500) {
            this.laserTimer = game.time.now;
            this.shootLaser();
        }
    }
};