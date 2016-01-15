var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create
}, false, false);

function preload () {
    this.load.image('testiKuva', 'assets/img/shite.png');
    this.load.image('player', 'assets/img/sankari.png');
    this.load.image('laser', 'assets/img/laaseri.png');
    this.load.image('map', 'assets/img/map.png');
    
    this.load.spritesheet('clock', 'assets/img/kelloanimoitu.png', 32, 32);
};

function create() {
    game.state.add("IntroState", KillMuumi.IntroState);
    game.state.add("GameState", KillMuumi.GameState);

    game.state.start("IntroState");
}

function startGame() {
    game.state.start("GameState");
}

KillMuumi = {};
KillMuumi.GameState = function() {};

KillMuumi.GameState.prototype = {
    /*
     * Peli luodaan tiedostojen lataamisen jälkeen tässä
     */
    create: function() {
        game.scale.scaleFactor = 2;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = "#55FFAA";

        this.player = new Player();
        
        this.playerLaserTimer = 0;
        
        this.playerDirection = "right";
        
        this.physics.arcade.gravity.y = 800;
        
        this.world.height = 3000;
        this.world.width = 1200;        
        
        this.obstacle = this.add.sprite(40,400, "map");
        
        this.physics.enable(this.obstacle, Phaser.Physics.ARCADE);
        
        this.obstacle.body.collideWorldBounds = true;
        
        this.obstacle.body.allowGravity = false;
        this.obstacle.body.immovable = true;
        
        this.levelObstacles = this.add.physicsGroup();
        
        this.clock = new Clock(25,25);
        
        this.mapLoader = new MapLoader();
        this.mapLoader.loadMap("map");
    },
    
    shootLaser: function() {
        var laser = this.make.sprite(this.player.x, this.player.y, "laser");
        this.playerLasers.add(laser);
        
        laser.body.allowGravity = false;
        laser.body.velocity.x = this.playerDirection == "right" ? 700 : -700;
        laser.x += this.playerDirection == "right" ? 30 : -20;
        laser.outOfBoundsKill = true;
    },

    /*
     * Peliä päivitetään n. 60 kertaa sekunnissa tässä
     */
    update: function() {
        this.physics.arcade.collide(this.player, this.obstacle);
        
        this.player.update();
    }
};