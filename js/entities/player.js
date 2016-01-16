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
}

Player.prototype = {
    shootLaser: function() {
        var laser = game.make.sprite(this.sprite.x, this.sprite.y, "laser");
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
        var state = game.state.getCurrentState();
        
        game.physics.arcade.collide(this.lasers, state.mapLayer, this.laserMapOverlap, null, this);
        game.physics.arcade.overlap(this.lasers, state.moomins, this.laserMoominOverlap, null, this);
        
        
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
            this.sprite.body.velocity.y = -280;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.X) && game.time.now > this.laserTimer + 500) {
            this.laserTimer = game.time.now;
            this.shootLaser();
        }
        
        // Handle the stairs here somehow
        if (this.sprite.body.deltaY() >= 0) {
            var mapData = state.mapLayer.getTiles(this.sprite.x - (this.sprite.x % 32),
                                                  this.sprite.y - (this.sprite.y % 32) - 8,
                                                  32, 32,
                                                  false, false);
                                   
            console.log(mapData.length);
            
            for (var i=0; i < mapData.length; i++) {
                var t = mapData[i];
                
                console.log(t.properties);
                
                if ("slope" in t.properties && t.properties.slope === "2") {
                    this.sprite.y = t.worldY - (this.sprite.x % 32) + 5;
                }
            }
        }
    }
};