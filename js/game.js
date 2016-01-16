var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create
}, false, false);

function preload() {
    this.load.image('testiKuva', 'assets/img/shite.png');
    this.load.image('player', 'assets/img/sankari.png');
    this.load.image('laser', 'assets/img/laaseri.png');

    this.load.spritesheet('tiles', 'assets/img/tiles.png', 32, 32);
    this.load.spritesheet('sprites', 'assets/img/SpriteSheet.png', 32, 32);
    this.load.spritesheet('moomins', 'assets/img/tyypit.png', 32, 32);
    this.load.spritesheet('moomin_gibs', 'assets/img/muuminpalaset.png', 8, 8);

    this.load.spritesheet('bullets', 'assets/img/bullets.png', 8, 4);

    this.load.tilemap("map", "assets/maps/map.json", null, Phaser.Tilemap.TILED_JSON);

    this.load.spritesheet('kello', 'assets/img/kello.png', 21, 32);
    this.load.spritesheet('burana', 'assets/img/burana.png', 31, 9);
    this.load.spritesheet('dynamiitti', 'assets/img/dynamiitti.png', 12, 5);
    this.load.spritesheet('hella', 'assets/img/hella.png', 18, 24);
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
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = "#55FFAA";

        this.player = new Player(320, 400);

        this.physics.arcade.gravity.y = 800;

        this.world.height = 3000;
        this.world.width = 1200;

        this.obstacle = this.add.sprite(40, 400, "map");

        this.physics.enable(this.obstacle, Phaser.Physics.ARCADE);

        this.obstacle.body.collideWorldBounds = true;

        this.obstacle.body.allowGravity = false;
        this.obstacle.body.immovable = true;

        this.levelObstacles = this.add.physicsGroup();

        this.moomins = this.add.physicsGroup();

        this.enemyBullets = this.add.physicsGroup();
        
        for (var i=0; i < 10; i++) {
            var moomin = new Moomin(Math.random() * 800,
                                    Math.random() * 1000);
            this.moomins.add(moomin);
        }

        this.mapLoader = new MapLoader();
        this.mapLoader.loadMap("map");

        this.moominGibs = this.add.emitter(0, 0, "moomin_gibs", 50);
        this.moominGibs.makeParticles("moomin_gibs", [0, 1, 2, 3], 50, true, true);

        this.moominGibs.minParticleSpeed.setTo(-300, -50);
        this.moominGibs.maxParticleSpeed.setTo(300, -700);
        this.moominGibs.gravity = 800;
        this.moominGibs.angularDrag = 30;
        this.moominGibs.bounce.setTo(0.7, 0.7);
        
        this.moominSpawn = 0;
    },
    bulletHitMoomin: function (bullet, moomin) {
        moomin.damage(25);
        bullet.kill();
    },
    killBullets: function (bullet, somethingElse) {
        bullet.kill();
    },

    moominTouchPlayer: function(player, moomin) {
        moomin.die();
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

        game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.killBullets, null, this);
        
        game.physics.arcade.overlap(this.moomins, this.player.sprite, this.moominTouchPlayer, null, this);


        this.moomin.update();

        this.moomins.update();

        if (game.input.keyboard.isDown(Phaser.KeyCode.C)) {
            this.moomin.die();
        }

        this.enemyBullets.update();
        this.moominGibs.update();

        this.player.update();
    }
};
