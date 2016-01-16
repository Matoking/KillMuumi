function Player(x, y) {
    this.direction = "right";
    
    this.sprite = game.add.sprite(x, y, "player");
    this.sprite.anchor.setTo(0.5, 0.5);
    
    this.sprite.animations.add("idle", [0], 1, true);
    this.sprite.animations.add("walk", [0,1,2,3], 8, true);
    
    this.sprite.animations.play("idle");
    
    game.camera.follow(this.sprite);
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    this.sprite.body.collideWorldBounds = true;
    
    this.laserTimer = 0;
    
    this.lasers = game.add.physicsGroup();
    
    this.health = 1000;
    
    this.dead = false;
    
    this.shotgunTimer = 0;
    this.minigunTimer = 0;
}

Player.prototype = {
    die: function() {
        var state = game.state.getCurrentState();
        
        state.playerGibs.x = this.sprite.x + 16;
        state.playerGibs.y = this.sprite.y + 16;
        
        state.playerHeadGibs.x = this.sprite.x + 16;
        state.playerHeadGibs.y = this.sprite.y + 16;
        
        state.playerGibs.start(true, 9000, 0, 20);
        state.playerHeadGibs.start(true, 900000, 0, 20);
        
        this.sprite.kill();
        
        this.dead = true;
        
        game.camera.follow(state.playerHeadGibs);
    },
    
    shootLaser: function() {
        var laser = game.make.sprite(this.sprite.x, this.sprite.y, "bullets");
        this.lasers.add(laser);
        
        laser.body.allowGravity = false;
        laser.body.velocity.x = this.direction === "right" ? 700 : -700;
        laser.x += this.direction === "right" ? 30 : -20;
        laser.outOfBoundsKill = true;
    },
    
    laserMapOverlap: function(laser, map) {
        laser.kill();
    },
    
    laserMoominOverlap: function(laser, moomin) {
        laser.kill();
        moomin.damage(25);
    },
    
    update: function() {
        if (this.dead) {
            return;
        }
        
        var state = game.state.getCurrentState();
        
        game.physics.arcade.collide(this.lasers, state.mapLayer, this.laserMapOverlap, null, this);
        game.physics.arcade.overlap(this.lasers, state.moomins, this.laserMoominOverlap, null, this);
        
        if (this.health <= 0) {
            this.die();
            return;
        }
        
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.sprite.animations.play("walk");
            this.sprite.body.velocity.x = -400;
            this.sprite.scale.x = -1;
            this.direction = "left";
        } else if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.sprite.animations.play("walk");
            this.sprite.body.velocity.x = 400;
            this.sprite.scale.x = 1;
            this.direction = "right";
        } else {
            this.sprite.animations.play("idle");
            this.sprite.body.velocity.x = 0;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.UP) && 
           (this.sprite.body.touching.down || this.sprite.body.onFloor())) {
            this.sprite.body.velocity.y = -350;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.X) && game.time.now > this.laserTimer + 500) {
            this.laserTimer = game.time.now;
            this.shootLaser();
        }
    }
};