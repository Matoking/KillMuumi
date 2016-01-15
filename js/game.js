var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var player;

/*
 * Pelin tiedostot (kuvat, äänet, etc.) esiladataan tässä
 */
function preload() {
    game.load.image('testiKuva', 'assets/img/shite.png');
}

/*
 * Peli luodaan tiedostojen lataamisen jälkeen tässä
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.state.backgroundColor = "#55FFAA";
    
    player = game.add.sprite(40, 40, "testiKuva");
    game.physics.enable(player, Phaser.Physics.ARCADE);
}

/*
 * Peliä päivitetään n. 60 kertaa sekunnissa tässä
 */
function update() {
    if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
        player.body.velocity.x = -80;
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
        player.body.velocity.x = 80;
    } else {
        player.body.velocity.x = 0;
    }
    
    if (game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
        player.body.velocity.y = -80;
    } else if (game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
        player.body.velocity.y = 80;
    } else {
        player.body.velocity.y = 0;
    }
}

/*
 * Ylimääräiset renderöinnit tähän
 */
function render() {
    
}