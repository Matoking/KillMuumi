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
    
    this.minigunHold = 0;
    
    this.onGround = false;
}

Player.prototype = {
    die: function() {
        var state = game.state.getCurrentState();
        
        state.playerGibs.x = this.sprite.x + 16;
        state.playerGibs.y = this.sprite.y + 16;
        
        state.playerHeadGibs.x = this.sprite.x + 16;
        state.playerHeadGibs.y = this.sprite.y + 16;
        
        state.playerGibs.start(true, 6000, 0, 20);
        state.playerHeadGibs.start(true, 10000, 0, 20);
        
        this.sprite.kill();
        
        state.minigunSound.stop();
        
        this.dead = true;
        
        game.camera.follow(state.playerHeadGibs);
        
        state.gameOverSound.play();
    },
    
    shootLaser: function() {
        var laser = this.lasers.getFirstExists(false);
        
        if (laser !== null) {
            laser.revive();
            laser.x = this.sprite.x;
            laser.y = this.sprite.y;
            laser.loadTexture("bullets");
        } else {
            laser = game.make.sprite(this.sprite.x, this.sprite.y, "bullets");
            this.lasers.add(laser);
        }
        
        laser.health = 25;
        laser.body.allowGravity = false;
        laser.body.velocity.x = this.direction === "right" ? 700 : -700;
        laser.body.velocity.y = 0;
        laser.x += this.direction === "right" ? 30 : -20;
        laser.outOfBoundsKill = true;
    },
    
    shootShotgun: function() {
        for (var i=0; i < 15; i++) {
            var pellet = this.lasers.getFirstExists(false);
            
            if (pellet !== null) {
                pellet.revive();
                pellet.x = this.sprite.x;
                pellet.y = this.sprite.y;
                pellet.loadTexture("panos");
            } else {
                pellet = game.make.sprite(this.sprite.x, this.sprite.y, "panos");
                this.lasers.add(pellet);
            }
            
            pellet.health = 8;
            
            pellet.body.allowGravity = false;
            pellet.body.velocity.x = this.direction === "right" ? 700 : -700;
            
            pellet.body.velocity.y = 50 - Math.ceil(Math.random() * 100);
            
            pellet.x += this.direction === "right" ? 30 : -20;
            pellet.outOfBoundsKill = true;
        }
    },
    
    shootMinigun: function() {
        var pellet = this.lasers.getFirstExists(false);
            
        if (pellet !== null) {
            pellet.revive();
            pellet.x = this.sprite.x;
            pellet.y = this.sprite.y;
            pellet.loadTexture("panos");
        } else {
            pellet = game.make.sprite(this.sprite.x, this.sprite.y, "panos");
            this.lasers.add(pellet);
        }

        pellet.health = 4;
        pellet.body.allowGravity = false;
        pellet.body.velocity.x = this.direction === "right" ? 700 : -700;

        pellet.body.velocity.y = 50 - Math.ceil(Math.random() * 100);

        pellet.x += this.direction === "right" ? 30 : -20;
        pellet.outOfBoundsKill = true;
    },
    
    laserMapOverlap: function(laser, map) {
        laser.kill();
    },
    
    laserMoominOverlap: function(laser, moomin) {
        laser.kill();
        moomin.damage(laser.health);
    },
    
    update: function() {
        if (this.dead) {
            return;
        }
        
        var state = game.state.getCurrentState();
        
        game.physics.arcade.collide(this.lasers, state.mapLayer, this.laserMapOverlap, null, this);
        game.physics.arcade.collide(this.lasers, state.doors, this.laserMapOverlap, null, this);
        
        game.physics.arcade.overlap(this.lasers, state.moomins, this.laserMoominOverlap, null, this);
        
        if (this.health <= 0) {
            this.die();
            return;
        }
        
        if ((this.sprite.body.touching.down || this.sprite.body.onFloor()) &&
            this.sprite.body.deltaY() === 0 && !this.onGround) {
            this.onGround = true;
            state.kopSound.play('', 0, 0.2);
        }
        
        if (this.sprite.body.deltaY() !== 0) {
            this.onGround = false;
        }
        
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.sprite.animations.play("walk");
            this.sprite.body.velocity.x = -270;
            this.sprite.scale.x = -1;
            this.direction = "left";
        } else if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.sprite.animations.play("walk");
            this.sprite.body.velocity.x = 270;
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
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.X)) {
            if (this.minigunTimer < game.time.now && game.time.now > this.laserTimer + 500) {
                this.laserTimer = game.time.now;

                if (this.shotgunTimer > game.time.now) {
                    // Use shotgun
                    state.shotgunSound.play();
                    
                    this.shootShotgun();
                } else {
                    state.laserSound.play();
                    
                    this.shootLaser();
                }
            }
            
            if (this.minigunTimer > game.time.now && game.time.now > this.laserTimer + (500 - this.minigunHold)) {
                state.minigunSound.play('', 0, 1, true, false);

                this.minigunHold += game.time.elapsed * 1.0;

                if (this.minigunHold >= 450) {
                    this.minigunHold = 450;
                }

                this.shootMinigun();
                
                if (this.shotgunTimer > game.time.now && game.time.now > this.laserTimer + 500) {
                    // Use shotgun
                    this.laserTimer = game.time.now;
                    
                    state.shotgunSound.play();
                    
                    this.shootShotgun();
                }
            }
        } else {
            if (this.minigunHold > 0) {
                state.minigunPauseSound.play('', 0, 1, false, false);
            }
            
            state.minigunSound.stop();
            this.minigunHold = 0;
        }
    }
};