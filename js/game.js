var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create
});

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
        
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
    },

    /*
     * Peliä päivitetään n. 60 kertaa sekunnissa tässä
     */
    update: function() {
        if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
            this.player.body.velocity.x = -80;
        } else if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
            this.player.body.velocity.x = 80;
        } else {
            this.player.body.velocity.x = 0;
        }

        if (this.input.keyboard.isDown(Phaser.KeyCode.UP)) {
            this.player.body.velocity.y = -80;
        } else if (this.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
            this.player.body.velocity.y = 80;
        } else {
            this.player.body.velocity.y = 0;
        }
    }
};