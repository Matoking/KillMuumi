var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create
}, false, false);

function preload() {
    this.load.image('testiKuva', 'assets/img/shite.png');
    this.load.image('laser', 'assets/img/laaseri.png');
    this.load.image('player_head', 'assets/img/sankaripaa.png');
    this.load.image('elamapalkki', 'assets/img/elamapalkki.png');
    this.load.image('elamapalkki_tayte', 'assets/img/elamapalkki_tayte.png');
    this.load.image('valahdys', 'assets/img/valahdys.png');
    this.load.image('panos', 'assets/img/panos.png');
    this.load.image('karkki', 'assets/img/karkki.png');

    this.load.spritesheet('tiles', 'assets/img/tilet.png', 32, 32);
    this.load.spritesheet('moomins', 'assets/img/tyypit.png', 32, 32);
    this.load.spritesheet('moomin_gibs', 'assets/img/muuminpalaset.png', 8, 8);
    this.load.spritesheet('player_gibs', 'assets/img/pelaajanpalaset.png', 8, 8);
    this.load.spritesheet('explosion_gibs', 'assets/img/tuhka.png', 1, 1);
    this.load.spritesheet('doors', 'assets/img/ovet.png', 32, 32);

    this.load.spritesheet('bullets', 'assets/img/bullets.png', 8, 4);

    this.load.tilemap("map", "assets/maps/map.json", null, Phaser.Tilemap.TILED_JSON);

    this.load.spritesheet('player', 'assets/img/sankari.png', 23, 31);
    this.load.spritesheet('amme', 'assets/img/amme.png', 42, 20);
    this.load.spritesheet('burana', 'assets/img/burana.png', 31, 9);
    this.load.spritesheet('dynamiitti', 'assets/img/dynamiitti.png', 12, 5);
    this.load.spritesheet('hella', 'assets/img/hella.png', 18, 24);
    this.load.spritesheet('keittiokaappi', 'assets/img/keittiokaappi.png', 64, 44);
    this.load.spritesheet('kello', 'assets/img/kello.png', 21, 32);
    this.load.spritesheet('kirjahylly', 'assets/img/kirjahylly.png', 30, 45);
    this.load.spritesheet('laatikko', 'assets/img/kello.png', 16, 21);
    this.load.spritesheet('minigun', 'assets/img/minigun.png', 30, 17);
    this.load.spritesheet('kello', 'assets/img/kello.png', 21, 32);
    this.load.spritesheet('nuke', 'assets/img/nuke.png', 24, 22);
    this.load.spritesheet('pesukone', 'assets/img/pesukone.png', 18, 19);
    this.load.spritesheet('poyta', 'assets/img/kello.png', 32, 23);
    this.load.spritesheet('sanky', 'assets/img/sanky.png', 40, 15);
    this.load.spritesheet('shotgun', 'assets/img/shotgun.png', 20, 7);
    this.load.spritesheet('takka', 'assets/img/takka.png', 24, 26);
    this.load.spritesheet('taululaiva', 'assets/img/taululaiva.png', 21, 16);
    this.load.spritesheet('taulumetsa', 'assets/img/taulumetsa.png', 21, 17);
    this.load.spritesheet('teevee', 'assets/img/teevee.png', 30, 33);
    
    this.load.spritesheet('explosion', 'assets/img/explo.png', 32, 32);
    
    this.load.audio("taustamusa", ['assets/audio/taustamusa.mp3'])
    this.load.audio("s_powerup", ['assets/audio/powerup.mp3']);
    this.load.audio("s_burana", ['assets/audio/burana.mp3']);
    this.load.audio("s_hit", ['assets/audio/isku.mp3']);
    this.load.audio("s_kop", ['assets/audio/kop.mp3']);
    this.load.audio("s_rajahdys", ['assets/audio/rajahdys.wav']);
    this.load.audio("s_shotgun", ['assets/audio/shotgun.mp3']);
    this.load.audio("s_minigun", ['assets/audio/minigun-cut.mp3']);
    this.load.audio("s_minigun_pause", ['assets/audio/minigun-pause.mp3']);
    this.load.audio("s_rajahdys2", ['assets/audio/explosion.mp3']);
    this.load.audio("s_laser", ['assets/audio/laser.wav']);
    this.load.audio("s_door", ['assets/audio/door.mp3']);
    
    this.load.audio("s_gameover", ['assets/audio/sepä oli hauskaa.mp3']);
    
    this.load.audio("s_dialog_1", ['assets/audio/muumipappa - voi ei.mp3']);
    this.load.audio("s_dialog_2", ['assets/audio/niiskuneiti - onko kaikki hyvin.mp3']);
    this.load.audio("s_dialog_3", ['assets/audio/muumipeikko - täältä tullaan.mp3']);
}

