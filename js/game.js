var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create
}, false, false);

function preload () {
    this.load.image('testiKuva', 'assets/img/shite.png');
    this.load.image('player', 'assets/img/sankari.png');
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
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.backgroundColor = "#55FFAA";

        this.player = this.add.sprite(40, 40, "player");
        this.player.anchor.setTo(0.5, 0.5);
        
        this.physics.arcade.gravity.y = 800;
        
        this.camera.follow(this.player);
        
        this.world.height = 3000;
        this.world.width = 1200;        
        
        this.obstacle = this.add.sprite(40,400, "testiKuva");
        
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.physics.enable(this.obstacle, Phaser.Physics.ARCADE);
        
        this.player.body.collideWorldBounds = true;
        this.obstacle.body.collideWorldBounds = true;
        
        this.obstacle.body.allowGravity = false;
        this.obstacle.body.immovable = true;
        
        this.levelObstacles = this.add.physicsGroup();
    },

    /*
     * Peliä päivitetään n. 60 kertaa sekunnissa tässä
     */
    update: function() {
        this.physics.arcade.collide(this.player, this.obstacle);
        
        if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.player.body.velocity.x = -400;
            this.player.scale.x = -1;
        } else if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.player.body.velocity.x = 400;
            this.player.scale.x = 1;
        } else {
            this.player.body.velocity.x = 0;
        }
        
        if (this.input.keyboard.isDown(Phaser.KeyCode.UP) && 
           (this.player.body.touching.down || this.player.body.onFloor())) {
            this.player.body.velocity.y = -400;
        }
    }
};