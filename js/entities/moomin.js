MUUMIPEIKKO = 0;
MUUMIPAPPA = 2;
MUUMIMAMMA = 6;
NIISKUNEITI = 8;
EN_MUISTA_TAMAN_TYYPIN_NIMEA = 10;
MUUMIPAPPA_ASE = 14;

function Moomin(x, y, type) {
    var randomNumber = Math.ceil(Math.random() * 30);
        
    if (randomNumber >= 1 && randomNumber <= 10) {
        this.enemyType = MUUMIPEIKKO;
    } else if (randomNumber >= 11 && randomNumber <= 14) {
        this.enemyType = MUUMIPAPPA;
    } else if (randomNumber >= 15 && randomNumber <= 21) {
        this.enemyType = MUUMIMAMMA;
    } else if (randomNumber >= 22 && randomNumber <= 26) {
        this.enemyType = NIISKUNEITI;
    } else {
        this.enemyType = EN_MUISTA_TAMAN_TYYPIN_NIMEA;
    }

    var state = game.state.getCurrentState();
    
    Phaser.Sprite.call(this, game, x, y, "moomins", type);
    this.health = 50;
    this.anchor.setTo(0.5, 0.5);
    this.direction = "right";
    
    this.animations.add("idle", [this.enemyType]);
    this.animations.add("walk", [this.enemyType, this.enemyType+1], 4, true);
    
    this.animations.add("gun_idle", [MUUMIPAPPA_ASE]);
    this.animations.add("gun_walk", [MUUMIPAPPA_ASE, MUUMIPAPPA_ASE+1], 4, true);
    
    this.animations.play("idle");
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    
    
    this.body.maxVelocity.y = 900;
    this.body.deltaMax.y = 900;
    this.gunTimer = 0;
    this.followTimer = 0;
    this.wanderTimer = 0;
    this.dynamiteTimer = 0;
    
    var state = game.state.getCurrentState();
    
    this.canThrowDynamite = Math.max(80, state.moominsKilled) + Math.ceil(Math.random() *  140) > 120 ? true : false;
    
    this.destroyed = false;
    this.wandering = true;
    
    this.speed = 80 + Math.random() * 50;
}

Moomin.prototype = Object.create(Phaser.Sprite.prototype);
Moomin.prototype.constructor = Moomin;

Moomin.prototype.resetMoomin = function(x, y) {
    this.x = x;
    this.y = y;
    
    var randomNumber = Math.ceil(Math.random() * 30);
        
    if (randomNumber >= 1 && randomNumber <= 10) {
        this.enemyType = MUUMIPEIKKO;
    } else if (randomNumber >= 11 && randomNumber <= 14) {
        this.enemyType = MUUMIPAPPA;
    } else if (randomNumber >= 15 && randomNumber <= 21) {
        this.enemyType = MUUMIMAMMA;
    } else if (randomNumber >= 22 && randomNumber <= 26) {
        this.enemyType = NIISKUNEITI;
    } else {
        this.enemyType = EN_MUISTA_TAMAN_TYYPIN_NIMEA;
    }

    var state = game.state.getCurrentState();
    
    this.health = 50;
    this.anchor.setTo(0.5, 0.5);
    this.direction = "right";
    
    this.animations.add("idle", [this.enemyType]);
    this.animations.add("walk", [this.enemyType, this.enemyType+1], 4, true);
    
    this.animations.add("gun_idle", [MUUMIPAPPA_ASE]);
    this.animations.add("gun_walk", [MUUMIPAPPA_ASE, MUUMIPAPPA_ASE+1], 4, true);
    
    this.animations.play("idle");
    
    this.body.collideWorldBounds = true;
    
    this.gunTimer = 0;
    this.followTimer = 0;
    this.wanderTimer = 0;
    this.dynamiteTimer = 0;
    
    this.canThrowDynamite = Math.max(80, state.moominsKilled) + Math.ceil(Math.random() *  140) > 120 ? true : false;
    
    this.destroyed = false;
    this.wandering = true;
};

Moomin.prototype.die = function(suicide) {
    suicide = typeof suicide !== 'undefined' ? suicide : false;
    
    var state = game.state.getCurrentState();

    state.moominGibs.x = this.x + 16;
    state.moominGibs.y = this.y + 16;
    
    state.explosionGibs.x = this.x + 16;
    state.explosionGibs.y = this.y + 16;

    if (!suicide) {
        state.moominsKilled += 1;
        state.killCountText.setText("Muumeja tapettu: " + state.moominsKilled);
        
        if (state.moominsKilled % 8 === 0) {
            state.playVoiceClip();
        }
    } else {
        console.log("ka blew");
        state.explosionSound.play();
        state.explosionGibs.start(true, 1500, 0, 50);
        
        var explosion = game.add.sprite(this.x - 32, this.y - 32, "explosion");
        explosion.scale.x = 2;
        explosion.scale.y = 2;
        explosion.animations.add("blow_up", [0,1,2,3], 12, false);
        explosion.animations.play("blow_up", 12, false, true);
    }

    state.moominGibs.start(true, 4500, 0, 10);

    this.kill();
    this.destroyed = true;
};
    
