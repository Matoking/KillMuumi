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

    this.load.spritesheet('tiles', 'assets/img/tilet.png', 32, 32);
    this.load.spritesheet('moomins', 'assets/img/tyypit.png', 32, 32);
    this.load.spritesheet('moomin_gibs', 'assets/img/muuminpalaset.png', 8, 8);
    this.load.spritesheet('player_gibs', 'assets/img/pelaajanpalaset.png', 8, 8);

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
    this.load.spritesheet('takka', 'assets/img/takka.png', 32, 32);
    this.load.spritesheet('taululaiva', 'assets/img/taululaiva.png', 21, 16);
    this.load.spritesheet('taulumetsa', 'assets/img/taulumetsa.png', 21, 17);
    this.load.spritesheet('teevee', 'assets/img/teevee.png', 30, 33);
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

        this.stage.backgroundColor = "#55FFAA";

        //this.player = new Player(320, 400);

        this.physics.arcade.gravity.y = 800;

        this.backgroundLayer = null;
        this.mapLayer = null;

        this.levelObstacles = this.add.physicsGroup();

        this.mapLoader = new MapLoader();
        this.mapLoader.loadMap("map");

        this.moomins = this.add.physicsGroup();

        this.enemyBullets = this.add.physicsGroup();
        
        this.powerups = this.add.physicsGroup();
        
        var nuke = new Nuke(0, 2000);
        this.powerups.add(nuke);
        
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
        
        this.lifeBarFill = game.add.sprite(29, 25, "elamapalkki_tayte");
        this.lifeBarFill.fixedToCamera = true;
        
        this.lifeBar = game.add.sprite(25, 25, "elamapalkki");
        this.lifeBar.fixedToCamera = true;
        
        var burana = new Burana(0,900);
        this.powerups.add(burana);

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
        
        
        this.nukeFlash = this.add.image(0, 0, "valahdys");
        this.nukeFlash.visible = false;
        this.nukeFlash.fixedToCamera = true;
        
        this.nukeTimer = 0;
        this.nukeActive = true;
    },
            
    bulletHitMoomin: function (bullet, moomin) {
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
        moomin.die();
        this.player.health -= 250;
    },
    
    playerTouchPowerup: function(player, powerup) {
        if (powerup.powerupType === "burana") {
            this.player.health += 330;
            
            if (this.player.health > 1000) {
                this.player.health = 1000;
            }
        } else if (powerup.powerupType === "nuke") {
            this.time.slowMotion = 4.0;
            
            this.nukeActive = true;
            this.nukeTimer = game.time.now;
            
            this.moomins.forEach(function(moomin) {
                moomin.die();
            });
            
            this.nukeFlash.visible = true;
            this.add.tween(this.nukeFlash).to({alpha: 1}, 250, Phaser.Easing.Linear.None, true, 0, 250, true);
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

        game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.killBullets, null, this);

        game.physics.arcade.overlap(this.enemyBullets, this.player.sprite, this.bulletHitPlayer, null, this);
        
        game.physics.arcade.overlap(this.moomins, this.player.sprite, this.moominTouchPlayer, null, this);
        game.physics.arcade.overlap(this.player.sprite, this.powerups, this.playerTouchPowerup, null, this);

        this.moomins.update();

        this.enemyBullets.update();
        this.moominGibs.update();

        this.player.update();
        
        this.lifeBarFill.width = Math.max(0, 192 * (this.player.health / 1000));
        
        if (this.player.dead) {
            this.gameOverText.visible = true;
        }
        
        if (this.player.dead && game.input.keyboard.isDown(Phaser.KeyCode.R)) {
            game.state.start("GameState");
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.V)) {
            game.time.slowMotion = 4.0;
        }
        
        if (game.input.keyboard.isDown(Phaser.KeyCode.B)) {
            game.time.slowMotion = 1.0;
        }
        
        if (this.nukeActive && game.time.now > this.nukeTimer + 1500) {
            this.nukeActive = false;
            this.time.slowMotion = 1.0;
            
            this.nukeFlash.visible = false;
        }
    }
};