function create() {
    game.state.add("IntroState", KillMuumi.IntroState);
    game.state.add("GameState", KillMuumi.GameState);

    game.state.start("IntroState");
}

function startGame() {
    game.state.start("GameState");
}

KillMuumi = {};
KillMuumi.GameState = function () {
};

KillMuumi.GameState.prototype = {
    /*
     * Peli luodaan tiedostojen lataamisen jälkeen tässä
     */
    create: function () {
        this.time.advancedTiming = true;
        this.time.desiredFps = 60;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = "#00BFFF";

        this.physics.arcade.gravity.y = 800;

        this.backgroundLayer = null;
        this.mapLayer = null;

        this.levelObstacles = this.add.physicsGroup();
        
        this.doors = null;
        
        this.moomins = this.add.physicsGroup();
        this.spawner = new Spawner();

        this.mapLoader = new MapLoader();
        this.mapLoader.loadMap("map");
        
        game.world.moveUp(this.moomins);
        game.world.moveUp(this.moomins);
        game.world.moveUp(this.moomins);
        game.world.moveUp(this.moomins);
        
        
        this.enemyBullets = this.add.physicsGroup();
        
        this.powerups = this.add.physicsGroup();
        
        for (var i = 0; i < 10; i++) {
            var moomin = new Moomin(Math.random() * 800,
                    Math.random() * 1000);
            this.moomins.add(moomin);
        }

        this.moominGibs = this.add.emitter(0, 0, "moomin_gibs", 200);
        this.moominGibs.makeParticles("moomin_gibs", [0, 1, 2, 3], 200, true, true);

        this.moominGibs.minParticleSpeed.setTo(-300, -50);
        this.moominGibs.maxParticleSpeed.setTo(300, -700);
        this.moominGibs.gravity = 800;
        this.moominGibs.angularDrag = 30;
        this.moominGibs.bounce.setTo(0.7, 0.7);

        this.playerGibs = this.add.emitter(0, 0, "player_gibs", 50);
        this.playerGibs.makeParticles("player_gibs", [0, 1, 2, 3], 50, true, true);

        this.playerGibs.minParticleSpeed.setTo(-300, -50);
        this.playerGibs.maxParticleSpeed.setTo(300, -700);
        this.playerGibs.gravity = 800;
        this.playerGibs.angularDrag = 30;
        this.playerGibs.bounce.setTo(0.7, 0.7);
        
        this.playerHeadGibs = this.add.emitter(0,0, "player_head", 1);
        this.playerHeadGibs.makeParticles("player_head", [0], 1, true, true);
        
        this.playerHeadGibs.minParticleSpeed.setTo(-300, -50);
        this.playerHeadGibs.maxParticleSpeed.setTo(300, -700);
        this.playerHeadGibs.gravity = 600;
        this.playerHeadGibs.angularDrag = 90;
        this.playerHeadGibs.particleDrag = 90;
        this.playerHeadGibs.bounce.setTo(0.8, 0.8);
        
        this.explosionGibs = this.add.emitter(0, 0, "explosion_gibs", 500);
        this.explosionGibs.makeParticles("explosion_gibs", [0,1,2,3], 500, true, true);
        
        this.explosionGibs.minParticleSpeed.setTo(-400, -100);
        this.explosionGibs.maxParticleSpeed.setTo(400, -400);
        this.explosionGibs.gravity = 600;
        this.explosionGibs.angularDrag = 90;
        this.explosionGibs.particleDrag = 90;
        this.explosionGibs.bounce.setTo(0.3, 0.3);
        
        this.lifeBarFill = game.add.sprite(29, 25, "elamapalkki_tayte");
        this.lifeBarFill.fixedToCamera = true;
        
        this.lifeBar = game.add.sprite(25, 25, "elamapalkki");
        this.lifeBar.fixedToCamera = true;
        
        this.killCountText = game.add.text(245,20,
                                           "Muumeja tapettu: 0",
                                           {
                                               font: "20px monospace",
                                               align: "left",
                                               fill: "black"
                                           });
        this.killCountText.fixedToCamera = true;

        this.playerGibs = this.add.emitter(0, 0, "player_head", 1);
        this.playerGibs.makeParticles("player_gibs", [0, 1, 2, 3], 50, true, true);

        this.playerGibs.minParticleSpeed.setTo(-300, -50);
        this.playerGibs.maxParticleSpeed.setTo(300, -700);
        this.playerGibs.gravity = 800;
        this.playerGibs.angularDrag = 30;
        this.playerGibs.bounce.setTo(0.7, 0.7);
        
        this.gameOverText = this.add.text(180, 300,
                                          "Sinä kuolit!\nPaina R yrittääksesi uudelleen.",
                                          {
                                              font: "28px monospace",
                                              align: "center",
                                              fill: "white"
                                          });
                                          
        this.gameOverText.fixedToCamera = true;
        this.gameOverText.visible = false;
        
        this.shotgunIcon = this.add.image(25, 60, "shotgun", 0);
        this.shotgunIcon.visible = false;
        this.shotgunIcon.scale.x = 2;
        this.shotgunIcon.scale.y = 2;
        this.shotgunIcon.fixedToCamera = true;
        
        this.minigunIcon = this.add.image(90, 50, "minigun", 0);
        this.shotgunIcon.visible = false;
        this.minigunIcon.scale.x = 2;
        this.minigunIcon.scale.y = 2;
        this.minigunIcon.fixedToCamera = true;
        
        this.nukeFlash = this.add.image(0, 0, "valahdys");
        this.nukeFlash.visible = false;
        this.nukeFlash.fixedToCamera = true;
        
        this.nukeTimer = 0;
        this.nukeActive = true;
        
        // Audio
        this.bgMusic = this.add.audio("taustamusa");
        this.buranaSound = this.add.audio("s_burana");
        this.hitSound = this.add.audio("s_hit");
        this.kopSound = this.add.audio("s_kop");
        this.powerupSound = this.add.audio("s_powerup");
        this.doorSound = this.add.audio("s_door");
        
        this.explosionSound = this.add.audio("s_rajahdys");
        this.explosionTwoSound = this.add.audio("s_rajahdys2");
        
        this.shotgunSound = this.add.audio("s_shotgun");
        this.minigunSound = this.add.audio("s_minigun");
        this.minigunPauseSound = this.add.audio("s_minigun_pause");
        this.laserSound = this.add.audio("s_laser");
        
        this.gameOverSound = this.add.audio("s_gameover");
        
        this.voiceClips = [
            this.add.audio("s_dialog_1"),
            this.add.audio("s_dialog_2"),
            this.add.audio("s_dialog_3")
        ];
        
        this.moominsKilled = 0;
        
        this.bgMusic.play('', 0, 0.5, true);
    },
            
    bulletHitMoomin: function (bullet, moomin) {
        if (!bullet.alive) {
            return;
        }
        
        moomin.damage(bullet.health);
        bullet.kill();
    },
    
    bulletHitPlayer: function(player, bullet) {
        bullet.kill();
        this.player.health -= 40;
    },
    
    killBullets: function (bullet, somethingElse) {
        bullet.kill();
    },
            
    moominTouchPlayer: function (player, moomin) {
        this.explosionTwoSound.play();
        
        moomin.die(true);
        this.player.health -= 250;
    },
    
    playVoiceClip: function() {
        var sound = Phaser.ArrayUtils.getRandomItem(this.voiceClips);
        
        sound.play();
    },
    
    playerOpenDoor: function(player, door) {
        this.doorSound.play();
        
        door.animations.play("open");
        
        door.animations.currentAnim.onComplete.add(function() {
            door.body.checkCollision = { 
                up: false,
                left: false,
                right: false,
                down: false };
            door.animations.play("opened", true);
        }, this);
    },
    
    playerTouchPowerup: function(player, powerup) {
        if (powerup.powerupType === "burana") {
            this.buranaSound.play();
            
            this.player.health += 330;
            
            if (this.player.health > 1000) {
                this.player.health = 1000;
            }
        } else if (powerup.powerupType === "nuke") {
            this.explosionSound.play();
            
            this.time.slowMotion = 4.0;
            
            this.nukeActive = true;
            this.nukeTimer = game.time.now;
            
            this.moomins.forEach(function(moomin) {
                if (moomin.alive) {
                    moomin.die();
                }
            });
            
            this.nukeFlash.visible = true;
            this.nukeFlash.alpha = 0.5;
        } else if (powerup.powerupType === "minigun") {
            this.powerupSound.play();
            
            this.player.minigunTimer = game.time.now + 30000;
        } else if (powerup.powerupType === "shotgun") {
            this.powerupSound.play();
            
            this.player.shotgunTimer = game.time.now + 30000;
        }
        
        powerup.kill();
    },
    
    /*
     * Peliä päivitetään n. 60 kertaa sekunnissa tässä
     */
    update: function () {
        game.physics.arcade.collide(this.player.sprite, this.mapLayer);
        game.physics.arcade.collide(this.player.sprite, this.levelObstacles);

        game.physics.arcade.collide(this.moomins, this.mapLayer);
        game.physics.arcade.collide(this.moomins, this.levelObstacles);

        game.physics.arcade.collide(this.moominGibs, this.mapLayer);
        game.physics.arcade.collide(this.moominGibs, this.levelObstacles);

        game.physics.arcade.collide(this.playerGibs, this.mapLayer);
        game.physics.arcade.collide(this.playerGibs, this.levelObstacles);
        
        game.physics.arcade.collide(this.playerHeadGibs, this.mapLayer);
        game.physics.arcade.collide(this.playerHeadGibs, this.levelObstacles);
        
        game.physics.arcade.collide(this.explosionGibs, this.mapLayer);
        game.physics.arcade.collide(this.explosionGibs, this.levelObstacles);
        
        game.physics.arcade.collide(this.player.sprite, this.doors, this.playerOpenDoor, null, this);
        game.physics.arcade.collide(this.moomins, this.doors);

        game.physics.arcade.collide(this.powerups, this.mapLayer);

        game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.killBullets, null, this);
        game.physics.arcade.collide(this.enemyBullets, this.doors, this.killBullets, null, this);

        game.physics.arcade.overlap(this.enemyBullets, this.player.sprite, this.bulletHitPlayer, null, this);
        
        game.physics.arcade.overlap(this.moomins, this.player.sprite, this.moominTouchPlayer, null, this);
        game.physics.arcade.overlap(this.player.sprite, this.powerups, this.playerTouchPowerup, null, this);

        this.spawner.update();
        this.moomins.update();

        this.enemyBullets.update();
        this.moominGibs.update();

        this.player.update();
        
        this.lifeBarFill.width = Math.max(0, 192 * (this.player.health / 1000));
        
        if (this.player.dead) {
            this.gameOverText.visible = true;
        }
        
        if (this.player.dead && game.input.keyboard.isDown(Phaser.KeyCode.R)) {
            this.bgMusic.stop();
            
            game.state.start("GameState");
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.V)) {
            game.time.slowMotion = 4.0;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.B)) {
            game.time.slowMotion = 1.0;
        }
        
        if (this.nukeActive && game.time.now > this.nukeTimer + 500) {
            this.nukeFlash.visible = false;
            
            if (game.time.now > this.nukeTimer + 1500) {
                this.nukeActive = false;
                this.time.slowMotion = 1.0;
            }
        }
        
        if (this.nukeActive) {
            this.nukeFlash.cameraOffset.x = Math.ceil(Math.random() * 10) - 10;
            this.nukeFlash.cameraOffset.y = Math.ceil(Math.random() * 6) - 6;
            this.nukeFlash.update();
        }
        
        if (this.player.minigunTimer > game.time.now) {
            this.minigunIcon.visible = true;
        } else {
            this.minigunIcon.visible = false;
        }
        
        if (this.player.shotgunTimer > game.time.now) {
            this.shotgunIcon.visible = true;
        } else {
            this.shotgunIcon.visible = false;
        }
    }
};