Moomin.prototype.update = function() {
    if (this.destroyed) {
        return;
    }

    if (this.health <= 0) {
        this.die();
        return;
    }
    
    if (this.body.velocity.x !== 0) {
        this.animations.play("walk");
    } else {
        this.animations.play("idle");
    }

    var state = game.state.getCurrentState();

    if (this.direction === "right") {
        this.scale.x = -1;
    } else {
        this.scale.x = 1;
    }

    // Following
    var yDistance = Math.abs(state.player.sprite.y - this.y);
    var xDistance = Math.abs(state.player.sprite.x - this.x);

    if (!state.player.dead && xDistance < 400 && yDistance < 150) {
        this.wandering = false;
        this.followTimer = game.time.now;
        
        if (state.player.sprite.x <= this.x) {
            this.direction = "left";
        } else {
            this.direction = "right";
        }

        if (this.direction === "left") {
            this.body.velocity.x = -this.speed;
        } else {
            this.body.velocity.x = this.speed;
        }
        
        // Jump randomly while chasing
        if (this.body.blocked.down && Math.random() * 60  > 58.53) {
            this.body.velocity.y = -280;
        }

        if (((this.body.blocked.left && this.direction === "left") ||
             (this.body.blocked.right && this.direction === "right")) &&
             this.body.blocked.down) {
            this.body.velocity.y = -280;
        }
        
        if (this.enemyType === MUUMIPAPPA) {
            this.animations.play("gun_walk");
        }
        
        if (game.time.now > this.dynamiteTimer && this.canThrowDynamite) {
            var dynamite = state.enemyDynamite.getFirstExists(false);

            if (dynamite !== null) {
                dynamite.resetDynamiitti(this.x, this.y, this.direction);
            } else {
                dynamite = new Dynamiitti(this.x, this.y, this.direction);
                state.enemyDynamite.add(dynamite);
            }

            this.dynamiteTimer = game.time.now + 1500 + Math.random() * 800;
        }
        
    } else {
        // Keep moving for a while even if the player is lost
        if (this.followTimer > game.time.now - 800) {
            this.body.velocity.x = 0;
            this.wandering = true;
        }
    }
    
    if (this.wandering && game.time.now > this.wanderTimer + 1500) {
        // If moomin was already moving, stop
        if (this.body.velocity.x !== 0) {
            this.body.velocity.x = 0;
            this.wanderTimer = game.time.now + Math.ceil(Math.random() * 400);
            return;
        } else {
            var randomNumber = Math.ceil(Math.random() * 2);

            if (randomNumber === 1) {
                this.body.velocity.x = 50 + Math.ceil(Math.random() * 50);
                this.wanderTimer = game.time.now + Math.ceil(Math.random() * 400) + 1200;
                this.direction = "right";
            } else if (randomNumber === 2) {
                this.body.velocity.x = -50 - Math.ceil(Math.random() * 50);
                this.wanderTimer = game.time.now + Math.ceil(Math.random() * 400) + 1200;
                this.direction = "left";
            }
        }
    }
    
    if (this.wandering) {
        if (((this.body.blocked.left && this.direction === "left") ||
             (this.body.blocked.right && this.direction === "right")) &&
             this.body.blocked.down) {
            this.wanderTimer = game.time.now;
            this.body.velocity.y = -380;
            
            this.body.velocity.x = this.direction === "right" ? 50 : -50;
        }
    }
    
    if (((this.body.blocked.left && this.direction === "left") ||
        (this.body.blocked.right && this.direction === "right")) &&
        this.body.blocked.down && this.body.deltaY() !== 0) {
       this.body.velocity.x = this.direction === "right" ? 450 : -450;
   }

    // Shooting
    if (!state.player.dead && this.enemyType === MUUMIPAPPA && game.time.now > this.gunTimer + 200 && yDistance < 80) {
        var bullet = state.enemyBullets.getFirstExists(false);
        
        if (bullet === null) {
            var bullet = game.make.sprite(this.x, this.y, "bullets", 0);
            state.enemyBullets.add(bullet);
        } else {
            bullet.revive();
            bullet.x = this.x;
            bullet.y = this.y;
        }
        
        bullet.body.allowGravity = false;

        if (this.direction === "right") {
            bullet.body.velocity.x = 800;
        } else {
            bullet.body.velocity.x = -800;
        }

        this.gunTimer = game.time.now;
    }
};